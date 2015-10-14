/*########PRIO ATT FIXA##########

  1. fix så att partiklarna flyttar sig innanför rutan vid resize.
  2. Iställer för winWidth * 2, skapa en superSample variable
  3. fixa så att dem går över på andra sidan
  4. fixa så att dem ej spawnar i kanten (dem måste spawna width - Radius)

*/

//GÖR MER DYNAMISKT
//  ex. ändra numeriska till variabler
//Fixa hastighets variabel så att partiklarna kan ha olika ahstigheter
//  (hastighets array med varje elemnt mellan ex. 0.5 - 1.5)
//  Lägg nuvarande "steps" som bashastighet
//Fixa så att cirklarna blir olika storlekar
//Fixa så att steglängderna på fadeeffekten ej är beroende av längden på hur långt ett sträck max får vara (???)

//FIXA GLOBALA så att dem skickas in istället *JOBBIGT*


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

$(document).ready(function() {
  canvas = document.getElementById("theCanvas");
  ctx = canvas.getContext("2d");
})

$(document).ready(function() {

  winHeight = $(window).height();
  winWidth = $(window).width();
  canvas.height = winHeight * 2;
  canvas.width = winWidth * 2;

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
  canvas.height = winHeight * 2;
  canvas.width = winWidth * 2;

  $("#theCanvas").css("height", winHeight);
  $("#theCanvas").css("width", winWidth);

  var delta = 0;

  for (var i = 0; i < num; i++)
  {
    if(xPrev[i] > winWidth*2)
    {
      delta = winWidth * 2 - xPrev[i];
      xPrev[i] = winWidth - delta;
    }

    if(yPrev[i] > winHeight*2)
    {
      delta = winHeight * 2 - yPrev[i];
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

function draw() {
  var xTemp = 0;
  var yTemp = 0;

  //CLEAR CANVAS
  ctx.clearRect (0 , 0 , canvas.width, canvas.height);

  //Bestämmer positionen
  for(var i = 0; i < num; i++)
  {
    var steps = 500/700; //ANTAL DRAWCALLS INNAN DEN GÅR 500px LÄNGD
    xTemp = xPrev[i] + Math.cos(xAngles[i])*steps * speedArr[i];
    yTemp = yPrev[i] + Math.sin(yAngles[i])*steps * speedArr[i];

    //Håller innanför ramarna
    if(yTemp <= 0 + radArr[i]|| yTemp >= winHeight * 2 - radArr[i])
    {
      yAngles[i] = -1 * yAngles[i];

      xTemp = xPrev[i] + Math.cos(xAngles[i]) * steps;
      yTemp = yPrev[i] + Math.sin(yAngles[i]) * steps;
    }
    else if(xTemp <= 0 + radArr[i] || xTemp >= winWidth * 2 - radArr[i])
        {
          xAngles[i] = (Math.PI - xAngles[i]);

          xTemp = xPrev[i] + Math.cos(xAngles[i]) * steps;
          yTemp = yPrev[i] + Math.sin(yAngles[i]) * steps;
        }

    xPrev[i] = xTemp;
    yPrev[i] = yTemp;
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


//Particle moves to the center at a speed which equals that
  //all particles have the same traveltime to reach the center.
//Particles are not moved at the same time, one particle at the time.
  //Time is interval.
//When reaching center, remove particle.
  //When all particles are gone, respawn them.
function hyperSpeed(){


}
