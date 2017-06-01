const User = require('../users/User');

module.exports = {
  getCartSession( req, res, next ){
    return res.status(200).json(req.session.cart)
  }
  , setCartSession(req, res){
    // validate the object...
      if (req.session.cart) {
        req.session.cart = searchCartAddToExistingWine(req.session.cart, req.body);
      } else {
        req.session.cart = [];
        req.session.cart.push(req.body)
      }
      return res.status(200).json(req.session.cart)
  }
  , addOneToCart(req, res, next){
      // User.findOne({sub:req.user.sub}, {_id: 0, cart: 1}, (err, cart) =>{
      //   req.session.cart = searchCartAddToExistingWine(req.session.cart, cart.cart);
      // })
      if (req.session.cart) {
        req.session.cart = searchCartAddToExistingWine(req.session.cart, req.body);
      } else {
        req.session.cart = [];
        req.session.cart.push(req.body)
      }

      User.findOneAndUpdate({sub: req.user.sub}, {cart:req.session.cart}, {new:true}, (err, user) => {
        if (err) return res.status(500).json(err);
        next();
      })
  }
  , checkCartSession(req, res, next){

    if (req.session.cart){
      User.findOneAndUpdate({sub: req.user.sub}, {cart:req.session.cart}, {new:true}, (err, user) => {
      })
    }
    next();
  }
  , getCart(req, res){
      User.findOne({sub: req.user.sub}, {_id: 0, cart:1}, (err, cart) => {
        if (err) return res.status(500).json(err)
        if (cart) return res.status(200).json(cart.cart)
      })
  }
  , updateCart(req, res, next){
      req.session.cart = req.body
      User.findOneAndUpdate({sub: req.user.sub}, {cart:req.session.cart}, {new:true}, (err, user) => {
        if (err) return res.status(500).json(err);
        next();
      })
  }
  , updateCartSession(req, res){
    req.session.cart = req.body;
    return res.status(200).json(req.session.cart)
  }
  , deleteCartSession(req, res){
      req.session.destroy()
      return res.status(200).json(req.session)
  }
}

function searchCartAddToExistingWine(cart, newWine){
  if (Array.isArray(newWine)){
    newWine.forEach(elem => {
    	// console.log(elem)
     let found = false;
     cart.forEach(ele=>{
        if (ele.item === elem.item){
          ele.quantity = parseInt(ele.quantity) + parseInt(elem.quantity)
          found = true
        }
      });
      if (!found) cart.push(elem)
    })

  } else {
  	let found = false;
    cart.forEach(ele=>{
      if (ele.item === newWine.item){
        ele.quantity = parseInt(ele.quantity) + parseInt(newWine.quantity)
        found = true
      }
    });
    if (!found) cart.push(newWine)
  }
  return cart
}
