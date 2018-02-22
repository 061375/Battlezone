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
    this.speed = 3;
    this.axis = $w.threed.makeA3DPoint(80,(this.dir-90) / 58,0);
    this.camera = $w.objects.Camera[0];
    
    // @param {Array} objects (other than player) effected by bullets
    this.effected = ['Tank','Tetra','Cube'];
    if (o.istank) {
        this.effected.splice(0,1);
    }
    this.isplayer = o.isplayer;
    if (SOUNDON) $w.assets.audio.shoot.play();
}
/**
 * */
Bullet.prototype.loop = function() {
    
    this.x+=Math.sin($w.math.radians(this.dir))*this.speed;
    this.y+=Math.cos($w.math.radians(this.dir))*this.speed;
    
    if(!insidegame(this.x,this.y)){
        this.checkCollision();
    }else{
        this.destroy(false);
    }
    
    // check if the camera can see me
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,3,GREEN,1);
    }
}
/**
 * */
Bullet.prototype.checkCollision = function() {
    if (!$w.collision.checkCircle(Player.getX(),Player.getY(),Player.getSize(),this.x,this.y,this.size) && !this.isplayer) {
        console.log('PLAYER HIT!!!!');
        this.destroy();
    }else{
        let l = 4;
        for(let i=0; i<l; i++) {
            if (undefined !== $w.objects[this.effected[i]]) {
                let ol = $w.objects[this.effected[i]].length;
                for(let j=0; j<ol; j++) {
                    if($w.objects[this.effected[i]][j] != null) {
                        if (!$w.collision.checkCircle($w.objects[this.effected[i]][j].x,$w.objects[this.effected[i]][j].y,$w.objects[this.effected[i]][j].size,this.x,this.y,this.size)) {
                            if (this.effected[i] == 'Tank') {
                                $w.objects[this.effected[i]][j].destroy();
                            }
                            this.destroy();
                        }
                    }
                }
            }
        }
    }
}
/**
 * destroy the bullet
 * @param {Boolean}
 * */
Bullet.prototype.destroy = function(boom) {
    // boom is false then don't make a sound ... a total miss of anything
    if (undefined === boom || boom) {
        if (SOUNDON) $w.assets.audio.boom2.play();
    }
    this.p.setCanFire(true);
    $w.kill_player('Bullet',this.j);
}