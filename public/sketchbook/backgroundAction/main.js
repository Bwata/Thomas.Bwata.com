var winHeight = window.innerHeight;
var currentElement = 5;

var elementTime;
var moveTime;

function startStuff() {
	navSwitch(0);
	setContentBox();
};

function setContentBox() {
	var size = winHeight - 200;
	
	var bod = document.getElementById("BodyBox");
	bod.style.width = size + "px";
	
	bod.style.height = size + "px";
};

function navSwitch(section) {
	navToggle(currentElement);
	navToggle(section)
	currentElement = section;
};

function navToggle(section) {
	//Switch to do something
	switch (section) {

			case 0: 
				toggleEarth();
				document.getElementById("BodyBox").style.borderColor = "#55994c";
				break;
				
			case 1: 
				toggleRain();
				document.getElementById("BodyBox").style.borderColor = "#4e61ed";
				break;
				
			case 2: 
				toggleAir();
				document.getElementById("BodyBox").style.borderColor = "#c5e5e9";
				break;
				
			case 3: 
				toggleFire();
				document.getElementById("BodyBox").style.borderColor = "#f9302b";
				break;

			default: 
			
				break;
		}
};