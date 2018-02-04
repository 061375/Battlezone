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
    
    this.playerdir = null;
    
    this.camera = $w.objects.Camera[0];
    this.view = {
        x:null,
        y:null,
        size:400
    }
}
Tank.prototype.loop = function() {
    //this.dir+=this.turnspeed;
    
    if (DEVMODE) {
        $w.objects.Dev[2].x = this.x;
        $w.objects.Dev[2].y = this.y;
        $w.objects.Dev[2].r = this.size;
        $w.objects.Dev[3].x = this.view.x;
        $w.objects.Dev[3].y = this.view.y;
        $w.objects.Dev[3].r = this.view.size;
    }
    
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

    if (this.dir > 360) this.dir -= 360;
    if (this.dir < 0) this.dir += 360;
    let xy = stayinsidegame(this.i,this.x,this.y);
    this.x = xy.x;
    this.y = xy.y;
    
    this.axis.y = (this.dir-180) / 58;

    this.viewPosition();
    
    if (!$w.collision.checkCircle(this.view.x,this.view.y,this.view.size,Player.getX(),Player.getY(),5)) {
        this.playerdir = $w.motion.point_direction(this.x,this.y,Player.getX(),Player.getY(),false,-90);
    }
    if (!$w.collision.checkCircle(this.camera.view.x,this.camera.view.y,(this.camera.focalLength/2),this.x,this.y,this.size)) {
        this.camera.draw(this.model,this.x,this.y,this.z,this.axis,10,GREEN,1);
    }
}
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
Tank.prototype.patrolrotate = function(dir) {
    if(dir) {
         this.dir += this.turnspeed;
    }else{
         this.dir -= this.turnspeed;
    }
}
Tank.prototype.evade = function(targetAngle) {
    let move = Math.random() * 1000;
    if (move > 500) {
        move = true;
    }else{
        move = false;
    }
    this.chase(targetAngle,move,true);
}
Tank.prototype.chase = function(targetAngle,move,evade) {
    if (undefined === move) move = false;
    if (undefined === evade) evade = false;
    var dir = this.dir;
    if(!evade)targetAngle = -targetAngle;
    Devlog.log('dir',dir);
    Devlog.log('targetAngle',targetAngle);
    var adiff = dir - targetAngle;
    if (Math.abs(adiff) > 180) {
        if (this.dir > targetAngle) {
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
    if(move)this.move();
}
Tank.prototype.shoot = function() {
    
}
Tank.prototype.obstacle = function() {
    
}
Tank.prototype.die = function() {
    
}
Tank.prototype.move = function() {
    this.x+=Math.sin($w.math.radians(this.dir))*this.speed;
    this.y+=Math.cos($w.math.radians(this.dir))*this.speed;  
}
Tank.prototype.patrolmodeset = function() {
    this.actioncounter++;
    if (this.actioncounter > this.actiontarget) {
        this.actioncounter = 0;
        if (this.playerdir != null) {
            this.actiontarget = 1000+Math.random() * 1000;
            let a = Math.random() * 1000;
            if (a < 500) {
                this.mode = 'lookchase';
                Devlog.log('patrolmodeset','LOOK CHASE');
            }
            if (a >= 500 && a < 800) {
                this.mode = 'chase';
                Devlog.log('patrolmodeset','CHASE');
            }
            if (a >= 800) {
                this.mode = 'evade';
                Devlog.log('patrolmodeset','EVADE');
            }
        }else{
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
        this.playerdir = null;
    }
}
Tank.prototype.viewPosition = function() {
    let a = $w.math.radians(this.dir);
        this.view.x = this.x + Math.sin(a)*(this.view.size+5);
        this.view.y = this.y + Math.cos(a)*(this.view.size+5);
}