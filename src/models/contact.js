import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      // email не зобов’язаний мати min/max, але можна додати валідацію regex за бажанням
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ["personal", "work", "home"],
      default: "personal",
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
