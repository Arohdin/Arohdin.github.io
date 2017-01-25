const MULTIPLIER = 100;

var c, ctx;
var mp;
const GRAVITY = 9.82 * MULTIPLIER;
const N = 10;
const NUM = N*N;
const K = 500;
var points = [];
var lastTime;
var GLOBALDATA = [];

$(document).ready(function(){
  c = document.getElementById("theCanvas");
  ctx = c.getContext("2d");

  mp = {x: 0, y:0};

  c.addEventListener('mousemove', function(evt){
    mp = getMousePos(evt);
  });


  debugInit();

  //Release
  //init();
});


//////////////////////DEBUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG////////////////
//_______________________________________________________________________________
function debugInit()
{

  points.push(new point(400,200,[0,0,0,0]));
  points.push(new point(300,300,[0,0,0,0]));
  points.push(new point(300,400,[0,0,0,0]));
  points.push(new point(300,500,[0,0,0,0]));

  lastTime = Date.now();

  debugDraw();
}


function debugDraw()
{
  var now = Date.now();
  var dt = (now - lastTime)/1000;
  if(dt == 0)
  {
    dt = 10/1000;
  }
  lastTime = now;

  ctx.clearRect(0,0,800,800);

  debugForces(dt);
  debugCheckBounds();
  debugDrawLines();
  debugDrawDots();


  requestAnimationFrame(debugDraw);
}

function debugForces(dt)
{
  points[0].setPos(mp.x,mp.y);

  //mp = points[0].getPos();

  var mass1 = points[1].getMass() + points[2].getMass() + points[3].getMass();
  var massPos1 = points[1].getPos();
  var prevData1 = points[1].getPrev();
  var dx1 = mp.x - massPos1.x;
  var dy1 = mp.y - massPos1.y;
  var hyp = Math.sqrt(Math.pow(dx1,2) + Math.pow(dy1,2));

  if(hyp > 200)
  {
    var r = controll(hyp, dx1, dy1);
    dx1 = r.dx;
    dy1 = r.dy;
  }

  var fkx1 = (-K*dx1)/1.5;
  var fky1 = -K*dy1;

  fky1 = (fky1 < 0) ? fky1 : fky1;

  var ax1 = fkx1/mass1;
  var ay1 = fky1/mass1;

  if(hyp < 50)
  {
    ax1 = 0;
    ay1 = 0;
  }

  var netForceX1 = prevData1.acc.x - ax1;
  var netForceY1 = prevData1.acc.y - ay1 + GRAVITY;

  var pack1 = {accx:netForceX1, accy:netForceY1};

  var mass2 = points[2].getMass() + points[3].getMass();
  var massPos2 = points[2].getPos();
  var prevData2 = points[2].getPrev();
  var dx2 = massPos1.x - massPos2.x;
  var dy2 = massPos1.y - massPos2.y;
  var hyp = Math.sqrt(Math.pow(dx2,2) + Math.pow(dy2,2));

  if(hyp > 200)
  {
    var r = controll(hyp, dx2, dy2);
    dx2 = r.dx;
    dy2 = r.dy;
  }

  var fkx2 = (-K*dx2)/2;
  var fky2 = -K*dy2;

  fky2 = (fky2 < 0) ? fky2 : fky2;

  var ax2 = fkx2/mass2;
  var ay2 = fky2/mass2;

  if(hyp < 50)
  {
    ax2 = 0;
    ay2 = 0;
  }

  var netForceX2 = prevData1.acc.x + prevData2.acc.x - ax2;
  var netForceY2 = prevData1.acc.y + prevData2.acc.y - ay2 + GRAVITY;

  var pack2 = {accx:netForceX2, accy:netForceY2};

  var mass3 = points[3].getMass();
  var massPos3 = points[3].getPos();
  var prevData3 = points[3].getPrev();
  var dx3 = massPos2.x - massPos3.x;
  var dy3 = massPos2.y - massPos3.y;
  var hyp = Math.sqrt(Math.pow(dx3,2) + Math.pow(dy3,2));

  if(hyp > 200)
  {
    var r = controll(hyp, dx3, dy3);
    dx3 = r.dx;
    dy3 = r.dy;
  }

  var fkx3 = (-K*dx3)/3;
  var fky3 = -K*dy3;

  fky3 = (fky3 < 0) ? fky3 : fky3;

  var ax3 = fkx3/mass3;
  var ay3 = fky3/mass3;

  if(hyp < 50)
  {
    ax3 = 0;
    ay3 = 0;
  }

  var netForceX3 = prevData1.acc.x + prevData2.acc.x + prevData3.acc.x - ax3;
  var netForceY3 = prevData1.acc.y + prevData2.acc.y + prevData3.acc.y - ay3 + GRAVITY;

  var pack3 = {accx:netForceX3, accy:netForceY3};

  debugCalc(dt, pack1, pack2, pack3);

}


function controll(hyp, x,y)
{
  var scale = 200/hyp;

  var dx1 = Math.sqrt(scale) * x;
  var dy1 = Math.sqrt(scale) * y;

  return {dx:dx1, dy:dy1};
}


