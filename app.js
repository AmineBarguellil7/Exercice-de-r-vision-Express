var express=require("express");
var app=express();
const socketio = require('socket.io');
const server = app.listen(3000, () => console.log('Server listening on port 3000'));
const io = socketio(server);




io.on('connection', (socket) => {
    console.log('New client connected');
  
    // listen for notification events
    socket.on('notification', (msg) => {
      console.log('Notification:', msg);
      io.emit('notification', msg);
    });
  
    // listen for disconnection events
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

});


app.use(express.json())

var mongoose = require('mongoose');
var configDB = require('./database/mongodb');
mongoose.connect(configDB.mongo.uri);







var productsRouter = require('./routes/products');




app.use('/products', productsRouter);


module.exports = { app, io }; 











