var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);
console.log('starting server on :80');

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
                function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var scanner = io.of('/scanner');
scanner.on('connection', function(socket){
    console.log('Scanner Connected');

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });

    socket.on('deviceData', function(data) {
        console.log(data.rssi);
        io.of('/client').emit('message', calculateDistance(data.rssi));
    });
});
var client = io.of('/client');
client.on('connection', function(socket){
    console.log('Client Connected');

    socket.on('disconnect', function() {
        console.log('Client Disconnected');
    });
});
///////////////////////////////////////////////////////////////////////
/////// Calculate the distance
function calculateDistance(rssi) {
  var txPower = -59;

  if (rssi == 0) {
    return -1.0;
  }

  var ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
    return distance;
  }
}
