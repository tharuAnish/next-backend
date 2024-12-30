import { NextResponse } from "next/server"

const DATA_URL = "https://jsonplaceholder.typicode.com/posts"

// const API_KEY = process.env.API_KEY

export async function GET() {
  const res = await fetch(DATA_URL)
  const posts = await res.json()

  return NextResponse.json(posts)
}

export async function POST(request) {
  try {
    // Parse the JSON body of the incoming request to extract `title`, `body`, and `userId`
    const { title, body, userId } = await request.json()

    // Send a POST request to the API to create a new resource
    const res = await fetch(DATA_URL, {
      method: "POST", // HTTP method for creating a new resource
      headers: {
        "Content-type": "application/json", // Specify that the request body is in JSON format
        // "Api-Key": API_KEY, // Optional: Uncomment if the API requires an authentication key
      },
      body: JSON.stringify({
        title, // Title of the new post
        body, // Content/body of the new post
        userId, // User ID associated with the post
      }),
    })

    // If the response status is 201 (resource created successfully)
    if (res.status === 201) {
      // Parse the JSON response to get the new post data
      const newPost = await res.json()
      // Return the newly created post data in the response
      return NextResponse.json(newPost)
    } else {
      // Log an error message if the request fails with a status other than 201
      console.error("Post req is failed with status :", res.status)
      return NextResponse.error("Post request failed") // Return a generic error response
    }
  } catch (error) {
    // Catch and log any errors that occur during the request
    console.error("Post req error:", error)
    // Return a generic error response in case of an exception
    return NextResponse.error("Post request failed")
  }
}

export async function PUT(request) {
  // Extract `userId`, `id`, `title`, and `body` from the JSON body of the incoming request
  const { userId, id, title, body } = await request.json()

  // Send a PUT request to update the specific post by its `id`
  const res = await fetch(`${DATA_URL}/${id}`, {
    method: "PUT", // HTTP method for updating an existing resource
    headers: {
      "Content-type": "application/json", // Indicate the request body is JSON
    },
    body: JSON.stringify({
      id, // Include `id` to specify the resource being updated
      title, // Updated title of the post
      body, // Updated body content of the post
      userId, // User ID associated with the post
    }),
  })

  // If the response status is 200 (success)
  if (res.status === 200) {
    // Parse the JSON response to get the updated post data
    const updatedPost = await res.json()
    // Return the updated post data in the response
    return NextResponse.json(updatedPost)
  } else {
    // If the request fails, return an error response
    return NextResponse.error("PUT request failed")
  }
}

export async function DELETE(request) {
  try {
    // Parse the JSON body of the incoming request to extract the `id` of the resource to delete
    const { id } = await request.json()

    // Send a DELETE request to the API for the specified resource
    const res = await fetch(`${DATA_URL}/${id}`, {
      method: "DELETE", // HTTP method for deleting a resource
      headers: {
        "Content-type": "application/json", // Specify the content type of the request
      },
    })

    // Return a success message if the delete operation completes successfully
    return NextResponse.json({ message: "Data deleted" })
  } catch (error) {
    // Catch and handle any errors that occur during the request
    return NextResponse.error("Delete request failed")
  }
}
