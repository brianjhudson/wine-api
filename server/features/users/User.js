const mongoose = require('mongoose');
const Cart = require('../carts/Cart');

const User = new mongoose.Schema({
  sub: {type: String, required: true, unique: true}
  , family_name: {type: String}
  , given_name: {type: String}
  , name: {type: String}
  , nickname: {type: String}
  , gender: {type: String}
  , email: {type: String}
  , cart: [Cart]
  , email_verified: {type: Boolean}
  , picture: {type: String, default: 'http://www.clker.com/cliparts/m/3/I/C/c/2/grey-silhouette-of-man.svg'}
  , created_at: {type: Date}
  , updated_at: {type: Date}
  , userAge: {type: Date}
  , homeAddress:[
    { street: {type:String}, city: {type:String}, state: {type:String}, country: {type:String} }
  ]
  , orderAddress:[
    { street: {type:String}, city: {type:String}, state: {type:String}, country: {type:String} }
  ]
});

module.exports = mongoose.model("User", User);
