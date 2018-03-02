var GUI = (function(){
    
    'use strict';
    
    var b_gameover = true;
    
    var b_showscore = true;
    
    var b_showHIscore = false;
    
    var b_showInstructions = false;
    
    var score = 0;
    
    var highscore = 0;
    
    var hastarget = false;
    
    // var holds a prerender of the radar lines for the animation
    var radar_l = [];
    var radar_t = 0;
    var radar_size = 80;
    
    // holds a pre-render of the tank player count models
    var tankoutline = null;
    
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
    /**
     * @returns {Void}
     * */
    var loop = function() {
        $w.canvas.clear(i);
        if (b_gameover &! b_showHIscore &! b_showInstructions) gameover();
        if (b_gameover &! b_showHIscore && b_showInstructions) showinstructions();
        if (b_showscore) showscore();
        
        if (!b_gameover) {
            radar();
            retical();
            showplayercount();
        }
        helperShowHorizon();
        setTimeout(function(){loop();},100);
    }
    /**
     * @returns {Void}
     * */
    var showplayercount = function() {
   
        let xx = (W - (W/4)),yy=20,scale = 1,left = 60;
        if (null == tankoutline) {
            let l = tankOutline.length;
            for(let j=0; j<l; j++) {
                tankOutline[j][0] = -tankOutline[j][0] * scale;
                tankOutline[j][1] = -tankOutline[j][1] * scale;
            }
            tankoutline = tankOutline;
        }else{
            for(let j=1; j<Player.getPlayers()+1;j++){
                $w.canvas.polygon2(i,tankoutline,xx+(left*j),yy,GREEN);          
            }
        }
    }
    /**
     * @returns {Void}
     * */
    var showscore = function() {
        $w.canvas.text(i,W - (W/4),70,'score '+pad(score,4),'fill',FONTH1+' '+FONT,GREEN);
        $w.canvas.text(i,W - (W/4),70+LINEHEIGHTH1,'high score '+pad(score,4),'fill',FONTH3+' '+FONT,RED);
    }
    /**
     * @returns {Void}
     * */
    var gameover = function() {
        RENDERGAME = true;
        center(((H/4)-20),'game over',FONTH1);
        center(((H/4)-20)+(LINEHEIGHTH1*3),'PRESS ENTER TO START A NEW GAME',FONTH1);
        center(((H/4)+40)+(LINEHEIGHTH1*3),'PRESS I FOR INSTRUCTIONS',FONTH1);
        center((H/2)+(LINEHEIGHTH1*8),'jeremy heminger 2018',FONTH1);
        center((H/2)+(LINEHEIGHTH1*10),'original atari 1980',FONTH1);
    }
    /**
     * @returns {Void}
     * */
    var showhighscores = function() {
        RENDERGAME = false;
    }
    /**
     * @returns {Void}
     * */
    var showinstructions = function() {
        center(((H/4)-20),'**** battlezone ****',FONTH1);
        center(((H/4)-10)+(LINEHEIGHTH3*3),'the object of this game is simple.',FONTH3);
        center(((H/4)+15)+(LINEHEIGHTH3*3),'kill them before they kill you.',FONTH3);
        center(((H/4)+85)+(LINEHEIGHTH2*3),'controls',FONTH2);
        center(((H/4)+130)+(LINEHEIGHTH2*3),'arrow keys = move',FONTH2);
        center(((H/4)+180)+(LINEHEIGHTH2*3),'spacebar = shoot',FONTH2);
        center(((H/4)+350),'press I to go back',FONTH1);
        RENDERGAME = false;
    }
    /**
     * @returns {Void}
     * */
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
    /**
     * @returns {Void}
     * */
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
    /**
     * @returns {Void}
     * */
    var center = function(t,s,h) {
        let hc = h.replace('px','');
        let l = (W/2) - (Math.floor(s.length / 3) * hc);
        $w.canvas.text(i,l,t,s,'fill',h+' '+FONT,GREEN);    
    }
    /**
     * @returns {String}
     * */
    var pad = function(num, size){
        return ('000000000' + num).substr(-size);
    }
    /**
     * @returns {Void}
     * */
    var init_game = function() {
        RENDERGAME = true;
        $w.add_object_single(
            1,
            Tank,{},
            i,
            W,H
        );    
    }
    
    
    // --- Getters
    var get_showinstructions = function() {
        return b_showInstructions;
    }
    
    
    // --- Setters
    var set_gameover = function(b) {
        b_gameover = b;
        GAMEOVER = b;
        if (!b) init_game();
    }
    var set_hastarget = function(b) {
        hastarget = b;
    }
    var set_showinstructions = function(b) {
        b_showInstructions = b;    
    }
    
    return {
        init:init,
        set_gameover:set_gameover,
        set_hastarget:set_hastarget,
        set_showinstructions:set_showinstructions,
        get_showinstructions:get_showinstructions
    }
}());