var GUI = (function(){
    
    'use strict';
    
    var b_gameover = true;
    
    var b_showscore = true;
    
    var score = 0;
    
    var highscore = 0;
    
    var i;
    
    var init = function() {
        
        i = $w.canvas.init(document.getElementById('gui'));
        $w.canvas.zIndex(i,9999);
        loop();
    }
    var loop = function() {
        $w.canvas.clear(i);
        if (b_gameover) gameover();
        if (b_showscore) showscore();
        setTimeout(function(){loop();},1000);
    }
    var showscore = function() {
        $w.canvas.text(i,W - (W/4),50,'score '+pad(score,4),'fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,W - (W/4),50+LINEHEIGHTH1,'high score '+pad(score,4),'fill',FONTH3+' '+FONT,RED);
    }
    var gameover = function() {
        $w.canvas.text(i,(W/2)-100,(H/4),'game over','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,(W/3),(H/4)+(LINEHEIGHTH1*3),'PRESS ENTER TO START A NEW GAME','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,(W/2)-120,(H/2)+(LINEHEIGHTH1*8),'atari 1980','fill',FONTH1+' '+FONT,GREEN);
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