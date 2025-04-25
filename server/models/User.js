const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  basket_id: { type: Schema.Types.ObjectId, ref: "Basket" },
  role: { type: String },
});

module.exports = model("User", User);
