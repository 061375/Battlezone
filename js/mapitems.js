
/**
 *
 * */
var Mountains = function(o) {
    this.i = o.i;
    this.model = window['mtns'+o.m+'Model'];
    this.size = 30;
    this.x = o.x;
    this.y = o.y;
    this.z = o.zz;
    this.d = o.d;
    this.axis = $w.threed.makeA3DPoint(0,o.d,0);
    this.camera = $w.objects.Camera[0];
    
}
Mountains.prototype.loop = function() {
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,this.size,GREEN,1,1000);
    }
}

/**
 *
 * */
var Tetra = function(o) {
    this.i = o.i;
    this.model = tetraModel;
    this.size = 10;
    this.x = (-300 + (Math.random() * (W + 300)));
    this.y = (-300 + (Math.random() * (H + 300)));
    this.j = o.z+4;
    this.z = null;
    this.axis = $w.threed.makeA3DPoint(0,0,0);
    this.camera = $w.objects.Camera[0];
    
}
Tetra.prototype.loop = function() {
    if (DEVMODE) {
        $w.objects.Dev[this.j].x = this.x;
        $w.objects.Dev[this.j].y = this.y;
        $w.objects.Dev[this.j].r = this.size;
    }
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,this.size,GREEN,1);
    }
}

/**
 *
 * */
var Cube = function(o) {
    this.i = o.i;
    this.model = cubeModel;
    this.size = 10;
    this.x = (-300 + (Math.random() * (W + 300)));
    this.y = (-300 + (Math.random() * (H + 300)));
    this.j = o.z+9;
    this.z = null;
    this.axis = $w.threed.makeA3DPoint(0,0,0);
    this.camera = $w.objects.Camera[0];
    
}
Cube.prototype.loop = function() {
    if (DEVMODE) {
        $w.objects.Dev[this.j].x = this.x;
        $w.objects.Dev[this.j].y = this.y;
        $w.objects.Dev[this.j].r = this.size;
    }
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,this.size,GREEN,1);
    }
}
/**
 *
 * */
var Platform = function(o) {
    this.i = o.i;
    this.model = platformModel;
    this.size = 10;
    this.x = (-300 + (Math.random() * (W + 300)));
    this.y = (-300 + (Math.random() * (H + 300)));
    this.j = o.z+14;
    this.z = 35;
    this.axis = $w.threed.makeA3DPoint(0,0,0);
    this.camera = $w.objects.Camera[0];
    
}
Platform.prototype.loop = function() {
    if (DEVMODE) {
        $w.objects.Dev[this.j].x = this.x;
        $w.objects.Dev[this.j].y = this.y;
        $w.objects.Dev[this.j].r = this.size;
    }
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,this.size,GREEN,1);
    }
}
/**
 **/
var Horizon = (function(){
    
    'use strict';
    
    var i;
    
    var init = function() {
        i = $w.canvas.init(document.getElementById('horizon'));
    }
    var draw = function() {
        $w.canvas.line(i,0,(H/2),W,(H/2),GREEN);
    }
    var clear = function() {
        $w.canvas.clear(i);
    }
    return {
        init:init,
        draw:draw,
        clear:clear
    }
}());
