import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ "Second message": "Hello World !" })
}
