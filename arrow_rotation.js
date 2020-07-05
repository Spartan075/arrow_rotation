/**
 * 
 * Arrow Rotation -- Rotation using the arrow keys. 
 * 
 * Some code reused and credit given to About Face by Eadorin.
 * 
 */
const mod = 'arrow_rotation';
const modDisplayName = "Arrow Rotation"


CONFIG.debug.hooks=true;

// ---- a few var inits ----
var useIndicator, enableRotation; // convenience
var token_rotation = 0;

/* -------------------------------------------- */

Hooks.once("init", () => {
    game.settings.register(mod,'enable-rotation',{
        name: "about-face.options.enable-rotation.name",
        hint: "about-face.options.enable-rotation.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });



    // convenience
    AboutFace.refreshSettings();
    
});
/* -------------------------------------------- */

export class AboutFace
{
    static async ready() {

        TokenIndicators = [];
        for ( let [i, token] of canvas.tokens.placeables.entries()){
            if (!(token instanceof Token) || !token.actor) { continue; }
            //if (token.owner) {
                // if (token.actor.isPC && game.user.isGM) {
                //     continue;
                // }
                
                let ti = await TokenIndicator.init(token);

                ti.create(game.settings.get(mod,"indicator-sprite"));
                if (!useIndicator || useIndicator == "1") {
                    ti.hide();
                }
                TokenIndicators.push(ti);

            //}
        }
    }

    /* -------------------------------------------- */


    /**
     * Rotation function primarily used by our key event handlers
     */
    static rotate(direction) {

        if (!useIndicator) { return }
        let tokenIndicators = [];

        activeTokens.forEach(token => {

            tokenIndicators.push((TokenIndicators.filter(ti => ti.token.id == token.id))[0]);
            if (token.data.flags.AboutFace) {
                token.data.flags.AboutFace.set('facing',AboutFace.getRotationDegrees(direction));
                //token.update({data:token.data});
            }
            
        });

        tokenIndicators.forEach( ti => {
            let dir = AboutFace.getRotationDegrees(null, null, direction);
            if (!ti) return; // addresses a weird issue where a token might be removed.

  
            
            token_rotation = ti.rotate(dir);
            
            ti.token.update({rotate:token_rotation});
        });
    }

    /* -------------------------------------------- */
    /**
     * returns the degrees to rotate a token
     * @param {int} dX     the value of x2 - x1
     * @param {int} dY     the value of y2 - y1
     * @return int
    **/
    static getRotationDegrees(dX=null, dY=null, dir=null)
    {
        var rotation = 0;
        if ( (dX == 0 && dY < 0)||dir=="up" ) rotation = 180; // up
        else if ((dX == 0 && dY > 0)||dir=="down") rotation = 0; // down
        else if ((dX > 0 && dY == 0)||dir=="right") rotation = 270; // to the right
        else if ((dX > 0 && dY < 0)||dir=="up-right") rotation = 225; // up to the right
        else if ((dX > 0 && dY > 0)||dir=="down-right") rotation = 315; // down to the right
        else if ((dX < 0 && dY == 0)||dir=="left") rotation = 90; // to the left
        else if ((dX < 0 && dY > 0)||dir=="down-left") rotation = 45; // down to the left
        else if ((dX < 0 && dY < 0)||dir=="up-left") rotation = 135 // up to the left
        token_rotation = rotation;
    
        // i messed with every version of atan, atan2 I could come up with; inverted Y makes it tough
        return rotation;
    
    }

    /* -------------------------------------------- */

    /**
     * Gets the new rotational value and rotates the token
     * @param {Scene} scene         - the current scene
     * @param {object} token        - data of the clicked token
     * @param {object} updateData   - the data that was actually updated by the move
     * @param {*} options 
     * @param {*} userId 
     */
   

//===================================================
// Handle key events, specifically holding shift
//===================================================
var activeTokens = [];
$(document).keydown(function (event) {

    // detect which token trying to move

    if (event.shiftKey) {
        switch (event.which) {
            case 65: // a
            case 37: // left arrow
                AboutFace.rotate('left');
                break;
            case 87: // w
            case 38: // up arrow
                AboutFace.rotate('up');
                break;
            case 68: // d
            case 39: // right arrow
                AboutFace.rotate('right');
                break;
            case 83: // s
            case 40: // down arrow
                AboutFace.rotate('down');
                break;
            default:
                break;
        }
    }

});

var map = {}; // You could also use an array
onkeydown = onkeyup = function (e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    if (e.shiftKey) {
        if ( (map[87] && map[65]) || (map[38] && map[37]) ) {
            AboutFace.rotate('up-left');
        } else if ( (map[87] && map[68]) || (map[38] && map[39]) ) {
            AboutFace.rotate('up-right');
        } else if ( (map[83] && map[65]) || (map[40] && map[37]) ) {
            AboutFace.rotate('down-left');
        } else if ( (map[83] && map[68]) || (map[40] && map[39]) ) {
            AboutFace.rotate('down-right');
        }
        
    }
}



Hooks.on("canvasReady",AboutFace.ready);
//Hooks.on("ready",AboutFace.ready);
// Hooks.on("updateScene",AboutFace.ready);
Hooks.on("updateToken",AboutFace.updateTokenEventHandler);
Hooks.on("controlToken",AboutFace.controlTokenEventHandler);

Hooks.on("hoverToken",AboutFace.hoverTokenEventHandler);
Hooks.on("ready",() => {
    Hooks.on("closeSettingsConfig",AboutFace.closeSettingsConfigEventHandler);
})

