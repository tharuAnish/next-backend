import { users } from "@/lib/db"
import { NextResponse } from "next/server"

//Read
export const GET = async (req, res) => {
  try {
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

//Create
export const POST = async (req, res) => {
  const { name } = await req.json()
  console.log("name", name)
  try {
    const newData = { name }
    newData.id = users.length + 1
    users.push(newData)
    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
