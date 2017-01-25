const MULTIPLIER = 100;

var c, ctx;
var mp;
const GRAVITY = 9.82 * MULTIPLIER;
const N = 4;
const NUM = N*N;
const K = 600;
var points = [];
var lastTime;
var GLOBALDATA = [];
const SPRING_REST_LENGTH = 0;
const MAX_SPRING_DISTANCE = 150;
const SPACING = 50;

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

  if(hyp > MAX_SPRING_DISTANCE)
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

  if(hyp < SPRING_REST_LENGTH)
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
  hyp = Math.sqrt(Math.pow(dx2,2) + Math.pow(dy2,2));

  if(hyp > MAX_SPRING_DISTANCE)
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

  if(hyp < SPRING_REST_LENGTH)
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

  if(hyp > MAX_SPRING_DISTANCE)
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

  if(hyp < SPRING_REST_LENGTH)
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
  var scale = MAX_SPRING_DISTANCE/hyp;

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
    points[i] = new point((150  + i*SPACING) - Math.floor(i/N)*SPACING*N, 75 + Math.floor(i/N)*SPACING, ids);
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

  drawDots();

  calculate(dt);

  requestAnimationFrame(draw);
}


function calculate(dt)
{
  for(var id = N; id < NUM; ++id)
  {
    var positionArray, newAx, newAy, hyp;
    var prevAcc = points[id].getPrev();
        prevAcc = prevAcc.acc;
    var retVal = getRelevantIds(points[id].getIds(), id);
    var retDelta = getDeltaDistances(retVal, id);
    var netFx = 0;
    var netFy = 0;
    var netAx = 0;
    var netAy = 0;

    for(var it = 0; it < retDelta.length; ++it)
    {
      netFx += (K*retDelta[it].delta.dx);
      netFy += (K*retDelta[it].delta.dy);
    }

    newAx = netFx/points[id].getMass();
    newAy = netFy/points[id].getMass();


    netAx = prevAcc.x*0.75 - newAx;
    netAy = prevAcc.y*0.7 - newAy + GRAVITY;

    move(dt, {ax:netAx, ay:netAy}, id);

  }
}

function move(dt, accs, currID)
{
  var tp = points[currID].getPrev();
  var tax = accs.ax*dt;
  var tay = accs.ay*dt
  points[currID].setPos(tp.pos.x + tax, tp.pos.y + tay);
  points[currID].setPrev(tax,tay);
}

function getDeltaDistances(data, currID)
{
  var temp = [];
  for(var h = 0; h < data.length; ++h)
  {
    var currPos = points[currID].getPos();
    var dynPos = points[data[h]].getPos();
    var tempHyp =  Math.sqrt(Math.pow(currPos.x - dynPos.x,2) + Math.pow(currPos.y - dynPos.y,2));
    temp.push({delta:{dx:(currPos.x - dynPos.x), dy:(currPos.y - dynPos.y)}, hyp:tempHyp});
  }
  return temp;
}

function getRelevantIds(data, currID)
{
  var temp = [];
  for(var j = 0; j < 4; ++j)
  {
    if(data[j] >= 0 && data[j] < NUM)
    {
      if(0 == currID%N && data[j] == currID-1){}
      else {
        temp.push(data[j]);
      }
    }
  }
  return temp;
}



function drawDots()
{
  ctx.fillStyle = "red";
  for(var i = 0; i < NUM; ++i)
  {
    var pos = points[i].getPos();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2*Math.PI);
    ctx.fill();
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
