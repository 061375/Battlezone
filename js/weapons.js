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
    this.speed = 4;
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
        this.destroy(true);
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
        Player.setDead();
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
 * @param {Boolean} if true the bullet with be removed passively else it will produce a sound and animation
 * */
Bullet.prototype.destroy = function(passive) {
    // boom is false then don't make a sound ... a total miss of anything
    if (undefined === passive || !passive) {
        if (SOUNDON) $w.assets.audio.boom2.play();
        $w.add_object_single(
            10,
            BulletExplosion,{
                x:this.x,
                y:this.y,
                zz:this.z,
                d:this.dir,
                m:1,
                j:0
            },
            this.i,
            W,H
        );
    }
    this.p.setCanFire(true);
    $w.kill_player('Bullet',this.j);
}


// --------------------------------------   BEGIN BULLET EXPLOSION -------------------

var BulletExplosion = function(o) {

    this.i = o.i;
    this.j = o.z;

    this.model = cubeModel;
    
    this.explforce = 4 +  Math.random() * 3;
    this.expdir = Math.random() * 360;
    this.spinspeed = 0.01 + Math.random() * 0.2;
    this.xspeed = (Math.random() * 4) - 2;
    this.yspeed = (Math.random() * 4) - 2;
    this.gravity = 0.1;
    this.friction = 0.01;
    
    this.timer = 0;
    this.maxtime = 200;
    
    this.initexpl = true;
    
    this.size = 0.1;
    this.x = o.x;
    this.y = o.y;
    this.z = o.zz;
    this.d = o.d;
    this.axis = $w.threed.makeA3DPoint(0,o.d,0);
    this.camera = $w.objects.Camera[0];
    this.view = {
        x:null,
        y:null,
        size:400
    }
    
    if (SOUNDON)$w.assets.audio.boom.play();
}
BulletExplosion.prototype.loop = function() {
    this.z -= this.explforce;
    this.explforce -= this.gravity;
    this.axis.x += this.spinspeed;
    this.axis.y += this.spinspeed;
    this.axis.z += this.spinspeed;
    if(this.spinspeed > 0)this.spinspeed -= this.friction;
    
    this.x += this.xspeed;
    this.y += this.yspeed;
    if (this.initexpl) {
        this.initexpl = false;
    }else{
        if (this.z > 20) {
            this.explforce = Math.abs(this.explforce) / 2;
        }
    }
    this.timer++;
    if (this.timer >= this.maxtime) {
        this.timer = 0;
        this.destroy();    
    }
    // check if the camera can see me
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,this.size,GREEN,1);
    }
}
BulletExplosion.prototype.destroy = function() {
    $w.kill_player('BulletExplosion',this.j);
}