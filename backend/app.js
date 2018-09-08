require('dotenv').config({silent: true});
var mongoose =  require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('./models/messagehistory');
var index = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

/*
http://stackoverflow.com/questions/20909778/how-to-use-socket-io-in-express-routes
var routes = require('./routes/routes');
routes(app, io);

*/

var app = express();

//mongoose.connect('mongodb://pweyand:Fvnjty0b@ds155490.mlab.com:55490/socketdb');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
//app.use('/chat', chat);
app.use('/', index);


var http = require('http');
var server = http.createServer(app);
// Pass a http.Server instance to the listen method
// var io = require('socket.io').listen(server);
var io = require('socket.io')(server, { origins: '*:*'});
app.use('/static', express.static('node_modules'));
server.listen(8080);
chat(app,io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found Jeeves');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
