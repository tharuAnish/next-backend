import { users } from "@/lib/db"
import { NextResponse } from "next/server"

//Read
export const GET = async (req) => {
  try {
    const id = req.url.split("users/")[1]
    console.log(id)
    const singleData = users.filter((user) => user.id.toString() === id)
    console.log("SingleData", singleData)

    if (singleData.length === 0) {
      return NextResponse.json({ message: "Data not found" })
    }
    return NextResponse.json({ message: "OK", singleData })
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

//Delete
export const DELETE = async (req) => {
  try {
    //read url and get id from there
    const id = req.url.split("users/")[1]
    // find the index of the user to delete
    const userIndex = users.findIndex((user) => user.id.toString() === id)
    if (userIndex === -1) {
      return NextResponse.json({ message: "Error", eror: "User not Found" })
    }
    //Remove the user from the users Arrar
    //remove 1 user from the index
    users.splice(userIndex, 1)
    console.log("Users", users)
    return NextResponse.json({ message: "User Deleted Sucessfully" })
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}

//Update
export const PUT = async (req) => {
  try {
    //read url and get id from there
    const id = req.url.split("users/")[1]
    const { name } = await req.json()

    //Find the user to update
    const user = users.find((user) => user.id.toString() === id)

    if (!user) {
      return NextResponse.json({ message: "User not found" })
    }

    user.name = name
    console.log("Updated Users", users)

    return NextResponse.json({ message: "User Updated Sucessfully" })
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
