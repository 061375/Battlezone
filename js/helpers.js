/**
 *
 * Helpers
 *
 * */

/**
 * @param {Number} canvas ID
 * @param {Number}
 * @param {Number}
 *
 * @returns {Number}
 * */
function stayinsidegame(i,x,y) {
    var re = {x:x,y:y}
    /*
    switch($w.collision.insideCanvas(i,x,y)) {
        case 1:
            re.x = $w.canvas.get(i,'canvas').width - 2;
            break;
        case 2:
            re.y = $w.canvas.get(i,'canvas').height - 2;
            break;
        case 3:
            re.x = 0;
            break;
        case 4:
            re.y = 0;
            break;
    }*/
    switch(insidegame(x,y)) {
        case 1:
            re.x = STAGESIZE - 2;
            break;
        case 2:
            re.y = STAGESIZE - 2;
            break;
        case 3:
            re.x = 0;
            break;
        case 4:
            re.y = 0;
            break;
    }
    return re;
}

/**
* check if target coords are inside the game
* @param {Number}
* @param {Number}
*
* @returns {Boolean}
* */
function insidegame(x,y) {

    if (x < 0) return 1;
    if (x > STAGESIZE) return 3;
    if (y > STAGESIZE) return 4;
    if (y < 0) return 2;
    
    return false;
}
/**
 * makes a new enemy tank after it has been destroyed
 * @param {Number} canvas ID
 * @param {Number} time until make a new tank
 * @returns {Void}
 * */
function tankisdead(i,t) {
    if (undefined === t)
        t = 2000+Math.random() * 5000;
    setTimeout(function() {
        $w.add_object_single(
            1,
            Tank,{},
            i,
            W,H
        );
    },t);
}