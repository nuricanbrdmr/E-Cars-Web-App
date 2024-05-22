import mongoose from "mongoose";

const { Schema } = mongoose;

const shoppingcartSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true, // Kullanıcı kimliği benzersiz olmalı
      required: true,
    },
    productId: {
      type: [String],
      unique: false, // Ürün kimlikleri benzersiz olmak zorunda değil
      required: false,
    },
  },
  { timestamps: true }
);

const ShoppingCart = mongoose.models.ShoppingCart || mongoose.model("ShoppingCart", shoppingcartSchema);

export default ShoppingCart;
