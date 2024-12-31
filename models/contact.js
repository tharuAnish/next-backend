import mongoose, { Schema } from "mongoose" // Import Mongoose and Schema for defining the database schema.

const contactSchema = new Schema({
  fullName: {
    type: String, // Specifies that the field is a string.
    required: [true, "Name is required"], // Validation to ensure the field is not empty with a custom error message.
    trim: true, // Removes leading and trailing whitespace from the string.
    minLength: [2, "Name must be larger than 2 characters"], // Validation to ensure the string has a minimum length of 2 characters.
  },
  email: {
    type: String, // Specifies that the field is a string.
    required: [true, "Email is required"], // Validation to ensure the field is not empty with a custom error message.
  },
  message: {
    type: String, // Specifies that the field is a string.
    required: [true, "Message is required"], // Validation to ensure the field is not empty with a custom error message.
  },
  date: {
    type: Date, // Specifies that the field is a date.
    default: Date.now, // Sets the default value to the current date and time.
  },
})

// Check if the Contact model already exists to avoid redefining it, otherwise create it.
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export default Contact // Export the Contact model for use in other parts of the application.
