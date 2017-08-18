const jwt = require('express-jwt');
const config = require('../../../config/config');
const adminCtrl = require('./adminCtrl.js');
const driverCtrl = require('../drivers/driverCtrl.js');

module.exports = app => {

  app.route( '/api/admin/' )
    .post( 
      //  jwt({secret: new Buffer(config.auth0.secret, 'base64'), audience: config.auth0.audience})
      // , 
      (req, res, next) => {
          console.log("Admin: ", req.body);
          next()
        }
      , adminCtrl.getAdmin, adminCtrl.saveAdmin);

};
