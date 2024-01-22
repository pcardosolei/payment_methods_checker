"use client";

import { useForm } from "react-hook-form";

import { SibsFormData, SibsPaymentUrl } from "./config";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import Script from "next/script";

const SibsPage = () => {
  const [transactionId, setTransactionId] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SibsFormData>();

  const callSibsCreateTransactionId = async (formData: SibsFormData) => {
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
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <main className="m-5">
      <form onSubmit={handleSubmit(callSibsCreateTransactionId)}>
        <TextField label="value" />
        <div className="flex flex-col gap-2">
          <FormControlLabel
            className="mr-auto"
            label="MBWAY"
            value="MBWAY"
            labelPlacement="start"
            defaultChecked
            control={<Checkbox />}
          />
          <FormControlLabel
            className="mr-auto"
            label="Referencia Multibanco"
            value="REFERENCE"
            labelPlacement="start"
            defaultChecked
            control={<Checkbox />}
          />
          <FormControlLabel
            className="mr-auto"
            label="CARD"
            value="CARD"
            labelPlacement="start"
            defaultChecked
            control={<Checkbox />}
          />
        </div>
        <Button type="submit">Testar</Button>
      </form>
      <div className="my-5">
        {transactionId && (
          <Script
            src={`https://spg.qly.site1.sibs.pt/assets/js/widget.js?id=${transactionId}`}
          ></Script>
        )}
      </div>
    </main>
  );
};

export default SibsPage;
