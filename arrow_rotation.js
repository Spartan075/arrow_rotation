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
    
	_handleMovement(event, layer) {
    if ( !this._moveKeys.size ) return;
    // Get controlled objects
    let objects = layer.placeables.filter(o => o._controlled);
    if ( objects.length === 0 ) return;
    // Define movement offsets and get moved directions
    const directions = this._moveKeys;
    let dx = 0;
    let dy = 0;
    // Assign movement offsets
    if ( directions.has("left") ) dx -= 1;
    if ( directions.has("up") ) dy -= 1;
    if ( directions.has("right") ) dx += 1;
    if ( directions.has("down") ) dy += 1;
    this._moveKeys.clear();
    // Perform the shift or rotation
    layer.moveMany({dx, dy, rotate: event.shiftKey});
  }

$(document).keydown(function (event) {

    console.log(event.code);

});