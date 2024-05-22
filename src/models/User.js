import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      unique: false,
      required: false,
    },
    lastname: {
      type: String,
      unique: false,
      required: false,
    },
    phone: {
      type: Number,
      unique: false,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    verifytoken: {
      type: String,
      require: false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);