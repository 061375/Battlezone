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