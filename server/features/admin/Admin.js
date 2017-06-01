const mongoose = require('mongoose');

const Admin = new mongoose.Schema( {
  sub: {type: String, required: true, unique: true}
  , name: {type: String, required: true, trim: true}
  , picture: {type: String, default: 'http://www.clker.com/cliparts/m/3/I/C/c/2/grey-silhouette-of-man.svg'}
  , updated_at: {type: Date}
  , created_at: {type: Date}
}, {collection: "administrators"});

module.exports = mongoose.model( "Admin", Admin );
