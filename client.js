var net = require('net');

var client = new net.Socket();
client.connect(1337, '192.168.1.121', function() {
  console.log('Connected');
  client.write('hihihih');
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  //client.destroy(); // kill client after server's response
    setTimeout(myFunc, 500, 'nice :D');
});

function myFunc(data){
    client.write(data)
    client.destroy();
}

client.on('close', function() {
  console.log('Connection closed');
});