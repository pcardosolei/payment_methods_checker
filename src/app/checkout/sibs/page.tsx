"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SibsPaymentUrl } from "@/app/sibs/config";
import { Button } from "@mui/material";
import ResponseText from "../../../../components/ResponseText/ResponseText";

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState<{
    id?: string;
    resourcePath?: string;
  }>({});
  const [paymentStatusResponse, setPaymentStatusResponse] = useState(undefined);

  useEffect(() => {
    const resourcePath = searchParams.get("resourcePath");
    const id = searchParams.get("id");

    setQueryParams({
      id: id || undefined,
      resourcePath: resourcePath || undefined,
    });
  }, [searchParams]);

  const getPaymentStatus = async () => {
    if (!queryParams.id) return;

    const response = await fetch(`${SibsPaymentUrl}/${queryParams.id}/status`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_SIBS_TOKEN,
        "X-IBM-Client-Id": process.env.NEXT_PUBLIC_SIBS_CLIENT_ID || "",
      },
    });

    const data = await response.json();
    setPaymentStatusResponse(data);
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <p>ID: {queryParams.id}</p>
      <p>Resource Path: {queryParams.resourcePath}</p>

      <div>
        <Button type="button" onClick={getPaymentStatus}>
          Ver estado pedido
        </Button>
      </div>
      <ResponseText
        isOpen={true}
        title="Payment Status Response"
        text={paymentStatusResponse}
      />
    </div>
  );
};

export default CheckoutPage;
