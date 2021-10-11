//radius of the circular table = R
let R;
let N;
let pellets = [];
let epsilon;
let v_default;
let r_default;
let c_default;
let origin_x;
let origin_y;
let started;
let paused;
let onceCreated;
let marked;
let start_button;
let pause_button;
let end_button;
let t1, t2, t3, t4, t5, t6, t7;
let r_input;
let N_input;
let mark_input;
let display_p, display_v;

function setup() 
{
  let canva = createCanvas(windowWidth, windowHeight);
  canva.style('display', 'block');
  epsilon = 1;

  if (width > height)
  {
    R = min(width * .4, height * .45) * .9;
    origin_x = .4 * width;
    origin_y = .55 * height;
  }
  else 
  {
    R = min(width * .5, height * .35) * .9;
    origin_x = width * .5;
    origin_y = height * .65;
  }

  createStuff();

  if (!(isNaN(int(N_input.value())) || int(N_input.value()) <= 0))
  {
    N = int(N_input.value());
  }

  if (!(isNaN(float(r_input.value())) || float(r_input.value()) < 0.1))
  {
    r_default = 10 * r_input.value() * R / 288;
  }

  if (!(isNaN(float(v_input.value())) || float(v_input.value()) <= 0))
  {
    v_default = 5 * v_input.value() * R / 288;
  }



  pellets = [];
  c_default = color(130);

  translate(origin_x, origin_y);

  scale(1, -1);

  for (let i = 0; i < N; ++i) 
  {
    pellets[i] = Pellet.default();
  }

  if (!(isNaN(int(mark_input.value())) || int(mark_input.value()) < 1 || int(mark_input.value()) > N))
  {
    marked = int(mark_input.value()) - 1;
  }

  pellets[marked].mark();

  background(50);

  started = false;
  paused = false;
  // noLoop();
}

function createStuff()
{

  if (onceCreated == undefined)
  {
    start_button = createButton('✔️ START');
    start_button.mousePressed(start);
    start_button.position(width*.67, height*.62);

    pause_button = createButton('▶️⏸️ PAUSE');
    pause_button.mousePressed(pause);
    pause_button.position(width*.75, height*.62);

    end_button = createButton('🔴 END');
    end_button.mousePressed(end);
    end_button.position(width*.84, height*.62);

    N_input = createInput('50');
    N_input.position(width*.8, height*.273);
    N_input.size(30);

    mark_input = createInput('1');
    mark_input.position(width*.77, height*.503);
    mark_input.size(30);

    r_input = createInput('1');
    r_input.position(width*.87, height*.323);
    r_input.size(30);

    v_input = createInput('1');
    v_input.position(width*.77, height*.413);
    v_input.size(30);

    t1 = createP('Choose the parameters for simulation :');
    t1.position(width*.65, height*.16);
    t1.id('t1');

    t2 = createP('Number of pellets, N &nbsp;&nbsp;( >= 1) :');
    t2.position(width*.63, height*.25);
    t2.id('t2');

    t3 = createP('Relative radius of each pellet, r ( >= 0.1) :');
    t3.position(width*.63, height*.3);
    t3.id('t3');

    t4 = createP('(r = 3.4 % of R)');
    t4.position(width*.7, height*.34);
    t4.id('t4');

    t5 = createP('Initial Top Speed, u :');
    t5.position(width*.63, height*.39);
    t5.id('t5');

    t6 = createP('(each particle gets a random initial speed between -u and u)');
    t6.position(width*.61, height*.43);
    t6.id('t6');

    t7 = createP('Marked Particle (1-N) :');
    t7.position(width*.63, height*.48);
    t7.id('t7');

    let t8 = createP('(position and velocity will be shown real time)');
    t8.position(width*.64, height*.52);
    t8.id('t8');

    display_p = createP('');
    display_p.position(width*.67, height*.7);
    display_p.id('display_p');

    display_v = createP('');
    display_v.position(width*.67, height*.77);
    display_v.id('display_v');

    onceCreated = true;
    N = 50;
    marked = 0;
    r_default = 10 * R / 288;
    v_default = 5 * R / 288;
  }
}

function start()
{
  if (started == false)
  {
    setup();
    // loop();
    started = true;
  }
}


function pause()
{
  if (paused == false && started == true)
  {
    paused = true;
  }
  else if (paused == true)
  {
    paused = false;
  }
}

function end()
{
  if (started == true || paused == true)
  {
    loop();
    setup();
  }
}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}

