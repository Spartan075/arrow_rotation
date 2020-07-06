const mod = 'arrow_rotation';
const modDisplayName = "Arrow Rotation"



	KeyboardManager.MOVEMENT_KEYS = {
        w: ["up"],
        a: ["left"],
        s: ["down"],
        d: ["right"],
        W: ["up"],
        A: ["left"],
        S: ["down"],
        D: ["right"],
        ArrowUp: [],
        ArrowRight: [],
        ArrowDown: [],
        ArrowLeft: [],
        Numpad1: ["down", "left"],
        Numpad2: ["down"],
        Numpad3: ["down", "right"],
        Numpad4: ["left"],
        Numpad6: ["right"],
        Numpad7: ["up", "left"],
        Numpad8: ["up"],
        Numpad9: ["up", "right"],
    };
    
	static getRotationDegrees(dX = null, dY = null, dir = null) {
        var rotation = 0;
        if ((dX == 0 && dY < 0) || dir == "up") rotation = 180; // up
        else if ((dX == 0 && dY > 0) || dir == "down") rotation = 0; // down
        else if ((dX > 0 && dY == 0) || dir == "right") rotation = 270; // to the right
        else if ((dX > 0 && dY < 0) || dir == "up-right") rotation = 225; // up to the right
        else if ((dX > 0 && dY > 0) || dir == "down-right") rotation = 315; // down to the right
        else if ((dX < 0 && dY == 0) || dir == "left") rotation = 90; // to the left
        else if ((dX < 0 && dY > 0) || dir == "down-left") rotation = 45; // down to the left
        else if ((dX < 0 && dY < 0) || dir == "up-left") rotation = 135 // up to the left
        token_rotation = rotation;

        // i messed with every version of atan, atan2 I could come up with; inverted Y makes it tough
        return rotation;

    }

$(document).keydown(function (event) {

    console.log(event.code);

});