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

  try {
    const response = await axios.post(
      `${ADDI_AUTHENTICATION_TEST_URL}/oauth/token`,
      body
    );

    return NextResponse.json({ data: response.data });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
