"use client";

import { useForm } from "react-hook-form";

import { SibsPaymentUrl } from "./config";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import Script from "next/script";
import ResponseText from "../../../components/ResponseText/ResponseText";

/* FOR FIRST PHASE */
type PaymentTypes = "CARD" | "MBWAY" | "REFERENCE";

type SibsCheckoutResponse = {
  transactionID: string;
  transactionSignature: string;
  formContext: string;

  amount: {
    value: string;
    currency: string;
  };
  merchant: {
    terminalId: string;
    merchantTransactionId: string;
  };
  expiry: string;
  tokenList: string[];
  paymentMethodList: PaymentTypes[];
};

/* FOR SERVER TO SERVER */
type SIBSCardServerResponse = {
  actionResponse: { data: any };
  execution: { startTime: string; endTime: string };
  paymentStatus: string;
  returnStatus: {
    statusCode: string;
    statusMsg: string;
    statusDescription: string;
  };
  transactionID: string;
};

const SibsPage = () => {
  const [transaction, setTransaction] = useState<
    SibsCheckoutResponse | undefined
  >(undefined);
  const [serverCardResponse, setServerCardResponse] = useState<
    SIBSCardServerResponse | undefined
  >(undefined);

  const { handleSubmit } = useForm();

  /* Prepare the SIBS checkout - first step needed*/
  const callSibsCreateTransactionId = async (formData: unknown) => {
    const response = await fetch(SibsPaymentUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SIBS_TOKEN}`,
        "X-IBM-Client-Id": process.env.NEXT_PUBLIC_SIBS_CLIENT_ID || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: {
          terminalId: 56795,
          channel: "web",
          merchantTransactionId: "Order Id: a0fomfxd2q",
        },
        transaction: {
          transactionTimestamp: "2024-01-19T11:00:41.080Z",
          description: "Transaction test by SIBS",
          moto: false,
          paymentType: "PURS",
          amount: {
            value: 5.5,
            currency: "EUR",
          },
          paymentMethod: ["CARD", "MBWAY", "REFERENCE"],
          paymentReference: {
            initialDatetime: "2024-01-19T11:00:41.080Z",
            finalDatetime: "2024-01-21T11:00:41.080Z",
            maxAmount: {
              value: 5.5,
              currency: "EUR",
            },
            minAmount: {
              value: 5.5,
              currency: "EUR",
            },
            entity: "24000",
          },
        },
      }),
    });

    const data = await response.json();
    setTransaction({ ...data });
  };

  const sendCardTransation = async () => {
    if (!transaction || !transaction.transactionID)
      return alert("missing transactionID");

    const { transactionID, transactionSignature } = transaction;

    const response = await fetch(
      `${SibsPaymentUrl}/${transactionID}/card/purchase`,
      {
        method: "POST",
        headers: {
          Authorization: `Digest ${transactionSignature}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardInfo: {
            PAN: "4176660000000100",
            secureCode: "597",
            validationDate: "2025-12-31T00:00:00.000Z",
            cardholderName: "David",
            createToken: true,
          },
          actionProcessed: {
            id: "123456789",
            type: "THREEDS_METHOD",
            executed: true,
          },
        }),
      }
    );

    const data = await response.json();
    setServerCardResponse({ ...data });
  };

  const sendReferenceTransaction = async () => {
    if (!transaction || !transaction.transactionID)
      return alert("missing transactionID");

    const { transactionID, transactionSignature } = transaction;

    const response = await fetch(
      `${SibsPaymentUrl}/${transactionID}/service-reference/generate`,
      {
        method: "POST",
        headers: {
          Authorization: `Digest ${transactionSignature}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data = await response.json();
    setServerCardResponse({ ...data });
  };

  return (
    <main className="m-5 flex flex-col gap-3">
      <form onSubmit={handleSubmit(callSibsCreateTransactionId)}>
        <Button className="bg-green-100" type="submit">
          Primeiro Passo: Request Transaction
        </Button>
      </form>

      <ResponseText
        title="Response request transaction:"
        text={transaction}
        isOpen={false}
      />
      <div className="my-5 lg:mx-auto lg:w-3/4 mx-10 w-full">
        {transaction && (
          <div>
            <Script
              src={`https://spg.qly.site1.sibs.pt/assets/js/widget.js?id=${transaction.transactionID}`}
            ></Script>
            <h3>Option 1: Embed Form.</h3>
            <form
              className="paymentSPG"
              spg-context={transaction.formContext}
              spg-config={JSON.stringify({
                paymentMethodList: transaction.paymentMethodList,
                amount: transaction.amount,
                language: "en",
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/sibs`,
                customerData: null,
              })}
            />
          </div>
        )}
      </div>

      {transaction && (
        <div className="">
          <h1>Option2 : Server to Server</h1>
          <div className="flex flex-row gap-10">
            <Button
              className="bg-green-100"
              type="button"
              onClick={sendCardTransation}
            >
              Card
            </Button>

            <Button
              className="bg-green-100"
              type="button"
              onClick={sendReferenceTransaction}
            >
              Referencia Multibanco
            </Button>
          </div>
        </div>
      )}

      {serverCardResponse && (
        <ResponseText
          title="Server to server card:"
          text={serverCardResponse}
          isOpen={false}
        />
      )}
    </main>
  );
};

export default SibsPage;
