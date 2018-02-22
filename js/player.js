var Player = (function(){
    
    'use strict';
    
    var d,x,y,events = [],canfire = true, code = {};
    
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
       for(let i=0; i<l; i++) {
              if (typeof Player[events[i]] === 'function') 
                     o = Player[events[i]](o);
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
       l = $w.objects.Tank.length;
       for(let t=0; t<l;t++) {
            if ($w.objects.Tank[t] != null) {
                if (lookingat(d,500,5,x,y,$w.objects.Tank[t].x,$w.objects.Tank[t].y)) {
                    hastarget = true;
                }
            }
       }
       if (hastarget) {
            Devlog.log('I SEE YOU');
            GUI.set_hastarget(true);
       }else{
            GUI.set_hastarget(false);
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
                         p:this
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
   
   var getX = function() {
       return x;
   }
   var getY = function() {
       return y;
   }
   var getD = function() {
       return d;
   }
   
   // Setters
   
   var setCanFire = function(b) {
       canfire = b;
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
        setCanFire:setCanFire
    }
}());