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
       if (!RENDERGAME) {
              $w.canvas.clear(this.i);
              return;
       }
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
       
       //this.drawLines(this.i,$w.threed.Transform3DPointsTo2DPoints(model.pointsArray,vaxis,this.focalLength, z),model.facesArray,dx,dy,color,lineWidth);
       this.drawLines(this.i,this.Transform3DPointsTo2DPoints(model.pointsArray,vaxis,this.focalLength, z),model.facesArray,dx,dy,color,lineWidth); 
   }
   Camera.prototype.Transform3DPointsTo2DPoints = function(points, axisRotations, focalLength, zOrigin){
        
        if (undefined === zOrigin) zOrigin = 1;
        
        // the array to hold transformed 2D points - the 3D points
        // from the point array which are here rotated and scaled
        // to generate a point as it would appear on the screen
        var TransformedPointsArray = [];
        // Math calcs for angles - sin and cos for each (trig)
        // this will be the only time sin or cos is used for the
        // entire portion of calculating all rotations
        var sx = Math.sin(axisRotations.x);
        var cx = Math.cos(axisRotations.x);
        var sy = Math.sin(axisRotations.y);
        var cy = Math.cos(axisRotations.y);
        var sz = Math.sin(axisRotations.z) * zOrigin;
        var cz = Math.cos(axisRotations.z) * zOrigin;
        
        // a couple of letiables to be used in the looping
        // of all the points in the transform process
        var x,y,z, xy,xz, yx,yz, zx,zy, scaleFactor;
    
        // 3... 2... 1... loop!
        // loop through all the points in your object/scene/space
        // whatever - those points passed - so each is transformed
        var i = points.length;
        while (i--){
            // apply Math to making transformations
            // based on rotations
            
            // assign letiables for the current x, y and z
            var x = points[i].x;
            var y = points[i].y;
            var z = points[i].z;
    
            // perform the rotations around each axis
            // rotation around x
            var xy = cx*y - sx*z;
            var xz = sx*y + cx*z;
            // rotation around y
            var yz = cy*xz - sy*x;
            var yx = sy*xz + cy*x;
            // rotation around z
            var zx = cz*yx - sz*xy;
            var zy = sz*yx + cz*xy;
            
            // now determine perspective scaling factor
            // yz was the last calculated z value so its the
            // final value for z depth
            var scaleRatio = focalLength/(focalLength + yz);
            // assign the new x, y and z (the last z calculated)
            x = zx*scaleRatio;
            y = zy*scaleRatio;
            z = yz;
            // create transformed 2D point with the calculated values
            // adding it to the array holding all 2D points
            TransformedPointsArray[i] = $w.threed.make2DPoint(x, y, -z, scaleRatio);
        }
        // after looping return the array of points as they
        // exist after the rotation and scaling
        return TransformedPointsArray;
    }
   Camera.prototype.loop = function() {
       if (!RENDERGAME) {
              $w.canvas.clear(this.i);
              return;
       }
       if (DEVMODE) {
              if($w.objects.Dev[0] != null) {
              
                     $w.objects.Dev[0].x = this.view.x;
                     $w.objects.Dev[0].y = this.view.y;
                     $w.objects.Dev[0].r = (this.focalLength/2);
                     $w.objects.Dev[0].color = RED;
                     $w.objects.Dev[1].x = Player.getX();
                     $w.objects.Dev[1].y = Player.getY();
                     $w.objects.Dev[1].r = 5;
                     $w.objects.Dev[1].color = GREEN;
              }
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
