import connectDB from "@/lib/mongodb" // Import the function to connect to the MongoDB database.
import Contact from "@/models/contact" // Import the Contact model for interacting with the database.
import mongoose from "mongoose" // Import Mongoose for database operations and error handling.
import { NextResponse } from "next/server" // Import NextResponse for sending structured HTTP responses.

export async function POST(req) {
  // Extract the form data from the incoming request body.
  const { fullName, email, message } = await req.json() // Parse JSON body to get fullName, email, and message.

  try {
    await connectDB() // Establish a connection to the MongoDB database.

    // Save the contact data to the database using the Contact model.
    await Contact.create({ fullName, email, message })

    // Send a success response indicating the server processed the request.
    return NextResponse.json({ msg: ["I am contact server"] })
  } catch (err) {
    // Handle validation errors specifically.
    if (err instanceof mongoose.Error.ValidationError) {
      let errorList = [] // Initialize an array to hold the validation error messages.
      for (let e in err.errors) {
        // Loop through the validation errors and extract the messages.
        errorList.push(err.errors[e].message)
      }
      console.log(errorList) // Log the error messages for debugging purposes.
      return NextResponse.json({ msg: errorList }) // Return the error messages as the response.
    } else {
      // Handle any other errors, such as database connection issues.
      return NextResponse.json({ msg: ["Unable to send message"] }) // Return a generic error message.
    }
  }
}
