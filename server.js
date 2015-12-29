var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

// 各パーツの位置をサーバー側で一元管理
var position;

io.on('connection', function(socket){
    // 新規ログインユーザーに現時点での各パーツの位置を送信
    socket.emit('part_change', position);
    // 誰かがパーツを動かしたら、動かした本人以外に最新のパーツ位置を送信
    socket.on('part_change', function(data){
        position = data;
        socket.broadcast.emit('part_change', position);
    });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

// app 配下の静的ファイルをホスティング
app.use(express.static('app'));

http.listen(3000, function(){
    console.log('listening on *:3000');
});
