//Fixa keyboard event pilarna.
//fixa carousell
//fixa smoother-scrolling
//fixa anchors istället för att dela data med ett tal.

//GLOBAL
var data = [];
var status;
var scrollable = 1;

//function som kallas vid första ladningen.
function run(){
  getVal();
  setSize();
  setFloaterPos();
}

//Tar fram höjd och bredd.
//retunerar datan i en array.
function getVal(){
  data[0] = $(window).width();
  data[1] = $(window).height();
  data[2] = $(window).scrollTop();
  //console.log(data[0]);
  //console.log(data[1]);
}

//Sätter size på saker.
function setSize(){
  var elems = document.getElementsByClassName("sizes");

  for(var i = 0; i < elems.length; i++)
  {
    elems[i].style.width = data[0] + "px";
    elems[i].style.height = data[1] + "px";
  }

  $("#superWrapper").css("width", data[0] + "px");
  $("#superWrapper").css("height", (data[1]*2) + "px");

  $("#profilePic").css("width", data[0] + "px");
  $("#profilePic").css("height", data[1]/3 + "px")

  $("#mainContent").css("width", data[0] + "px");
  $("#mainContent").css("height", data[1]/3*2 + "px")

}

function setFloaterPos(){
  var scrollPos = data[2];
  var h = data[1];
  var middle, pos;

  middle = h/2;
  pos = Math.floor((h/2) - (h/20) + scrollPos);
  //console.log(pos);
  $("#floater").css("margin-top", pos);
  //console.log("har kört");
}

//Sätter status på vilken div man är på.
function setStatus(){
  var scrollPos = data[2];
  var middle = data[1]/2;
  if(scrollPos <= middle)
    {
      status = 0;
    }
  else
    {
      status = 1;
    }
}

function autoScroll(){
  console.log("Clicked");
  setScrollPos();
}

function setScrollPos(){
  if(status == 0 && scrollable == 1)
  {
    scrollable = 0;
    status = 1;
    $("html, body").animate({scrollTop: data[1]}, 550);
    setTimeout(function(){
      scrollable = 1;
    }, 600);
  }
  else if(status == 1 && scrollable == 1)
  {
    scrollable = 0;
    status = 0;
    $("html, body").animate({scrollTop: "0px"}, 550);
    setTimeout(function(){
      scrollable = 1;
    }, 600);
  }
}

//Hantera scroll-directions
$(window).on('mousewheel DOMMouseScroll', function (e) {

    var direction = (function () {

        var delta = (e.type === 'DOMMouseScroll' ?
                     e.originalEvent.detail * -40 :
                     e.originalEvent.wheelDelta);

        return delta > 0 ? 0 : 1;
    }());

    if(direction === 1) {
       //ned
       if(status == 0){
         setScrollPos();
       }

    }
    else if(direction === 0) {
       // upp
       if(status == 1){
         setScrollPos();
       }
    }
});

$(document).bind("keydown", function(e){
  var t = e.keyCode
  if(t == 38 && status == 1){
    setScrollPos();
  }
  else if(t == 40 && status == 0){
    setScrollPos();
  }

});

$(window).scroll(function(){
  getVal();
  setFloaterPos();
  setStatus();
  //console.log("activated");
  //console.log("status is:" + status);
});


//Anpassar data vid first load, kallar på run().
$(document).ready(function(){
  run();
  $(window).scrollTop(0);
});

//Anpassar data efter resize.
$(window).resize(function(){
  run();
});
