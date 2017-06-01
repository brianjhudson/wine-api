const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
  user: {type: Schema.Types.ObjectId, required:true, ref:'User'}
  , products: [{
    item: {type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true}
    , quantity: {type: Number, required: true, min: 1}
  }]
  , cartQuantity: { type: Number, required: true }
  , subTotal: { type: Number, required: true }
  , cartTip: { type: Number, required: true }
  , deliveryFee: { type: Number, required: true, default: 5 }
  , cartTax: { type: Number, required: true }
  , cartTotal: { type: Number, required: true }
  , ordered: {type: Date, default: new Date() }
  , delivered: {
      status:{type:Boolean, default:false },
      driver:{ type: Schema.Types.ObjectId, ref:'Driver' },
      time:{ type: Date }
  }
  , filled: {
      status:{ type:Boolean, default:false },
      driver:{ type: Schema.Types.ObjectId, ref:'Driver' },
      time:{ type: Date }
  }
});

module.exports = mongoose.model("Order", Order);
