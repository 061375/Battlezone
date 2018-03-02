var Player = (function(){
    
    'use strict';
    
    var d,
        x,
        y,
        events = [],
        canfire = true,
        code = {},
        size = 10,
        players = MAXPLAYERS,
        alive = true;
    
    var init = function() {
       d = 180;
       x = (STAGESIZE/2);
       y = (STAGESIZE/2);
       code[32] = 'KeySpace';
       code[38] = 'ArrowUp';
       code[40] = 'ArrowDown';
       code[37] = 'ArrowLeft';
       code[39] = 'ArrowRight';
       document.addEventListener("keydown",function(evt){
              if(events.indexOf(evt.key) == -1) {
                     if (undefined !== code[evt.keyCode]) 
                            events.push(code[evt.keyCode]);
              }
       });
       document.addEventListener("keyup",function(evt){
              var l = events.length;
              for(let i=0; i<l; i++) {
                     if (undefined !== code[evt.keyCode])
                            if (events[i] == code[evt.keyCode]) {
                                   if (typeof Player[events[i]+'KeyUp'] === 'function')
                                          Player[events[i]+'KeyUp']();
                            
                                   events.splice(i,1);
                            }
              }
       });
       
       // tank engine idle
       EngineIdle();
       
       setInterval(function(){Player.loop()},1);
    }
    /**
    * loop
    * @returns {Void}
    * */
   var loop = function() {
       let l = events.length, o = {d:d,x:x,y:y};
       if (!GAMEOVER && alive) {
              // check for key inputs
              for(let i=0; i<l; i++) {
                     if (typeof Player[events[i]] === 'function') 
                            o = Player[events[i]](o);
              }
       }else{
            if (alive) {
              // run simulation
              o = PlayerSimulation.loop(o);
            }else{
                PlayerDead.loop();
            }
       }
       d = o.d;
       x = o.x;
       y = o.y;
       if (d > 360) d = 0;
       if (d < 0) d = 360;

       let xy = stayinsidegame(1,x,y);
       x = xy.x;
       y = xy.y;
       
       let hastarget = false;
       if (undefined !== $w.objects.Tank) {
              l = $w.objects.Tank.length;
              for(let t=0; t<l;t++) {
                   if ($w.objects.Tank[t] != null) {
                       if (lookingat(d,1000,5,x,y,$w.objects.Tank[t].x,$w.objects.Tank[t].y)) {
                           hastarget = true;
                       }
                   }
              }
       }
       if (hastarget) {
            Devlog.log('playeraimingattank','true');
            GUI.set_hastarget(true);
       }else{
            GUI.set_hastarget(false);
            Devlog.log('playeraimingattank','false');
       }
   }
   /**
    * Aleft
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var ArrowLeft = function(o) {
       o.d-=TANKTURNSPEED;
       return o;
   }
   /**
    * Aright
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var ArrowRight = function(o) {
       o.d+=TANKTURNSPEED;
       return o;
   }
   /**
    * Aup
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var ArrowUp = function(o) {
       Engine();
       o.x+=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y+=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
   }
   /**
    * ArrowUpKeyUp
    * @returns {Void}
    * */
   var ArrowUpKeyUp = function() {
       EngineIdle();
   }
   /**
    * Adown
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var ArrowDown = function(o) {
       Engine();
       o.x-=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y-=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
   }
   /**
    * ArrowDownKeyUp
    * @returns {Void}
    * */
   var ArrowDownKeyUp = function() {
       EngineIdle();   
   }
   /**
    * Aa
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var KeySpace = function(o) {
       if (canfire) {
              canfire = false;
              $w.add_object_single(
                     1,
                     Bullet,{
                         x:o.x,
                         y:o.y,
                         zz:0,
                         d:o.d,
                         p:this,
                         isplayer:true
                     },
                     2,
                     W,H
              );
              console.log('SHOOT !!!');
       }
       return o;
   }
   
   // ENGINE SOUNDS
   
   /**
    * plays when the engine is reved up
    * */
   var Engine = function() {
       if (!SOUNDON) return;
       $w.assets.audio.engineidle.loop = false;
       $w.assets.audio.engineidle.pause();
       $w.assets.audio.engine.loop = true;
       $w.assets.audio.engine.play();
   }
   /**
    * plays when the engine is idle
    * */
   var EngineIdle = function() {
       if (!SOUNDON) return;
       $w.assets.audio.engineidle.loop = true;
       $w.assets.audio.engineidle.play();
       $w.assets.audio.engine.loop = false;
       $w.assets.audio.engine.pause();    
   }
   
   // GETTERS
   
   /**
    * @returns {Number}
    * */
   var getX = function() {
       return x;
   }
   /**
    * @returns {Number}
    * */
   var getY = function() {
       return y;
   }
   /**
    * @returns {Number}
    * */
   var getD = function() {
       return d;
   }
   /**
    * @returns {Number}
    * */
   var getSize = function() {
        return size;
   }
   /**
    * @returns {Number}
    * */
   var getPlayers = function() {
       return players;
   }
   /**
    * @returns {Boolean}
    * */
   var getAlive = function() {
        return alive;
   }
   
   // Setters
   
   /**
    * @param {Boolean}
    * */
   var setCanFire = function(b) {
       canfire = b;
   }
   /**
    * @param {Number}
    * */
   var setPlayers = function(n) {
       players = n;
   }
   /**
    * @param {Boolean}
    * */
   var setAlive = function() {
        alive = true;
   }
   /**
    * */
   var setDead = function() {
        if(alive) {
            alive = false;
            players--;
            if (players < 1) {
                players = MAXPLAYERS;
                GAMEOVER = true;
            }
            PlayerDead.init();
        }
   }
   return {
        init:init,
        loop:loop,
        ArrowLeft:ArrowLeft,
        ArrowRight:ArrowRight,
        ArrowUp:ArrowUp,
        ArrowUpKeyUp:ArrowUpKeyUp,
        ArrowDown:ArrowDown,
        ArrowDownKeyUp:ArrowDownKeyUp,
        KeySpace:KeySpace,
        getX:getX,
        getY:getY,
        getD:getD,
        setCanFire:setCanFire,
        getSize:getSize,
        getPlayers:getPlayers,
        setPlayers:setPlayers,
        getAlive:getAlive,
        setAlive:setAlive,
        setDead:setDead
    }
}());