function debugCalc(dt, accs, accs2, accs3)
{
  var prevData, ax, ay;
  prevData = points[1].getPrev();
  ax = prevData.acc.x*0.75 + accs.accx*dt;
  ay = prevData.acc.y*0.7 + accs.accy*dt;

  points[1].setPos(prevData.pos.x + ax, prevData.pos.y + ay);
  points[1].setPrev(ax,ay);

  prevData = points[2].getPrev();
  ax = prevData.acc.x*0.75 + accs2.accx*dt;
  ay = prevData.acc.y*0.7 + accs2.accy*dt;

  points[2].setPos(prevData.pos.x + ax, prevData.pos.y + ay);
  points[2].setPrev(ax,ay);

  prevData = points[3].getPrev();
  ax = prevData.acc.x*0.75 + accs3.accx*dt;
  ay = prevData.acc.y*0.7 + accs3.accy*dt;

  points[3].setPos(prevData.pos.x + ax, prevData.pos.y + ay);
  points[3].setPrev(ax,ay);

}


function debugDrawDots()
{
  ctx.fillStyle = "red";

  for(var i = 0; i < 4; ++i)
  {
    var p = points[i].getPos();
    ctx.beginPath();
    ctx.arc(p.x, p.y,5,0,2*Math.PI);
    ctx.fill();
  }

}

function debugDrawLines()
{

  var p, p1;
  for(var i = 0; i < 3; ++i)
  {
    p = points[i].getPos();
    p1 = points[i+1].getPos();
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.stroke();
  }

}


function debugCheckBounds()
{
  for(var i = 0; i < 4; ++i)
  {
    var p = points[i].getPos();
    var pa = points[i].getPrev();
    if(p.y > 790)
    {
      points[i].setPos(p.x,790);
      points[i].setPrev(pa.acc.x*0.45,0);
    }
  }
}


//________________________________________________________________________________


function init()
{
  var ids = [];
  for(var i = 0; i < NUM; ++i)
  {
    //right, under, Left, top
    ids = [i+1, i+N, i-1, i-N];
    points[i] = new point((150  + i*50) - Math.floor(i/N)*50*N, 75 + Math.floor(i/N)*50, ids);
  }
  lastTime = Date.now();

  draw();
}


function draw() {

  var now = Date.now();
  var dt = (now - lastTime)/1000;
  if(dt == 0)
  {
    dt = 10/1000;
  }
  lastTime = now;

  ctx.clearRect(0,0,800,800);

  updatePosition(dt);
  checkBounds();

  drawLines();
  drawDots();

  requestAnimationFrame(draw);
}




function updatePosition(dt)
{
  var p, prevData, ax, ay, newAcc;
  for(var i = N; i < NUM; ++i)
  {
    p = points[i].getPos();
    prevData = points[i].getPrev();
    ax = prevData.acc.x*0.75;
    ay = prevData.acc.y*0.7 + GRAVITY*dt;

    points[i].setPos(p.x + ax, p.y + ay);
    points[i].setPrev(ax,ay);
  }
}

function drawDots()
{
  ctx.fillStyle = "red";
  var pos;

  for(var i = 0; i < NUM; ++i)
  {
    p = points[i].getPos();
    ctx.beginPath();
    ctx.arc(p.x, p.y,5,0,2*Math.PI);
    ctx.fill();
  }
}

function drawLines()
{
  var p, pn, pts;
  for(var i = 0; i < NUM; ++i)
  {
    p = points[i].getPos();
    pts = points[i].getIds();
    for(var q = 0; q < 2; ++q)
    {
      if(pts[q] > 0 && pts[q] < N*N && 0 != (i+1)%N)
      {
        pn = points[pts[q]].getPos();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pn.x, pn.y);
        ctx.stroke();
      }
    }
  }
  for(var i = 0; i < (N-1); ++i)
  {
    p = points[(N-1) + i*N].getPos();
    pn = points[(N-1) + (i+1)*N].getPos();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pn.x, pn.y);
    ctx.stroke();
  }
}


function checkBounds()
{
  var p;
  for(var i = 0; i < NUM; ++i)
  {
    p = points[i].getPos();
    if(p.y > 800)
    {
      points[i].setPos(p.x,800);
      points[i].setPrev(0,0);
    }
  }
}



function getMousePos(evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



class point {
  constructor(xPos,yPos, arr)
  {
    this.x = xPos;
    this.y = yPos;
    this.mass = 30;
    this.prevx = xPos;
    this.prevy = yPos;
    this.prevAccx = 0;
    this.prevAccy = 0;
    this.ids = arr;
  }

  setPos(xPos, yPos)
  {
    this.x = xPos;
    this.y = yPos;
  }

  getPos()
  {
    return {x:this.x, y:this.y};
  }

  getPrev()
  {
    return {acc:{x:this.prevAccx, y:this.prevAccy}, pos:{x:this.prevx, y:this.prevy}};
  }

  setPrev(accx,accy)
  {
    this.prevAccx = accx;
    this.prevAccy = accy;
    this.prevx = this.x;
    this.prevy = this.y;
  }

  getIds()
  {
    return this.ids;
  }

  getMass()
  {
    return this.mass;
  }

}
