const {Schema, model} = require('mongoose')


const Basket = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ 
    device_id: {type: Schema.Types.ObjectId, ref: "Device"},
    quantity: {type: Number}
  }], 
});

module.exports = model("Basket", Basket);
