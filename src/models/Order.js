import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      unique: false, // Kullanıcı kimliği benzersiz olmalı
      required: true,
    },
    productId: {
      type: [String],
      unique: false, // Ürün kimlikleri benzersiz olmak zorunda değil
      required: false,
    },
    orderNumber: {
      type: String,
      unique: true, // Kullanıcı kimliği benzersiz olmalı
      required: true,
    },
    state: {
      type: Boolean,
      unique: false,
      required: true,
      default: false,
    }
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
