const app = require('express')()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer);

let ctx = null

app.get('/', function(req, res){
  console.log("Homepage ", __dirname);
  res.sendFile(__dirname + '/index.html')
});

// accept connection
io.on('connect', socket => {
  console.log('connect');
  socket.on('echo', (data, callback) => {
    console.log(data)
    callback(data);
  });

  socket.on('ws:videomeeting', (data, callback) => {
    bookingId = data.bookingId
    jwtToken = data.jwtToken
    callback({ message: 'success' });
  });

  let jwtToken, bookingId
  socket.on('ws:videomeeting:getMeetingUrl', (data, callback) => {
    callback({
      url1: 'https://meetingserver.goodme.it/r/5fd099f23289a777147159a63d22a3957cfdab6ac663c3c33b69835e9b6a131a/1',
      url2: 'https://meetingserver.goodme.it/r/5fd099f23289a777147159a63d22a3957cfdab6ac663c3c33b69835e9b6a131a/2',
    });
  });

});

// setInterval(() => {
//   io.emit('imlive', Date.now());
// }, 1000);

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});
