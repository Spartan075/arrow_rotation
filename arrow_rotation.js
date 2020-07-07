const mod = 'arrow_rotation';
const modDisplayName = "Arrow Rotation"

let rX = 0;
let rY = 0;
var activeTokens = [];

class ArrowRotation {


    static controlTokenEventHandler(token, opt) {
        if (opt) {
            activeTokens.push(token);
        } else {
            const index = activeTokens.indexOf(token);
            if (index > -1) {
                activeTokens.splice(index, 1);
            }
        }
        console.log(activeTokens);
    }

    static rotate(token) {
        var token_rotation = 0;

        if ((rX == 0 && rY < 0)) token_rotation = 180; // up
        else if ((rX == 0 && rY > 0)) token_rotation = 0; // down
        else if ((rX > 0 && rY == 0)) token_rotation = 270; // to the right
        else if ((rX > 0 && rY < 0)) token_rotation = 225; // up to the right
        else if ((rX > 0 && rY > 0)) token_rotation = 315; // down to the right
        else if ((rX < 0 && rY == 0)) token_rotation = 90; // to the left
        else if ((rX < 0 && rY > 0)) token_rotation = 45; // down to the left
        else if ((rX < 0 && rY < 0)) token_rotation = 135 // up to the left

        console.log("rX: " + rX + ", rY: " + rY);
        console.log(token);
        token.update({
            rotation: token_rotation
        });
    }
}


$(document).keydown(function (event) {

    var isArrow = false;

    switch (event.code) {
        case "ArrowLeft":
            rX = -1;
            isArrow = true;
            break;
        case "ArrowRight":
            rX = 1;
            isArrow = true;
            break;
        case "ArrowDown":
            rY = 1;
            isArrow = true;
            break;
        case "ArrowUp":
            rY = -1;
            isArrow = true;
            break;
        default:
            break;
    }

    if (isArrow) {
        activeTokens.forEach(token => ArrowRotation.rotate(token));
    }

});

$(document).keyup(function (event) {
    switch (event.code) {
        case "ArrowLeft":
            rX = 0;
            console.log("rX RESET");
            break;
        case "ArrowRight":
            rX = 0;
            console.log("rX RESET");
            break;
        case "ArrowDown":
            rY = 0;
            console.log("rY RESET");
            break;
        case "ArrowUp":
            rY = 0;
            console.log("rY RESET");
            break;
        default:
            break;
    }
});


	KeyboardManager.MOVEMENT_KEYS = {
        w: ["up"],
        a: ["left"],
        s: ["down"],
        d: ["right"],
        W: ["up"],
        A: ["left"],
        S: ["down"],
        D: ["right"],
        ArrowUp: ["Red"],
        ArrowRight: ["Blue"],
        ArrowDown: [],
        ArrowLeft: ["left"],
        Numpad1: ["down", "left"],
        Numpad2: ["down"],
        Numpad3: ["down", "right"],
        Numpad4: ["left"],
        Numpad6: ["right"],
        Numpad7: ["up", "left"],
        Numpad8: ["up"],
        Numpad9: ["up", "right"],
    };

});

Hooks.on("controlToken", ArrowRotation.controlTokenEventHandler);