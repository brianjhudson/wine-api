const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
  item: {type: Schema.Types.ObjectId, ref:'InventoryItem', required: true}
  , name: {type: String, required: true}
  , quantity: { type: Number, min: 1 }
  , price: { type: Number, required:true }
});

module.exports = Cart
