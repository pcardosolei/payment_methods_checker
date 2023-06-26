import { supabaseAdmin } from "../../../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  await supabaseAdmin
    .from("callbacks")
    .insert({ id: uuidv4(), metadata: { message: "received" } });
  await supabaseAdmin
    .from("callbacks")
    .insert({ id: uuidv4(), metadata: body });

  return NextResponse.json({ message: "OK" });
}
