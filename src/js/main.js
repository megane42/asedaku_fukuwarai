window.onload = function() {
    var canvas = new fabric.Canvas('canvas');
    var socket = io();

    var defaultPositions = {
        'base':   { x:0,   y:0 },
        'nose':   { x:165, y:175 },
        'mouth':  { x:160, y:255 },
        'eye_l':  { x:195, y:115 },
        'eye_r':  { x:123, y:125 },
        'brow_l': { x:195, y:85 },
        'brow_r': { x:123, y:95 },
    };

    var parts = {};

    for (var name in defaultPositions) {
        var opt = {};
        if (name == 'base') {
            Object.assign(opt, {
                lockRotation: true,
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true
            });
        }

        // let を使って img をブロックスコープにしないと、処理前に次のループに進んで img が変更されてシマウマ
        let img = new fabric.Image(document.getElementById(name), opt);

        ['moving', 'scaling', 'rotating'].forEach(function(event) {
            img.on(event, function() {
                socket.emit('part_change', canvas.toJSON());
            });
        });

        parts[name] = img;
        canvas.add(img);
    }

    socket.on('part_change', function(data){
        canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
    });
};