function draw() 
{
  background(50);

  if (!isNaN(float(r_input.value())))
  {
    t4.html("(r = " + nfc(100*abs(r_input.value())/28.8,2) + " % of R)");
  }

  display_p.html("position = &nbsp; ( " + nfc(pellets[marked].position.x,2) + ",&nbsp;&nbsp;" + nfc(pellets[marked].position.y,2) + " )");
  display_v.html("velocity = &nbsp; ( " + nfc(pellets[marked].velocity.x,2) + ",&nbsp;&nbsp;" + nfc(pellets[marked].velocity.y,2) + " )");

  // strokeWeight(2);
  textSize(min(.07*height,width/20));
  textAlign(CENTER, CENTER);

  fill(255);
  text('The  BuMpY  Life  of  p.a.r.t.i.c.l.e.s.', width/2,.05*height);
  stroke(255);

  // text(String(mouseX) + ", " + String(mouseY), width/5, .2*height);

  // 2 horizontal lines below title
  line(width*.2, .1*height, width*.8, .1*height);
  line(width*.2, .11*height, width*.8, .11*height);

  // vertical line [HORIZONTAL MODE]
  line(origin_x + R + 10, .12*height, origin_x + R + 10, .99*height);  
  

  translate(origin_x, origin_y);
  scale(1, -1);


  stroke(0);
  fill(255);
  ellipseMode(RADIUS);
  ellipse(0, 0, R);

  if (!(isNaN(int(mark_input.value())) || int(mark_input.value()) < 1 || int(mark_input.value()) > N))
  {
    pellets[marked].unmark();
    marked = int(mark_input.value()) - 1;
    pellets[marked].mark();
  }


  for (let i = 0; i < N; ++i) 
  {
    pellets[i].drawPellet();

    if (started == true)
    {
      for (let j = i + 1; j < N; ++j) 
      {
        pellets[i].checkCollision(pellets[j]);
      }

      if (paused == false)
      {
        pellets[i].update();
      }
    }
  }

  displayArrow(pellets[marked],'position');
  displayArrow(pellets[marked], 'velocity');
}

function displayArrow(pellet, vectorType)
{
  if (vectorType == 'position')
  {
    stroke('#0293b8');
    fill('#0293b8');
    let s1 = pellet.position.copy();
    let l = pellet.position.mag();
    let s3 = s1.copy();
    s3.setMag(l - pellet.r);
    s1.setMag(l - pellet.r -.04*R);
    let s2 = s1.copy();
    
    let n = createVector(- s3.y, s3.x);
    n.setMag(.03*R);
    s1.sub(n);
    s2.add(n);
    triangle(s1.x, s1.y, s2.x, s2.y, s3.x, s3.y);
    line(0, 0, s3.x, s3.y);

  }
  else if (vectorType == 'velocity')
  {
    stroke('#07a629');
    fill('#07a629');    
    let s1, s2, s3, l, n;
    s1 = pellet.velocity.copy();
    s1.setMag(pellet.r);
    push();
    translate(pellet.position.x + s1.x, pellet.position.y + s1.y);

    l = 50 * pellet.velocity.mag() / v_default;
    s1.setMag(l);
    s2 = pellet.velocity.copy();
    s2.setMag(l - 0.03*R);
    s3 = s2.copy();
    
    n = createVector(- s1.y, s1.x);
    n.setMag(0.02 * R);
    s2.sub(n);
    s3.add(n);
    triangle(s1.x, s1.y, s2.x, s2.y, s3.x, s3.y);
    line(0, 0, s1.x, s1.y);

    pop();
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
    let position = createVector(random(-R + 3 * r_default, R - 3 * r_default), 0);
    let velocity = createVector(random(-v_default, v_default), random(-v_default, v_default));
    return new Pellet(position, velocity, r_default, c_default);
  }

  // pass just the position arguments
  static withPosition(position_x, position_y) 
  {
    let position = createVector(position_x, position_y);
    let velocity = createVector(random(-v_default, v_default), random(-v_default, v_default));
    return new Pellet(position, velocity, r_default, c_default);
  }


  drawPellet() 
  {
    noStroke();
    fill(this.c);
    ellipseMode(RADIUS);
    if (!this.amIMarked || this.amIMarked)
    {
      ellipse(this.position.x, this.position.y, this.r);
    }
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
      change.mult(relativeVelocity.dot(normal) / normal.magSq());

      // v1 = v1 + change
      this.velocity.add(change);

      // v2 = v2 - change
      other.velocity.sub(change);

      // change = n/|n| (R1+R2-n+epsilon)/2 
      change = normal.copy();
      change.setMag((this.r + other.r - normal.mag() + epsilon) / 2);

      // r1 = r1 - change
      this.position.sub(change);

      // r2 = r2 + change
      other.position.add(change);
    }
  }

  mark() 
  {
    this.c = color('#FF0000');
    this.amIMarked = true;
  }

  unmark()
  {
    this.c = c_default;
    this.amIMarked = false;
  }

}
