var Bullet = function(o) {

    this.p = o.p;
    
    this.i = o.i;
    this.j = o.z;

    this.model = window['tetraModel'];
    
    this.size = 5;
    this.x = o.x;
    this.y = o.y;
    this.z = o.zz;
    this.dir = o.d;
    this.speed = 5;
    this.axis = $w.threed.makeA3DPoint(80,(this.dir-90) / 58,0);
    this.camera = $w.objects.Camera[0];
    
    $w.assets.audio.shoot.play();
}
Bullet.prototype.loop = function() {
    
    this.x+=Math.sin($w.math.radians(this.dir))*this.speed;
    this.y+=Math.cos($w.math.radians(this.dir))*this.speed;
    
    if(!insidegame(this.x,this.y)){
        this.checkCollision();
    }else{
        this.destroy();
    }
    
    // check if the camera can see me
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,3,GREEN,1);
    }
}
Bullet.prototype.checkCollision = function() {
    let effected = ['Player','Tank','Tetra','Cube'],
        l = 4;
    for(let i=0; i<l; i++) {
        if (undefined !== $w.objects[effected[i]]) {
            let ol = $w.objects[effected[i]].length;
            for(let j=0; j<ol; j++) {
                if($w.objects[effected[i]][j] != null) {
                    if (!$w.collision.checkCircle($w.objects[effected[i]][j].x,$w.objects[effected[i]][j].y,$w.objects[effected[i]][j].size,this.x,this.y,this.size)) {
                        if (effected[i] == 'Tank') {
                            $w.objects[effected[i]][j].destroy();
                        }
                        this.destroy();
                    }
                }
            }
        }
    }
}
Bullet.prototype.destroy = function() {
    this.p.setCanFire(true);
    $w.kill_player('Bullet',this.j);
}