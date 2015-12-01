// Requirements!
var noble = require('noble');

// IMPORTANT
// Change server ip!
var server = 'http://192.168.0.136:80';
var socket = require('socket.io-client')(server);

console.log('Connecting to ' + server + '....');

// MAC Adressen van de iBeacons
var beacon1 = 'd4f5137787f5',
    beacon2 = '',
    beacon3 = '',
    beacon4 = '',
    beacon5 = '';

socket.on('connect', function(){  
    console.log('connected to server');    
});

noble.on('discover', function(peripheral){
    if(peripheral.uuid == beacon1 ||
       peripheral.uuid == beacon2 ||
       peripheral.uuid == beacon3 ||
       peripheral.uuid == beacon4 ||
       peripheral.uuid == beacon5 ){
        console.log('specific device found' + peripheral.rssi);
        socket.emit('deviceData', {mac: peripheral.uuid, rssi:peripheral.rssi});    
    }
});

noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        noble.startScanning([], true);
    } else {
        noble.stopScanning();
    }
});