const mod = 'arrow_rotation';
const modDisplayName = "Arrow Rotation"


Hooks.on("ready", function () {
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
    
});

KeyboardManager.getKey(event) {
    console.log(event.code);
}