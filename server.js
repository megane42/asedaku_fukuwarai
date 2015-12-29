var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

// 各パーツの位置をサーバー側で一元管理
var positions = [
    {
        target: 'base',
        params: { top: 0, left: 0, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'nose',
        params: { top: 175, left: 165, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'mouth',
        params: { top: 255, left: 160, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'eye_l',
        params: { top: 115, left: 195, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'eye_r',
        params: { top: 125, left: 123, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'brow_l',
        params: { top: 85, left: 195, angle: 0, scaleX: 1, scaleY: 1 }
    },
    {
        target: 'brow_r',
        params: { top: 95, left: 123, angle: 0, scaleX: 1, scaleY: 1 }
    }
];

io.on('connection', function(socket){
    // 新規ユーザーのロードが完了したら
    socket.on('part_loaded', function(name){
        // 現時点でのパーツの位置を新規ユーザーだけに送信
        positions.forEach(function(item, idx) {
            if (item.target == name) {
                socket.emit('part_change', item);
            }
        });
    });

    // 誰かがパーツを動かしたとき
    socket.on('part_change', function(data){
        // positions を最新のデータで更新
        positions.forEach(function(item, idx) {
            if (item.target == data.target) {
                positions[idx] = data;
            }
        });
        // 動かした本人以外に最新のパーツ位置を送信
        socket.broadcast.emit('part_change', data);
    });
});

// Web サーバーの設定 -----------------------------------------------

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

// app 配下の静的ファイルをホスティング
app.use(express.static('app'));

http.listen(3000);
