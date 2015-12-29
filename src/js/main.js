window.onload = function() {
    var canvas = new fabric.Canvas('canvas');
    var socket = io();

    var partsList = ['base', 'nose', 'mouth', 'eye_l', 'eye_r', 'brow_l', 'brow_r'];
    var parts = {};

    partsList.forEach(function(name) {
        var opt = {};
        if (name == 'base') {
            Object.assign(opt, {
                lockRotation  : true,
                lockMovementX : true,
                lockMovementY : true,
                lockScalingX  : true,
                lockScalingY  : true
            });
        }

        // let を使って変数をブロックスコープにしないと、処理前に次のループに進んで内容が上書きされてシマウマ
        let img = new fabric.Image(document.getElementById(name), opt);

        ['moving', 'scaling', 'rotating'].forEach(function(event) {
            img.on(event, function() {
                socket.emit('part_change', {
                    target: name,
                    params: {
                        top    : img.getTop(),
                        left   : img.getLeft(),
                        angle  : img.getAngle(),
                        scaleX : img.getScaleX(),
                        scaleY : img.getScaleY()
                    }
                });
            });
        });

        parts[name] = img;
        canvas.add(img);
        socket.emit('part_loaded', name);
    });

    socket.on('part_change', function(data){
        parts[data.target].set(data.params);
        canvas.renderAll();
    });
};
