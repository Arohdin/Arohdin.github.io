var canvas, ctx;
var winHeight, winWidth;

var context, analyser, source;
var freqArray;

$(document).ready(function(){
  canvas = document.getElementById("theCanvas");
  ctx = canvas.getContext("2d");

  winHeight = $(window).height();
  winWidth = $(window).width();
  canvas.height = winHeight;
  canvas.width = winWidth;

  $("#theCanvas").css("height", winHeight);
  $("#theCanvas").css("width", winWidth);

  init();

});

function init(){
  var audio = new Audio();
  audio.crossOrigin ="anonymous";
  audio.src = "http://streaming.radionomy.com/ABCSUPERHITS?lang=en-US%2cen%3bq%3d0.8";
  audio.controls = true;
  audio.autoplay = true;

  context = new AudioContext();
  analyser = context.createAnalyser();
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  render();
}

function render(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  freqArray = new Uint8Array(analyser.frequencyBinCount); //1024 long
  analyser.getByteFrequencyData(freqArray);

  for(var i = 0; i < 45; ++i)
  {
    ctx.beginPath();
    ctx.arc(400,300,100, 0, Math.PI/4);
    ctx.stroke();
  }

  requestAnimationFrame(render);
}
