var net = require('net');

// 创建TCP服务器
var server = net.createServer();

// 存储所有客户端scoket
var sockets = [];

// 接受客户端连接请求
server.on('connection', function(socket) {
    console.log('Got a new connection');

    sockets.push(socket);

    //获取客户端发送过来的数据
    socket.on('data', function(data) {
        console.log('Got data: ', data.toString());

        //服务器广播数据，把来自客户端的数据发送给其他所有客户端
        sockets.forEach(function(otherSocket) {
            if (otherSocket !== socket) {
                othersocket.write(data);
            }
        });
    });

    //把关闭连接的客户端从服务器广播列表中给删除掉
    socket.on('close', function() {
        console.log('A client connection closed');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
});

server.on('error', function(err) {
    console.log('Server error:', err.message);
});

server.on('close', function() {
    console.log('Server close');
});

server.listen(8080);
