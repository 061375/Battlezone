/**
 *
 * */
var Tank = function(o) {
    this.i = o.i;
    this.model = tankModel;
    this.size = 5;
    //this.x = Math.random() * W;
    //this.y = Math.random() * H;
    this.x = o.x;
    this.y = o.y;
    this.z = 30;
    this.axis = $w.threed.makeA3DPoint(0,0,0);
    this.camera = $w.objects.Camera[0];
    
}
Tank.prototype.loop = function() {
    if (DEVMODE) {
              $w.objects.Dev[3].x = this.x;
              $w.objects.Dev[3].y = this.y;
              $w.objects.Dev[3].r = this.size;
    }
    this.axis.y += (TANKTURNSPEED/1000);

    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,10,GREEN,1);
    }
}