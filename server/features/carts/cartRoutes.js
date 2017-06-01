const cartCtrl = require('./cartCtrl');
const jwt = require('express-jwt');
const config = require('../../../config/config');

module.exports = app => {
  app.route('/api/cart/session')
    .get(cartCtrl.getCartSession)
    .post(cartCtrl.setCartSession)
    .put(cartCtrl.updateCartSession)
    .delete( cartCtrl.deleteCartSession )
  app.route('/api/cart')
    .get(
      jwt({secret: new Buffer(config.auth0.secret, 'base64'), audience: config.auth0.audience}),
      cartCtrl.checkCartSession,
      cartCtrl.getCart )
    .post(
      jwt({secret: new Buffer(config.auth0.secret, 'base64'), audience: config.auth0.audience}),
      cartCtrl.addOneToCart,
      cartCtrl.getCart )
    .put(
      jwt({secret: new Buffer(config.auth0.secret, 'base64'), audience: config.auth0.audience}),
      cartCtrl.updateCart,
      cartCtrl.getCart )
}
