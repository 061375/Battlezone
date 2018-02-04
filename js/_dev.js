var Dev = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.r = o.r;
    this.color = GREEN
}
Dev.prototype.loop = function() {
    $w.canvas.circle(this.i,this.x,this.y,this.r,this.color,0.5);
    //$w.canvas.clear(this.i);
}

var Devlog = (function(){
    
    'use strict';
    
    var devlog = {};
    
    var init = function() {
        setInterval(function(){
            loop();
        },100);
    }
    var log = function(a,b) {
        devlog[a] = b;    
    }
    var loop = function() {
        var out = '';
        for(let a in devlog) {
            if (devlog.hasOwnProperty(a)) {
                out += a + ' : ' + devlog[a] + "\n";
            }
        }
        document.getElementById('dev-window').innerHTML = out;
    }
    return {
        init:init,
        log:log,
        loop:loop
    }
}());

if(DEVMODE) Devlog.init();