/**
* Camera
* 
* @param {Object}
* @returns {Void}
* */
var Camera = function(o){
       this.i = o.i,
       this.focalLength = FOCALLENGTH,
       this.x = Player.getX(),
       this.y = Player.getY(),
       this.z = 0,
       this.d = Player.getD();
       this.view = {
              x:null,
              y:null
       }
       this.viewPosition();
   }
   /**
    * draw
    * @param {Object} A 3D model points, faces
    * @param {Number} where the model will be drawn X
    * @param {Number} where the model will be drawn Y
    * @param {Number} where the model will be drawn Z 
    * @param {Object} orientation of the model x,y,z
    * @param {String} color
    * @param {Number} line weight
    * @param {Number} this allows models to be forced to be redered a specific distance from the camera always
    * 
    * @returns {Void}
    * */
   Camera.prototype.draw = function(model,x,y,z,axis,size,color,lineWidth,forceDis) {
       var dis;
       if(undefined === forceDis) {
              dis = $w.motion.distance_to_point(x,y,this.x,this.y);
       }else{
              dis = forceDis;
       }
       let cr = $w.math.radians(this.d),
           dx = x - this.x,
           dz = y - this.y,
           dy = hH+z+20,
           angle = Math.atan2(dz,dx),
           radius = (Math.sqrt(dx*dx+dz*dz) * 5),
           scaleRatio = this.focalLength/(this.focalLength+(dis*6)),
           vaxis = new Object();
              vaxis.x = axis.x;
              vaxis.y = axis.y;
              vaxis.z = axis.z;
       dx = Math.cos(angle+cr) * radius;
       dx = dx * scaleRatio;

       if(undefined === forceDis) {
              vaxis.y += angle;
       }
       z = scaleRatio * size;
       
       this.drawLines(this.i,$w.threed.Transform3DPointsTo2DPoints(model.pointsArray,vaxis,this.focalLength, z),model.facesArray,dx,dy,color,lineWidth); 
   }
   Camera.prototype.loop = function() {
       if (DEVMODE) {
              
              $w.objects.Dev[0].x = this.view.x;
              $w.objects.Dev[0].y = this.view.y;
              $w.objects.Dev[0].r = (this.focalLength/2);
              $w.objects.Dev[0].color = RED;
              $w.objects.Dev[1].x = Player.getX();
              $w.objects.Dev[1].y = Player.getY();
              $w.objects.Dev[1].r = 5;
              $w.objects.Dev[1].color = GREEN;
       }
       this.x = Player.getX();
       this.y = Player.getY();
       this.d = Player.getD();
       this.viewPosition();
       $w.canvas.clear(this.i);
   }
   Camera.prototype.calcView = function(x,y) {
       
   }
   Camera.prototype.viewPosition = function() {
       let a = $w.math.radians(-this.d + 90);
              this.view.x = this.x + Math.cos(a)*((this.focalLength/2)+25);
              this.view.y = this.y + Math.sin(a)*((this.focalLength/2)+25);  
   }
   Camera.prototype.drawLines = function(ci,screenPoints,facesArray,x,y,color,lineWidth){
        var l = facesArray.length, prev, i = 0, j = 0, fl = 0;
        for (i=0; i<l; i++){
            if (0 == fl) {
                fl = facesArray[0].length;
            }
            for(j=0; j<fl; j++){
                if (j==0) {
                    prev = facesArray[i][j];
                }else{
                    if (undefined !== screenPoints[prev] && undefined !== screenPoints[facesArray[i][j]]) {
                        $w.canvas.line(ci,
                                       screenPoints[prev].x+x+(W/2),
                                       screenPoints[prev].y+y,
                                       screenPoints[facesArray[i][j]].x+x+(W/2),
                                       screenPoints[facesArray[i][j]].y+y,
                                       color,
                                       lineWidth);
                    }
                    prev = facesArray[i][j];
                }
            }
        }
    }
