 // Express   -  Simple  Chat  application
 https://github.com/djalmabright/chat-example

// REQUEST - Simplified HTTP request client.
var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , request = require('request')
  , TMP_FILE_PATH = path.join(path.sep, 'tmp', 'foo')
;

// write a temporary file:
fs.writeFileSync(TMP_FILE_PATH, 'foo bar baz quk\n');

http.createServer(function(req, res) {
  console.log('the server is receiving data!\n');
  req
    .on('end', res.end.bind(res))
    .pipe(process.stdout)
  ;
}).listen(3000).unref();

fs.createReadStream(TMP_FILE_PATH)
  .pipe(request.post('http://127.0.0.1:3000'))
;

// BROWSERIFY- browser-side require() the node.js way  -  npm install -g browserify
var foo = require('./foo.js');
var bar = require('../lib/bar.js');
var gamma = require('gamma');
var elem = document.getElementById('result');
var x = foo(100) + bar('baz');
elem.textContent = gamma(x);
module.exports = function (n) { return n * 111 }

$ browserify main.js > bundle.js

 // SOCKET.IO  -  Simple Chat Example
// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown';

io.adapter(redis({ host: 'redis', port: 6379 }));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
app.use(express.static(__dirname + '/public'));
// Chatroom
var numUsers = 0;
io.on('connection', function (socket) {
  socket.emit('my-name-is', serverName);

  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
