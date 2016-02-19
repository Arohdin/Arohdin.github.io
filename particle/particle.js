/*########PRIO ATT FIXA##########

  **MÅSTA: FIXA GLOBALA så att dem skickas in istället !!!JOBBIGT!!!**

  1. fixa så att dem ej spawnar i kanten (dem måste spawna width - Radius)

*/

//GÖR MER DYNAMISKT
//  ex. ändra numeriska till variabler
//  Lägg nuvarande "steps" som bashastighet
//



var canvas, ctx;
var xStart = [];
var yStart = [];
var num = 100;
var xPrev = [];
var yPrev = [];
var yAngles = [];
var xAngles = [];
var chk;
var winHeight, winWidth;
var speedArr = [];
var radArr = [];
var _PAUSE = false;
var superSampler = 2;
var stepsToGo = 70;
var hyperX = [];
var hyperY = [];
var stepsLeft = stepsToGo;
var _DRAWLINES = true;
var xMid, yMid;
var capturedPosition;
var mousePos;
var _READY = true;

$(document).ready(function() {
  canvas = document.getElementById("theCanvas");
  ctx = canvas.getContext("2d");

  canvas.addEventListener('mousemove', function(evt) {
          mousePos = getMousePos(canvas, evt);
        }, false);


})

$(document).ready(function() {

  winHeight = $(window).height();
  winWidth = $(window).width();
  canvas.height = winHeight * superSampler;
  canvas.width = winWidth * superSampler;

  $("#theCanvas").css("height", winHeight);
  $("#theCanvas").css("width", winWidth);

  generate();
  firstDraw();
})


//Renderar canvas i dubbla upplösningen och sen skalar ner den
//  för skarpare bild. (samma för resize)
$(window).resize(function(){

  winHeight = $(window).height();
  winWidth = $(window).width();
  canvas.height = winHeight * superSampler;
  canvas.width = winWidth * superSampler;

  $("#theCanvas").css("height", winHeight);
  $("#theCanvas").css("width", winWidth);

  var delta = 0;

  for (var i = 0; i < num; i++)
  {
    if(xPrev[i] > winWidth * superSampler)
    {
      delta = winWidth * superSampler - xPrev[i];
      xPrev[i] = winWidth - delta;
    }

    if(yPrev[i] > winHeight * superSampler)
    {
      delta = winHeight * superSampler - yPrev[i];
      yPrev[i] = winHeight - delta;
    }
  }

});


function firstDraw() {
  for(var i = 0; i < num; i++)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(xStart[i], yStart[i], 5,5);

    xPrev[i] = xStart[i];
    yPrev[i] = yStart[i];
  }
  draw();
}

function setAgain() {
  for(var i = 0; i < num; i++)
  {
    xPrev[i] = xStart[i];
    yPrev[i] = yStart[i];
  }
}

