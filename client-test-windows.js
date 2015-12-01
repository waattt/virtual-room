//replace localhost with your server's IP;
var socket = require('socket.io-client')('http://192.168.0.136:80');

//replace with your hardware address
var addressToTrack = 'd4f5137787f5'; 

socket.on('connect', function(){  
    console.log('connected to server');
});