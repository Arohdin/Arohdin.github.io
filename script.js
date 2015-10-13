//FIXA RESIZE.
//SCROLL BUG VID SNABB SCROLLNING

//GLOBAL
var data = [];
var status;

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
  if(status == 0)
  {
    status = 1;
    $("html, body").animate({scrollTop: data[1]}, 650);
  }
  else if(status == 1)
  {
    status = 0;
    $("html, body").animate({scrollTop: "0px"}, 650);
  }
}

//inte skrivit själv lol
$(window).on('mousewheel DOMMouseScroll', function (e) {

    var direction = (function () {

        var delta = (e.type === 'DOMMouseScroll' ?
                     e.originalEvent.detail * -40 :
                     e.originalEvent.wheelDelta);

        return delta > 0 ? 0 : 1;
    }());

    if(direction === 1) {
       // scroll down
       if(status == 0){
         setScrollPos();
       }

    }
    else if(direction === 0) {
       // scroll up
       if(status == 1){
         setScrollPos();
       }
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
