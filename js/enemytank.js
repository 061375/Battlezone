/**
 * Enemy Tank
 * */
var Tank = function(o) {
    this.i = o.i;
    this.j = o.z;
    this.model = tankModel;
    this.size = 15;

    this.x = o.x;
    this.y = o.y;
    this.z = 30;
    this.dir = Math.floor(Math.random() * 360);
    this.dir = 45;
    this.axis = $w.threed.makeA3DPoint(0,0,0);
    
    this.targetdir = 0;
    this.actioncounter = 0;
    this.actiontarget = 0;
    this.turncounter = 0;
    this.turntarget = 0;
    this.turnspeed = TANKTURNSPEED;
    this.speed = TANKSPEED;
    this.canfire = true;
    
    this.playerdir = null;
    
    this.camera = $w.objects.Camera[0];
    this.view = {
        x:null,
        y:null,
        size:400
    }
    // place the tank in the game
    // turn off to use the setting from the init
    this.put();
    
    if (SOUNDON)$w.assets.audio.alert.play();
    
}
/**
 * the loop
 * @returns {Void}
 * */
Tank.prototype.loop = function() {
    

    if (DEVMODE) {
        $w.objects.Dev[2].x = this.x;
        $w.objects.Dev[2].y = this.y;
        $w.objects.Dev[2].r = this.size;
        $w.objects.Dev[2].d = this.dir;
        $w.objects.Dev[2].polya = [[-5,-5],[5,-5],[5,10],[-5,10]];
        $w.objects.Dev[2].mode = 'poly';
        $w.objects.Dev[3].x = this.view.x;
        $w.objects.Dev[3].y = this.view.y;
        $w.objects.Dev[3].r = this.view.size;
    }
    
    // what are we doing
    
    this.patrolmodeset();
    switch(this.mode) {
        case 'patrol':
            this.patrol();
            break;
        case 'patrolrotate':
            this.patrolrotate(this.patroldir);
            break;
        case 'chase':
            this.chase(this.playerdir,true);
            break;
        case 'lookchase':
            this.chase(this.playerdir,false);
            break;
        case 'evade':
            this.evade(this.playerdir);
            break;
    }
    
    // make sure the direction is within the cartesian grid
    if (this.dir > 360) this.dir -= 360;
    if (this.dir < 0) this.dir += 360;
    
    // make sure the tank is in the game
    let xy = stayinsidegame(this.i,this.x,this.y);
    this.x = xy.x;
    this.y = xy.y;
    
    // handle the model direction rendering quirk
    // @todo - WTF
    this.axis.y = (this.dir-180) / 58;
    
    // set where the tanks eyes are
    this.viewPosition();
    
    // check if the tank can see the player
    if (!$w.collision.checkCircle(this.view.x,this.view.y,this.view.size,Player.getX(),Player.getY(),5)) {
        this.playerdir = $w.motion.point_direction(this.x,this.y,Player.getX(),Player.getY(),false,-90);
    }
    // check if the camera can see me
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,10,GREEN,1);
    }
    if (GAMEOVER) {
        this.destroy(true);
    }
}
/**
 * wander around looking for the player
 * @returns {Void}
 * */
Tank.prototype.patrol = function() {
    this.turncounter++;
    if (this.turncounter > this.turntarget) {
        this.turncounter = 0;
        this.turntarget = 200+Math.random() * 200;
        this.targetdir = Math.floor(Math.random() * 360);
    }
    if (this.dir < this.targetdir) {
        this.dir+=this.turnspeed;
    }else{
        this.dir-=this.turnspeed;
    }
    this.move();
}
/**
 * just rotate until it sees the player
 * @returns {Void}
 * */
Tank.prototype.patrolrotate = function(dir) {
    if(dir) {
         this.dir += this.turnspeed;
    }else{
         this.dir -= this.turnspeed;
    }
}
/**
 * evade the player
 * @todo - there is much to be done here to make this more difficult for the player
 * @returns {Void}
 * */
Tank.prototype.evade = function(targetAngle) {
    // evading might include simply turning away from the enemy
    let move = Math.random() * 1000;
    if (move > 500) {
        move = true;
    }else{
        move = false;
    }
    this.chase(targetAngle,move,true);
}
/**
 * logic to track the player
 * @param {Number}
 * @param {Boolean}
 * @param {Boolean}
 * @returns {Void}
 * */
Tank.prototype.chase = function(targetAngle,move,evade) {
    
    if (undefined === move) move = false;
    if (undefined === evade) evade = false;
    
    var dir = this.dir;
    
    // run away!!!
    if(!evade)targetAngle = -targetAngle;
    
    Devlog.log('dir',dir);
    Devlog.log('targetAngle',targetAngle);
    
    var adiff = dir - targetAngle;
    if (Math.abs(adiff) > 180) {
        if (dir > targetAngle) {
            adiff = -1 * ((360 - dir) + targetAngle);
        }else{
            adiff = (360 - targetAngle) + dir;
        }
    }
    // Gradually rotate object
    var leastAccurateAim = 2;
    if(adiff > leastAccurateAim * 0.5)
    {
        this.dir -= this.turnspeed;
    }
    else if(adiff < leastAccurateAim * 0.5)
    {
        this.dir += this.turnspeed;
    }
    //
    if(move)this.move();
}
/**
 * logic to shoot 
 * @todo
 * @returns {Void}
 * */
