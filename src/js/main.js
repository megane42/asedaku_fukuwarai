window.onload = function() {

    var canvas = new fabric.Canvas('canvas');
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
        var opt = {
            left: defaultPositions[name].x,
            top:  defaultPositions[name].y,
        };
        if (name == 'base') {
            Object.assign(opt, {
                lockRotation: true,
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true
            });
        }
        var img = new fabric.Image(document.getElementById(name), opt);
        parts[name] = img;
        canvas.add(img);
    }

    var setPart = function (name, x, y) {
        parts[name].set({left: x, top: y});
        canvas.renderAll();
    };
};
