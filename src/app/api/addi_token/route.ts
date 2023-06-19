import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";

const ADDI_AUTHENTICATION_TEST_URL = "https://auth.addi-staging.com";

export async function GET() {
  const body = {
    audience: "https://api.staging.addi.com",
    grant_type: "client_credentials",
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
  };

  axios
    .post(`${ADDI_AUTHENTICATION_TEST_URL}/oauth/token`, body)
    .then(async (response) => {
      debugger;
      return NextResponse.json({ response });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json({ error: err });
    });
}