/**
 * Displays the tank animation when game over
 * */
var PlayerSimulation = (function(){
    
    'use strict';
    
    var kos=Math.floor(Math.random()*4),
    i=0,
    max = ((100) + Math.random() * 1000),
    tspeed = TANKTURNSPEED / 2;
    
    var loop = function(o) {
       i++;
       if (i>max) {
              // do something new
              kos=Math.floor(Math.random()*4);
              // reset
              i = 0;
              max = ((100) + Math.random() * 1000);
       }
       switch(kos) {
              case 0:o = left(o);break;
              case 1:o = right(o);break;
              case 2:o = forward(o);break;
              case 3:o = reverse(o);break;
       }
       return o;
    }
    var left = function(o) {
       o.d-=tspeed;
       return o;   
    }
    var right = function(o) {
       o.d+=tspeed;
       return o; 
    }
    var forward = function(o) {
       o.x+=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y+=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
    }
    var reverse = function(o) {
       o.x-=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y-=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
    }
       return {
              loop:loop 
       }
}());

/**
 * Cracks the windshield and shakes game screen when death occurs
 * */
var PlayerDead = (function(){
    
    'use strict';
    
    var first = true,
        i,
        maxcracks,
        cracks = [],
        sides = [
            ['X',0],[W,'X'],['X',H],[0,'X'] 
        ],
        startdirs = [0,90,180,270],
        loopcount = 0,
        loopmax = 300;
    
    var init = function() {
        if(first) {
            i = $w.canvas.init(document.getElementById('death'));
            first = false;
            loopcount = 0;
        }
        cracks = [];
        maxcracks = 4;
        for(let j=0; j<maxcracks; j++) {
            let s = Math.floor(Math.random() * 4);
            if (sides[s][0] == 'X') sides[s][0] = (W / 4) + Math.random() * (W/4);
            if (sides[s][1] == 'X') sides[s][1] = (H / 4) + Math.random() * (H/4);
            cracks.push({
                x:sides[s][0],
                y:sides[s][1],
                dir:j
            });
        }
        //console.log(cracks);
    }
    /**
     * this is the loop
     * @returns {Void}
     * */
    var loop = function() {
        // if we somehow get here and things haven't been initiated. do that now
        if(first) init();
        
        // shake the screen
        document.getElementById('game').style.left = ((Math.random() * 10) - 5)+'px';
        document.getElementById('game').style.top = ((Math.random() * 10) - 5)+'px';
        
        // get the current number of cracks
        let l = cracks.length;
        // loop the cracks
        for(let j=0; j<l; j++) {;
            // init a local x,y to hold before we add the new coord
            let x = cracks[j].x;
            let y = cracks[j].y;
            // set a random whole number +/- 15 degrees
            cracks[j].dir += Math.floor(Math.random() * 30) - 15;
            // make sure we are inside a 360 degree coord system
            if (cracks[j].dir > 360)cracks[j].dir -= 360;
            if (cracks[j].dir < 0)cracks[j].dir += 360;
            
            // move x,y to the new location and add the result to a temporary variable
            let tmp = $w.motion.motion_set(cracks[j].x,cracks[j].y,cracks[j].dir,(300 + Math.random() * 300));
            cracks[j].x = tmp[0];
            cracks[j].y = tmp[1];
            
            // logging for development purposes
            Devlog.log('crack X',x);
            Devlog.log('crack Y',y);
            Devlog.log('crack dir',cracks[j].dir);
            
            // draw the line
            $w.canvas.line(i,x,y,cracks[j].x,cracks[j].y,GREEN);
            
            /***
             *
             *  this was the problem. I started at 600 aaaannnd...that was too low LOL
             *
             *  */
            if ((Math.random() * 1000) > 995) { // roll the dice. if it hits > 99.5%
                // add a new crack
                cracks.push({
                    x:x,
                    y:y,
                    dir:cracks[j].dir
                });
            }
        }
        // increment the loop count
        loopcount++;
        // if at the loop maximum
        if (loopcount >= loopmax) {
            // reset everything and set player is alive
            reset();
            Player.setAlive(); // the player will check if it's out of chnaces and end the game if neccessary
        }
    }
    var reset = function() {
        loopcount = 0;
        $w.canvas.clear(i);
        document.getElementById('game').style.left = '0px';
        document.getElementById('game').style.top = '0px';
    }
    return {
        init:init,
        loop:loop 
    }
}());
