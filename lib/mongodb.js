import mongoose from "mongoose" // Importing Mongoose for database connection management.

const connectDB = async () => {
  try {
    // Check if there is no active connection to the database.
    if (mongoose.connection.readyState === 0) {
      // Establish a new connection to MongoDB using the URI from environment variables.
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("DB Connected") // Log a message indicating a successful connection.
    }
  } catch (error) {
    // Catch and log any errors that occur during the connection attempt.
    console.log(error)
  }
}

export default connectDB // Export the connectDB function for use in other parts of the application.
