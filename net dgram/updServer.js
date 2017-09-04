var dgram = require("dgram");

var server = dgram.createSocket('udp4');

server.on('error', function() {
    console.log('server error:\n' + err.stack);
    server.close();
});

// 接收来自客户端的消息
server.on('message', function(msg, rinfo) {
    console.log('server got: ' + msg.toString() + ' form ' + rinfo.address + ":" + rinfo.port);
});

// 监听服务
server.on('listening', function() {
    var address = server.address();
    console.log('server listening on ' + address.address + ':' + address.port);
});

server.bind(41234);
