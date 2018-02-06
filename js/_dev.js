var Dev = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.r = o.r;
    this.j = o.z;
    this.d = null;
    this.mode = o.mode;
    this.polya = o.polya;
    this.color = GREEN;
}
/**
 * the loop
 * @returns {Void}
 * */
Dev.prototype.loop = function() {
    switch(this.mode) {
        case 'poly':
            this.poly();
            break;
        default:
            this.circle();
    }
}
/**
 * displays a circle on the stage
 * @returns {Void}
 * */
Dev.prototype.circle = function() {
    $w.canvas.circle(this.i,this.x,this.y,this.r,this.color,0.5);
}
/**
 * displays a polygon on the stage
 * @returns {Void}
 * */
Dev.prototype.poly = function() {
    // loop the polygon and calculate the points
    let l = this.polya.length;
    for(let i=0; i<l; i++) {
        this.polya[i] = this.calcPoint(this.x,this.polya[i][0],this.y,this.polya[i][1],this.d,20,i);
    }
    // draw the polygon
    $w.canvas.polygon(this.i,this.polya,this.color);
    
}
/**
* calcPoint
* @param {Number} 
* @param {Number}
* @param {Number}
* @returns {Array} [x,y]
* */
Dev.prototype.calcPoint = function(x,x2,y,y2,d,r,i){
    
    let a = $w.math.degrees(Math.atan2((y - (y + y2)),(x - (x + x2))));
    let a2 = (a - d);

    Devlog.log('a'+i,a);
    Devlog.log('a2'+i,a2);
    
    a+=a2;
    a = $w.math.radians(a2);

    x += Math.cos(a)*r;
    y += Math.sin(a)*r;
    
    return [x,y];
}
Dev.prototype.destroy = function() {
    $w.kill_player('Dev',this.j);
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