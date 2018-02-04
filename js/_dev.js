var Dev = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.r = o.r;
    this.mode = o.mode;
    this.polya = o.polya;
    this.color = GREEN;
}
Dev.prototype.loop = function() {
    switch(this.mode) {
        case 'poly':
            this.poly();
            break;
        default:
            this.circle();
    }
}
Dev.prototype.circle = function() {
    $w.canvas.circle(this.i,this.x,this.y,this.r,this.color,0.5);
}
Dev.prototype.poly = function() {
    $w.canvas.polygon(this.i,this.polya,this.color,'fill',this.color,0.5);
}

/**
 * if DEVMODE this logs various variables to the screen
 * */
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