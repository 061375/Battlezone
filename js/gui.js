var GUI = (function(){
    
    'use strict';
    
    var b_gameover = true;
    
    var b_showscore = true;
    
    var score = 0;
    
    var highscore = 0;
    
    var init = function() {
        $w.canvas.init(document.getElementById('gui'));
        loop();
    }
    var loop = function() {
        $w.canvas.clear(0);
        if (b_gameover) gameover();
        if (b_showscore) showscore();
        setTimeout(function(){loop();},1000);
    }
    var showscore = function() {
        $w.canvas.text(0,W - (W/4),50,'score '+pad(score,4),'fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(0,W - (W/4),50+LINEHEIGHTH1,'high score '+pad(score,4),'fill',FONTH3+' '+FONT,RED);
    }
    var gameover = function() {
        $w.canvas.text(0,(W/2)-100,(H/3),'game over','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(0,(W/3),(H/3)+(LINEHEIGHTH1*3),'PRESS ENTER TO START A NEW GAME','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(0,(W/2)-120,(H/3)+(LINEHEIGHTH1*6),'atari 1980','fill',FONTH1+' '+FONT,GREEN);
    }
    var pad = function(num, size){
        return ('000000000' + num).substr(-size);
    }
    var set_gameover = function(b) {
        b_gameover = b;
    }
    return {
        init:init,
        set_gameover:set_gameover
    }
}());