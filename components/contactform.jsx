"use client" // Indicates this file is a client-side component in Next.js 13+.

import { useState } from "react" // Importing useState hook to manage state in the component.

export default function Contactform() {
  // Initializing state variables for form inputs and error messages.
  const [fullName, setFullName] = useState("") // State for storing the user's full name.
  const [email, setEmail] = useState("") // State for storing the user's email.
  const [message, setMessage] = useState("") // State for storing the user's message.
  const [error, setError] = useState([]) // State for storing any error messages.

  // Function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior (page reload).

    console.log(fullName, email, message) // Log the form data for debugging purposes.

    // Sending form data to the server using fetch.
    const res = await fetch("api/contact", {
      // Assuming the server endpoint is "api/contact".
      method: "POST", // HTTP method to send the data.
      headers: {
        "Content-type": "application/json", // Indicates that the request body is JSON.
      },
      body: JSON.stringify({
        fullName, // Sending fullName, email, and message in the request body.
        email,
        message,
      }),
    })

    const { msg } = await res.json() // Parsing the response JSON and extracting the 'msg' field.
    setError(msg) // Updating the error state with the server response message.
  }

  return (
    <div>
      {/* Form for capturing user inputs */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">FullName: </label>
          {/* Input for the user's full name */}
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name" // Placeholder text for guidance.
            onChange={(e) => setFullName(e.target.value)} // Update state when input changes.
            value={fullName} // Controlled input: value is tied to state.
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email" // Placeholder text for guidance.
            onChange={(e) => setEmail(e.target.value)} // Update state when input changes.
            value={email} // Controlled input: value is tied to state.
          />
        </div>

        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            type="text"
            id="message"
            placeholder="Enter your message..." // Placeholder text for guidance.
            onChange={(e) => setMessage(e.target.value)} // Update state when input changes.
            value={message} // Controlled input: value is tied to state.
          />
        </div>
        <br />
        <button type="submit">Send</button>
      </form>
      <br />
      {/* Display error messages, if any */}
      <p>Error Message</p>
    </div>
  )
}