function draw() {
  var xTemp = 0;
  var yTemp = 0;
  xMid = canvas.width / 2;
  yMid = canvas.height / 2;

  //CLEAR CANVAS
  if(!_PAUSE)
  {
    ctx.clearRect (0 , 0 , canvas.width, canvas.height);
  }


if(!_PAUSE)
{
  //Bestämmer positionen
  for(var i = 0; i < num; i++)
  {
    var steps = 500/700; //ANTAL DRAWCALLS INNAN DEN GÅR 500px LÄNGD
    xTemp = xPrev[i] + Math.cos(xAngles[i])*steps * speedArr[i];
    yTemp = yPrev[i] + Math.sin(yAngles[i])*steps * speedArr[i];

    //Håller innanför ramarna
    if(yTemp <= 0 + radArr[i]|| yTemp >= winHeight * superSampler - radArr[i])
    {
      yAngles[i] = -1 * yAngles[i];

      xTemp = xPrev[i] + Math.cos(xAngles[i]) * steps;
      yTemp = yPrev[i] + Math.sin(yAngles[i]) * steps;
    }
    else if(xTemp <= 0 + radArr[i] || xTemp >= winWidth * superSampler - radArr[i])
        {
          xAngles[i] = (Math.PI - xAngles[i]);

          xTemp = xPrev[i] + Math.cos(xAngles[i]) * steps;
          yTemp = yPrev[i] + Math.sin(yAngles[i]) * steps;
        }

    xPrev[i] = xTemp;
    yPrev[i] = yTemp;
  }

}
else //OM DU VILL HA ATT DEM ÅKER TILL MITTEN SÅ BYT TILLBAKA TILL xMid OCH yMid!!!
{
  if(stepsLeft > 0)
  {
    for(var i = 0; i < num; i++)
    {
      if(xPrev[i] != capturedPosition.x)
      {
        if(xPrev[i] >  capturedPosition.x)
        {
          xPrev[i] -= hyperX[i];
        }
        else
        {
          xPrev[i] += hyperX[i];
        }
      }
      if(yPrev[i] != capturedPosition.y)
      {
        if(yPrev[i] > capturedPosition.y)
        {
          yPrev[i] -= hyperY[i];
        }
        else
        {
          yPrev[i] += hyperY[i];
        }
      }
    }
  }
  else
  {
    setTimeout(function () {
      generate(); //FÖR COOL EFFECT, LÄGG GENERATE() INNANFÖR TMEOUT FUNCTION. ANNARS INNANFÖR.
      setAgain();
      _DRAWLINES = true;
      _PAUSE = false;
      _READY = true;
    }, 500);
  }
  stepsLeft--;
}


  //Ritar upp prickarna
  for(var i = 0; i < num; i++)
  {
    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(xPrev[i], yPrev[i], radArr[i], 0, 2*Math.PI);
    ctx.fill();
  }

  //Ritar sträck
  if(_DRAWLINES)
  {
    for(var i = 0; i < num; i++)
    {
      for(t = 0; t < num; t++)
      {
        if(xPrev[i] != xPrev[t] && yPrev[i] != yPrev[t] && yPrev[i] != yPrev[t])
        {
          chk = checkDist(i, t);
          if(chk != -1)
          {
            ctx.beginPath();
            ctx.moveTo(xPrev[i],yPrev[i]);
            ctx.lineTo(xPrev[t], yPrev[t]);
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "rgba(243, 156, 18," + chk + ")";
            ctx.stroke();
          }
        }
      }
    }
  }

  requestAnimationFrame(draw);
}

function checkDist(i,t) {

  var dx = Math.abs(xPrev[i] - xPrev[t]);
  var dy = Math.abs(yPrev[i] - yPrev[t]);
  var maxLineLength = 200;
  var hypo = 0;

  hypo = Math.sqrt((Math.pow(dx, 2)+(Math.pow(dy, 2))));


  if(hypo > maxLineLength)
  {
    return -1;
  }
  else {
    if(hypo == 0)
    {
      hypo == 1;
    }

    return 1 - hypo/maxLineLength;

    var alpha = 1.0;
    return alpha;
  }
}

function generate() {

  var yTemp, xTemp, angle;

  for(var i = 0; i < num; i++)
  {
    yTemp = Math.round(Math.random()*canvas.height);
    xTemp = Math.round(Math.random()*canvas.width);
    angle = Math.random()*Math.PI*2;

    xStart[i] = xTemp;
    yStart[i] = yTemp;
    yAngles[i] = angle;
    xAngles[i] = angle;
  }

  //Generate size of particle
  for (var i = 0; i < num; i++)
  {
    radArr[i] = Math.random() * 4;
  }

  for(var i = 0; i < num; i++)
  {
    speedArr[i] = Math.random();

    if(speedArr[i] < 0.5)
    {
      i--;
    }
  }
}


//OM DU VILL HA ATT DEM ÅKER TILL MITTEN SÅ BYT TILLBAKA TILL xMid OCH yMid!!!
function setPause()
{
  if(_PAUSE)
  {
    if(_READY)
    {
      _PAUSE = false;
    }
  }
  else
  {
    if(_READY)
    {
      _READY = false;
      capturedPosition = mousePos;
      capturedPosition.x = capturedPosition.x * superSampler;
      capturedPosition.y = capturedPosition.y * superSampler;

      _DRAWLINES = false;
      _PAUSE = true;
      stepsLeft = stepsToGo;
      hyperX = xPrev.slice();
      hyperY = yPrev.slice();
      for(var i = 0; i < num; i++)
      {
        hyperX[i] = Math.abs(xPrev[i] - capturedPosition.x) / stepsToGo;
        hyperY[i] = Math.abs(yPrev[i] - capturedPosition.y) / stepsToGo;
      }
    }
  }
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
