/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/

var net = require('net');

GLOBALSOCKET = undefined

function sendReply(data){
  GLOBALSOCKET.write(data);
}

var server = net.createServer(function(socket) {
  socket.write('Echo server!!!\r\n');
    socket.on('error', function(err) {
        console.log("Error")
     })
    socket.on('close', function(){
        console.log("Socked closed")
    })
    socket.on('data', function(data) { console.log(data.toString())});
    GLOBALSOCKET = socket;
    setTimeout(sendReply,1000,"Hello");
    setTimeout(sendReply,2000,"This is");
    setTimeout(sendReply,3000,"the echo server");
    setTimeout(sendReply,4000,"you use for feeding kara");
});

server.listen(1337, '0.0.0.0');
