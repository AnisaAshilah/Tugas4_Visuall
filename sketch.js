let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
}

function draw() {
  background(0);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30.0;
    this.maxspeed = 2;
    this.maxforce = 0.1;
    this.wanderTheta = 0;
  }
  
  wander(){
        let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius =50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
        
    let debug = true;
    if(debug){
      push()
      fill(255,0,0)
      //line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      noStroke()
      //circle(projPoint.x, projPoint.y, 8)
      //noFill()
      //stroke(0)
      //circle(projPoint.x, projPoint.y, wanderRadius*1)
      
      //line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y)
      circle(wanderPoint.x, wanderPoint.y, 8)
      
      pop()
    }
    let steeringForce = wanderPoint.sub(this.location);
steeringForce.setMag(this.maxforece)
    this.applyForce(steeringForce)
    
    this.wanderTheta += random(-0.5, 0.5)
    
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    //face
    fill(255,255,0)
    noStroke()
    ellipse(this.l/2,this.l/2,40,40)
    
    //mouth
    fill(0)
    triangle(20,this.l/2,150,-this.l/2,this.l/2,300)
    
    //eye
    fill(0)
    ellipse(this.l/2-3,this.l/2+8.5,5,5)

    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}


