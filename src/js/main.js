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

    for (var key in defaultPositions) {
        // let を使わないと、例えば base のロードが終わる前にループが nose に移って name が 'nose' になってしまう
        let name = key;
        fabric.Image.fromURL('img/' + name + '.png', function(img) {
            img.set({ left: defaultPositions[name].x, top: defaultPositions[name].y});
            canvas.add(img);
            if (name == 'base') {
                canvas.sendToBack(img);
                img.lockRotation = true;
                img.lockMovementX = true;
                img.lockMovementY = true;
                img.lockScalingX = true;
                img.lockScalingY = true;
            }
            parts[name] = img;
        });
    }

    var setPart = function (name, x, y) {
        parts[name].set({left: x, top: y});
    };
};
