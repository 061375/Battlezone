var GUI = (function(){
    
    'use strict';
    
    var b_gameover = true;
    
    var b_showscore = true;
    
    var score = 0;
    
    var highscore = 0;
    
    var hastarget = false;
    
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
        retical();
        setTimeout(function(){loop();},100);
    }
    var showscore = function() {
        $w.canvas.text(i,W - (W/4),50,'score '+pad(score,4),'fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,W - (W/4),50+LINEHEIGHTH1,'high score '+pad(score,4),'fill',FONTH3+' '+FONT,RED);
    }
    var gameover = function() {
        $w.canvas.text(i,(W/2)-100,(H/4),'game over','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,(W/3),(H/4)+(LINEHEIGHTH1*3),'PRESS ENTER TO START A NEW GAME','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,(W/2)-210,(H/2)+(LINEHEIGHTH1*8),'jeremy heminger 2018','fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,(W/2)-210,(H/2)+(LINEHEIGHTH1*10),'original atari 1980','fill',FONTH1+' '+FONT,GREEN);
    }
    var retical = function() {
        var color;
        
        if (hastarget) {
            color = RED;
            $w.canvas.line(i,(W/2)-80,(H/3)+100,(W/2)-40,(H/3)+140,color,2);
            $w.canvas.line(i,(W/2)+80,(H/3)+100,(W/2)+40,(H/3)+140,color,2);
            $w.canvas.line(i,(W/2)-80,(H/3)+220,(W/2)-40,(H/3)+190,color,2);
            $w.canvas.line(i,(W/2)+80,(H/3)+220,(W/2)+40,(H/3)+190,color,2);
        }else{
            color = GREEN;
            $w.canvas.line(i,(W/2)-80,(H/3)+100,(W/2)-80,(H/3)+140,color,2);
            $w.canvas.line(i,(W/2)+80,(H/3)+100,(W/2)+80,(H/3)+140,color,2);
            $w.canvas.line(i,(W/2)-80,(H/3)+220,(W/2)-80,(H/3)+190,color,2);
            $w.canvas.line(i,(W/2)+80,(H/3)+220,(W/2)+80,(H/3)+190,color,2);
        }
        $w.canvas.line(i,(W/2),(H/3)+20,(W/2),(H/3)+100,color,2);
        $w.canvas.line(i,(W/2)-80,(H/3)+100,(W/2)+80,(H/3)+100,color,2);
        $w.canvas.line(i,(W/2),(H/3)+220,(W/2),(H/3)+300,color,2);
        $w.canvas.line(i,(W/2)-80,(H/3)+220,(W/2)+80,(H/3)+220,color,2);
    }
    
    var pad = function(num, size){
        return ('000000000' + num).substr(-size);
    }
    
    // --- Setters
    var set_gameover = function(b) {
        b_gameover = b;
    }
    var set_hastarget = function(b) {
        hastarget = b;
    }
    return {
        init:init,
        set_gameover:set_gameover,
        set_hastarget:set_hastarget
    }
}());