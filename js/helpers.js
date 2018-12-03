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
function helperTankIsDead(i,t) {
    if (undefined === t)
        t = 2000+Math.random() * 5000;
    setTimeout(function() {
        if (!GAMEOVER) 
            $w.add_object_single(
                1,
                Tank,{},
                i,
                W,H
            );
    },t);
}
/**
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @returns {Boolean}
 * */
function lookingat(d,r,w,x,y,x2,y2) {

    let dd = d-w;
    if (dd < 0) dd += 360;
    let angle = $w.math.radians(dd);
    let x3 = x + Math.sin(angle) * r;
    let y3 = y + Math.cos(angle) * r;
    dd = d+w;
    if (dd > 360) dd -= 360;
    angle = $w.math.radians(dd);
    let x4 = x + Math.sin(angle) * r;
    let y4 = y + Math.cos(angle) * r;
    Devlog.log('lookingat x',x);
    Devlog.log('lookingat y',y);
    Devlog.log('lookingat x2',x2);
    Devlog.log('lookingat y2',y2);
    Devlog.log('lookingat x3',x3);
    Devlog.log('lookingat y3',y3);
    Devlog.log('lookingat x4',x4);
    Devlog.log('lookingat y4',y4);
    //$w.canvas.polygon(2,[[x,y],[x3,y3],[x4,y4]],'#e2ff00','fill');
    return $w.collision.inside([x2,y2],[[x,y],[x3,y3],[x4,y4]]);
}
function helperSound(callback) {
    if (SOUNDON) {
        SOUNDON = false;
        $w.assets.audio.engineidle.loop = false;
        $w.assets.audio.engineidle.pause();
        $w.assets.audio.engine.loop = false;
        $w.assets.audio.engine.play();
    }else{
        SOUNDON = true;
        $w.assets.audio.engineidle.loop = true;
        $w.assets.audio.engineidle.play();
    }
    if (typeof callback === 'function') {
        callback();
    }
}
function helperStartGame() {
    if (GAMEOVER) {
        helperSound(function(){
            GUI.set_gameover(false);
        });
        
    }
}
function helperShowInstructions() {
    if (GAMEOVER) {
        let b = GUI.get_showinstructions();
        b = (b==true ? false : true);
        GUI.set_showinstructions(b);
        b = (b==true ? false : true);
        helperSetShowHorizon(b);
    }
}
function helperSetShowHorizon(b) {
    SHOWHORIZON = b; 
}
function helperShowHorizon() {
    let $h = document.getElementById('horizon');
    if (SHOWHORIZON) {
        $h.style.display = 'block';
    }else{
        $h.style.display = 'none';
    }
}
/**
 * kill all NPCs on stage that have a destroy function
 * this assumes that 'passive' is a standard
 * @param {Boolean}
 * @returns {Void}
 * */
function helperKillAll(b) {
    for (let prop in $w.objects) {
            if ($w.objects.hasOwnProperty(prop)) {
                let l = $w.objects[prop].length;
                for(let j = 0; j < l; j++) {
                    if ($w.objects[prop][j] != null)
                        if (typeof $w.objects[prop][j].destroy === 'function')
                            $w.objects[prop][j].destroy(b);   
                }
            }
    }
}