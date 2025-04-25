const { Schema, model } = require("mongoose");

const Order = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      device_id: { type: Schema.Types.ObjectId, ref: "Device", required: true },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

module.exports = model("Order", Order);
