/*
	TODO:
	*skapa animate funktioner som dra igång vid vissa scrollpositioner.
	Övriga kommentarer:

	Fixa så att den anpassar scrollpos vid resize.
	Fixa så att man kan användad en som "bjork coming soon"
*/

var scrollable = 1;
var status;
var topBarHeight = 300;

//OnLoad
$(document).ready(function() {
	$(this).scrollTop(0);
	status = 0;
});

$(document).ready(function() {
	var firstContent = $("#firstContent");
	var winHeight = $(window).height();

	firstContent.css("height", winHeight);
	$("#tempContent").css("height", winHeight*2);
});


//Event: RESIZE
$(window).resize(function() {
	var firstContent = $("#firstContent");
	var winHeight = $(window).height();

	firstContent.css("height", winHeight);
	$("#tempContent").css("height", winHeight*2);
});


//Event: SCROLL
//FIXA MER DYNAMISK
$(document).scroll(function() {


	var elemStuff = $("#stuff");

	var scrollPos = $(document).scrollTop();

	//PARSE INT WIN HIEGHT SEN SÄTT DET ISTÄLLET FÖR 800
	//ersätt 100 med topbar height
	var firstCH = parseInt($("#firstContent").height());

	if (scrollPos >= 0 && !(scrollPos >= firstCH - 64))
	{
		elemStuff.css("margin-top", 250 - (240/(firstCH-64) * scrollPos));
		elemStuff.css("margin-left", 250 - (240/(firstCH-64) * scrollPos));
		elemStuff.css("width", topBarHeight - (256/(firstCH-64) * scrollPos));
		elemStuff.css("height", topBarHeight - (256/(firstCH-64) * scrollPos));
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
	sweetAnimation();
	});

$(document).bind("keydown", function(e){
	var keyPressed = e.keyCode;
	if(keyPressed == 40 && status == 0){
		sweetAnimation();
	}
	else if(keyPressed == 38 && status == 1){
		sweetAnimation();
	}
})

function sweetAnimation(){
	var t = $(document).height();
	var ct = $(document).scrollTop();
	if(scrollable == 1 && status == 0){
			scrollable = 0;
			status = 1;
			setTimeout(function(){
				$("#name").fadeIn("slow");
				$("#email").fadeIn("slow");
				$("#phone").fadeIn("slow");
			}, 600);
			
			$("#hello").fadeOut("slow");
			$("html, body").animate({scrollTop: t/2 + "px"}, 1200);
			setTimeout(function(){
				scrollable = 1;
			}, 1250);
		}
		else if(scrollable == 1 && status == 1){
			scrollable = 0;
			status = 0;
			$("#name").fadeOut("slow");
			$("#email").fadeOut("slow");
			$("#phone").fadeOut("slow");
			setTimeout(function(){
				$("#hello").fadeIn("slow");
			}, 600);
			$("html, body").animate({scrollTop: 0 + "px"}, 1200);
			setTimeout(function(){
				scrollable = 1;
			}, 1250);
		}
}

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