Tank.prototype.shoot = function() {
    if (this.canfire && Player.getAlive()) {
        this.canfire = false;
        $w.add_object_single(
               1,
               Bullet,{
                   x:this.x,
                   y:this.y,
                   zz:0,
                   d:this.dir,
                   p:this,
                   istank:true
               },
               2,
               W,H
        );
        console.log('TANK SHOOT !!!');
    }   
}
/**
 * logic to get around an obstacle
 * @todo 
 * @returns {Void}
 * */
Tank.prototype.obstacle = function() {
    
}
/**
 * death even
 * @todo 
 * @returns {Void}
 * */
Tank.prototype.destroy = function(passive) {
    if (passive) {
    }else{
        console.log('BOOM!!!!!');
        
        $w.add_object_single(
            10,
            TankExplosion,{
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
        tankisdead(this.i);
    }
    $w.kill_player('Tank',this.j);
}
/**
 * move the tank
 * @todo - add reverse
 * @returns {Void}
 * */
Tank.prototype.move = function() {
    this.x+=Math.sin($w.math.radians(this.dir))*this.speed;
    this.y+=Math.cos($w.math.radians(this.dir))*this.speed;  
}
/**
 * the logic that determines the tanks actions
 * @returns {Void}
 * */
Tank.prototype.patrolmodeset = function() {
    // increment a counter to decide when to chnage actions
    this.actioncounter++;
    if (this.actioncounter > this.actiontarget) {
        // reset
        this.actioncounter = 0;
        // if the tank can see the player then attack or evade
        if (this.playerdir != null) {
            this.actiontarget = 1000+Math.random() * 1000;
            let a = Math.random() * 1000;
            if (a < 800) {
                this.mode = 'lookchase';
                Devlog.log('patrolmodeset','LOOK CHASE');
            }
            if (a >= 800 && a < 900) {
                this.mode = 'chase';
                Devlog.log('patrolmodeset','CHASE');
            }
            if (a >= 900) {
                this.mode = 'evade';
                Devlog.log('patrolmodeset','EVADE');
            }
        }else{
            // if the tank cannot see player then patrol
            
            Devlog.log('patrolmodeset','PATROL');
            
            this.actiontarget = 200+Math.random() * 300;
            this.mode = 'patrol';
            if ((Math.random() * 1000) > 300) {
                this.mode = 'patrolrotate';
                Devlog.log('patrolmodeset','PATROL ROTATE');
            }
            this.patroldir = true;
            if ((Math.random() * 1000) > 500)this.patroldir = false;
        }
        // when an action chnages assume the tank cannot see the player until it can
        this.playerdir = null;
    }
    
    if (lookingat(this.dir,this.view.size*2,4,this.x,this.y,Player.getX(),Player.getY())) {
        Devlog.log('tankhasashot','true');       
        if (Math.random() * 1000 > 900) {
            this.shoot();
        }
    }else{
        Devlog.log('tankhasashot','false');  
    }
}
/**
 * the tank has a simple collision bubble as its eyes
 * @returns {Void}
 * */
Tank.prototype.viewPosition = function() {
    let a = $w.math.radians(this.dir);
        this.view.x = this.x + Math.sin(a)*(this.view.size+5);
        this.view.y = this.y + Math.cos(a)*(this.view.size+5);
}
/**
 * place the enemy tank in a random spot (somewhere within visual range)
 * however NOT necessarily looking at the player and NOT on TOP of the player
 * @returns {Void}
 * */
Tank.prototype.put = function() {
    let x = Player.getX();
    let y = Player.getY();
    let d = Math.random() * 360;
    let p = 250 + Math.random() * this.view.size;
    this.dir = Math.random() * 360;
    this.x = x + Math.sin($w.math.radians(d)) * p;
    this.y = y + Math.cos($w.math.radians(d)) * p;  
}
Tank.prototype.setCanFire  = function(b) {
    this.canfire = true;
}



// --------------------------------------   BEGIN TANK EXPLOSION -------------------

var TankExplosion = function(o) {

    this.i = o.i;
    this.j = o.z;

    this.model = window['texplode'+Math.floor(1 + Math.random() * 6) + 'Model'];
    
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
    
    this.size = 5;
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
TankExplosion.prototype.loop = function() {
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
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,10,GREEN,1);
    }
}
TankExplosion.prototype.destroy = function() {
    $w.kill_player('TankExplosion',this.j);
}