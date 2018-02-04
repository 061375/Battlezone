var Player = (function(){
    
    'use strict';
    
    var d,x,y,events = [];
    
    var init = function() {
       d = 180;
       x = (W/2);
       y = (H/2);

       document.addEventListener("keydown",function(evt){
              if(events.indexOf(evt.key) == -1)events.push(evt.key);       
       });
       document.addEventListener("keyup",function(evt){
              var l = events.length;
              for(let i=0; i<l; i++) {
                     if (events[i] == evt.key) {
                            events.splice(i,1);
                     }
              }
       });
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
       o.x+=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y+=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
   }
   /**
    * Adown
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var ArrowDown = function(o) {
       o.x-=Math.sin($w.math.radians(o.d))*TANKSPEED;
       o.y-=Math.cos($w.math.radians(o.d))*TANKSPEED;
       return o;
   }
   /**
    * Aa
    * @param {Object} event
    * @param {Object} this
    * @returns {Void}
    * */
   var a = function(o) {
       console.log('SHOOT !!!');
       return o;
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
   
   return {
        init:init,
        loop:loop,
        ArrowLeft:ArrowLeft,
        ArrowRight:ArrowRight,
        ArrowUp:ArrowUp,
        ArrowDown:ArrowDown,
        a:a,
        getX:getX,
        getY:getY,
        getD:getD
    }
}());