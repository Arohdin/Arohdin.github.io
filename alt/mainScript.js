/*
	TODO:

	*Skapa animate funktioner som dra igång vid vissa scrollpositioner.


	Övriga kommentarer:

*/

var scrollable = 1;

//OnLoad
$(document).ready(function() {
	$(this).scrollTop(0);
});

$(document).ready(function() {
	var firstContent = $("#firstContent");
	var winHeight = $(window).height();

	firstContent.css("height", winHeight);
});


//Event: RESIZE
$(window).resize(function() {
	var firstContent = $("#firstContent");
	var winHeight = $(window).height();

	firstContent.css("height", winHeight);
});


//Event: SCROLL
//FIXA MER DYNAMISK
$(document).scroll(function() {


	var elemStuff = $("#stuff");

	var scrollPos = $(document).scrollTop();

	//PARSE INT WIN HIEGHT SEN SÄTT DET ISTÄLLET FÖR 800
	//ersätt 100 med topbar height
	var firstCH = parseInt($("#firstContent").height());

	if (scrollPos >= 0 && !(scrollPos >= firstCH-32))
	{
		elemStuff.css("margin-top", 100 - (90/(firstCH-32) * scrollPos));
		elemStuff.css("margin-left", 100 - (90/(firstCH-32) * scrollPos));
		elemStuff.css("width", 100 - (56/(firstCH-32) * scrollPos));
		elemStuff.css("height", 100 - (56/(firstCH-32) * scrollPos));
	}
	else
	{
		elemStuff.css("margin-top", 10);
		elemStuff.css("margin-left", 10);
		elemStuff.css("width", 44);
		elemStuff.css("height", 44);
	}

});

$(document).click(function(){
	var t = $(document).height();
	var ct = $(document).scrollTop();
	console.log(ct);
	if(scrollable == 1 && ct < t/2){
			scrollable = 0;
			$("html, body").animate({scrollTop: t/2 + "px"}, 1200);
			setTimeout(function(){
	      scrollable = 1;
	    }, 1250);
		}
	});


//DEBUGG
function getValues()
{
	var doc = $(document);
	var win = $(window);

	var hDoc = doc.height();
	var vDoc = doc.width();

	var hView = win.height();
	var wView = win.width();

	console.log("Doc Height: " + hDoc);
	console.log("Doc Width: " + vDoc);

	console.log("View Height: " + hView);
	console.log("View Width: " + wView);
}