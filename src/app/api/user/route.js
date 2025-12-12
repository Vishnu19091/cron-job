import { NextResponse } from "next/server";
import { getUser } from "@/app/_lib/server-data-service";

export async function GET() {
  const user = await getUser();

  return NextResponse.json({ user });
}
