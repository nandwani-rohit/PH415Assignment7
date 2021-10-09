//radius of the circular table = R
let R;
let N;
let pellets = [];
let epsilon;
let v_default;
let r_default;
let c_default;

function setup()
{
  createCanvas(400, 400);
  epsilon = 1;
  R = width*0.48;
  N = 20;
  v_default = 5;
  r_default = 10;
  c_default = color(130);
  
  translate(width/2, height/2);
  scale(1, -1);

  for (let i = 0; i < N; ++i)
  {
    pellets[i] = Pellet.default();
  }
  
  pellets[3].mark();
  
  background(50);
}

function draw()
{
  if (frameCount % 1 == 0)
  {
    background(50);
    translate(width/2, height/2);
    scale(1, -1);

    stroke(0);
    fill(255);
    ellipseMode(RADIUS);
    ellipse(0, 0, R);

    for (let i = 0; i < pellets.length; ++i)
    {
      pellets[i].drawPellet();
      //println(i,pellets[i].position);

      for (let j = i+1; j < pellets.length; ++j)
      {
        pellets[i].checkCollision(pellets[j]);
      }

      //println(i,pellets[i].position);

      pellets[i].update();
    }
  }
}

class Pellet
{
  // position = (x,y)
  // velocity = (v_x,v_y)
  // radius = r
  // color = c

  //Constructor Method
  constructor(position, velocity, radius, c)
  {
    this.c = c;
    this.r = radius;
    this.position = position;
    this.velocity = velocity;
  }

  // constructor with no arguments......
  // position = random on x-axis
  // velocity = random using v_default
  // radius = r_default
  // color = c_default
  static default()
  {
    let position = createVector(random(-R + 3*r_default, R - 3*r_default), 0);
    let velocity = createVector(random(-v_default,v_default), random(-v_default,v_default));
    return new Pellet(position, velocity, r_default, c_default);
  }

  // pass just the position arguments
  static withPosition(position_x, position_y)
  {
    let position = createVector(position_x, position_y);
    let velocity = createVector(random(-v_default,v_default), random(-v_default,v_default));
    return new Pellet(position, velocity, r_default, c_default);
  }


  drawPellet()
  {
    noStroke();
    fill(this.c);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r);
  }

  update()
  {
    this.position.add(this.velocity);

    if (this.position.mag() >= R - this.r)
    {
      // normal n = position/|position| 
      // change = 2(v.n) n
      let change = this.position.copy();
      change.mult(2 * this.velocity.dot(this.position) / this.position.magSq());

      // v = u - change
      this.velocity.sub(change);
      
      this.position.setMag(R - this.r - epsilon);
    }
  }

  // checks if this pellet is colliding with the other pellet
  checkCollision(other)
  {
    if (p5.Vector.dist(this.position, other.position) <= (this.r + other.r))
    {
      // collision alert!

      // n = (r2 - r1)
      let normal = other.position.copy();
      normal.sub(this.position);

      // relative velocity of other pellet w.r.t this pellet
      // ------         v21 = v2 - v1      ------------      
      let relativeVelocity = other.velocity.copy();
      relativeVelocity.sub(this.velocity);

      // change = (v21.n)/|n|^2 n
      let change = normal.copy();
      change.mult(relativeVelocity.dot(normal)/normal.magSq());

      // v1 = v1 + change
      this.velocity.add(change);

      // v2 = v2 - change
      other.velocity.sub(change);
      
      // change = n/|n| (R1+R2-n+2*epsilon)/2 
      change = normal.copy();
      change.setMag((this.r + other.r - normal.mag())/2 + epsilon);
      
      // r1 = r1 - change
      this.position.sub(change);
      
      // r2 = r2 + change
      other.position.add(change);
    }
  }
  
  mark()
  {
    this.c = color('#FF0000');
  }
    
}
