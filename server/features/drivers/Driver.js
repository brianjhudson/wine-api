const mongoose = require('mongoose');

const Driver = new mongoose.Schema( {
  sub: {
    type: String
    , required: true
    , unique: true
  }
  , name: {
    type: String
    , required: true
    , trim: true
  }
  , picture: {
    type: String
    , default: 'http://www.clker.com/cliparts/m/3/I/C/c/2/grey-silhouette-of-man.svg'
  }
  , address: {
    type: String
    , default: "Dallas, TX"
  }
  , vehicle: {
    type: String
    , default: "Mazda MX-5 Miata"
  }
  , license_plate: {
    type: String
    , default: "DLVRY PRSN"
  }
  , updated_at: {type: Date}
} );

module.exports = mongoose.model( "Driver", Driver );
