var GUI = (function(){
    
    'use strict';
    
    var b_gameover = true;
    
    var b_showscore = true;
    
    var score = 0;
    
    var highscore = 0;
    
    var hastarget = false;
    
    // var holds a prerender of the radar lines for the animation
    var radar_l = [];
    var radar_t = 0;
    var radar_size = 80;
    
    var i;
    
    var init = function() {
        i = $w.canvas.init(document.getElementById('gui'));
        $w.canvas.zIndex(i,9999);
        
        for(let r=0; r<=360; r++) {
            let rr = $w.math.radians(r);
            let xy = [];
            xy[0] = (W/2) + Math.cos(rr) * radar_size;
            xy[1] = 100 + Math.sin(rr) * radar_size;
            radar_l.push(xy);
        }
        loop();
    }
    var loop = function() {
        $w.canvas.clear(i);
        if (b_gameover) gameover();
        if (b_showscore) showscore();
        radar();
        retical();
        
        setTimeout(function(){loop();},100);
    }
    var showscore = function() {
        $w.canvas.text(i,W - (W/4),50,'score '+pad(score,4),'fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,W - (W/4),50+LINEHEIGHTH1,'high score '+pad(score,4),'fill',FONTH3+' '+FONT,RED);
    }
    var gameover = function() {
        center(((H/4)-20),'game over',FONTH1);
        center(((H/4)-20)+(LINEHEIGHTH1*3),'PRESS ENTER TO START A NEW GAME',FONTH1);
        center((H/2)+(LINEHEIGHTH1*8),'jeremy heminger 2018',FONTH1);
        center((H/2)+(LINEHEIGHTH1*10),'original atari 1980',FONTH1);
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
    var radar = function() {
        $w.canvas.line(i,(W/2),100,radar_l[225][0],radar_l[225][1],RED);
        $w.canvas.line(i,(W/2),100,radar_l[315][0],radar_l[315][1],RED);
        $w.canvas.line(i,(W/2),100,radar_l[radar_t][0],radar_l[radar_t][1],RED);
        radar_t+=10;
        if (radar_t > 360) radar_t = 0;
        
        if (undefined !== $w.objects.Tank) {
            let l = $w.objects.Tank.length;
            for(let t=0;t<l;t++) {
                if ($w.objects.Tank[t] != null) {
                    let td = Math.floor($w.motion.point_direction(Player.getX(),Player.getY(),$w.objects.Tank[t].x,$w.objects.Tank[t].y,false,Player.getD()));
                    td = -td;
                    if (td > 360) td -= 360;
                    if (td < 0) td += 360;
                    td = $w.math.radians(td);
             
                    let dis = $w.motion.distance_to_point(Player.getX(),Player.getY(),$w.objects.Tank[t].x,$w.objects.Tank[t].y) / 20;
                    
                    let x = (W/2) + Math.cos(td) * dis;
                    let y = 100 + Math.sin(td) * dis;
                    $w.canvas.circle(i,x,y,3,RED,1);
                }
            }
        }
        $w.canvas.circle(i,(W/2),100,radar_size,RED,1,true); 
    }
    var center = function(t,s,h) {
        h = h.replace('px','');
        let l = (W/2) - (Math.floor(s.length / 3) * h);
        $w.canvas.text(i,l,t,s,'fill',FONTH1+' '+FONT,GREEN);    
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