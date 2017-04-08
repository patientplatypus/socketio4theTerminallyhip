require('dotenv').config({silent: true});

var mongoose = require('mongoose'),
  message_conn;

message_conn = mongoose.createConnection('mongodb://pweyand:Fvnjty0b@ds155490.mlab.com:55490/socketdb');

message_conn.on('error', function(err){
  if(err){
  	throw err;
  	console.log(message_conn);
  } 
});

message_conn.once('open', function callback () {
  console.info('Mongo db connected successfully');
});

module.exports = message_conn;
