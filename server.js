// Configure Session
const express = require('express');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session');
const cors = require('cors');
const json = require('body-parser').json;
const config = require('./config/config');
const path = require('path');
const fs = require('fs');
const http = require('http');


const app = express();
var server = require('http').createServer(app)

var io = require('socket.io')(server);

const port = process.env.PORT || 5001;

app.use(cors({
  // origin: ['http://localhost:8080'],
  // credentials: true
}))
app.use(json());
// app.use(session(config.session));
const MongoDBStore = mongoDBSession( session );
const store = new MongoDBStore( {
      collection: "expressSessions"
    , uri: config.database.mongoURI
} );
app.use( session( Object.assign( {}, config.session, { store } ) ) );

// Configure Mongoose
const mongoose = require('mongoose');
mongoose.connect(config.database.mongoURI, {useMongoClient: true});
mongoose.connection.once("open", () => console.log('WINE database now connected!'));

// Configure Routes
const masterRoutes = require('./server/features/masterRoutes');
masterRoutes(app);

io.on('connection', function (socket) {
  socket.on('driverPosition', position => {
    socket.broadcast.emit('driverPosition', position)
  });

  socket.on('disconnect', function (data) {
  });

  socket.on('order', order => {
    socket.broadcast.emit('order', order)
  });

  socket.on('order_status', order => {
    socket.broadcast.emit('order_status', order)
  });

});

// Listen on Port
server.listen(port, ()=>console.log(`listening on port ${port}`));
