var earthing = false;

var currentSpot = 0;
var currentDirection = 1;
var maxCol = 0;
var earthShip;

var clearEarthEvent;

var colors = ["#55994c", "#1d5516"];

function firstRunEarth () {
	var w = window.innerWidth;
	maxCol = Math.ceil(w/20);
	
	earthShip = document.createElement('div');
	earthShip.style.width = (maxCol * 20) + "px";
	earthShip.style.height = winHeight + "px";
	
	var bod = document.getElementById("Elements");
	bod.appendChild(earthShip);
	
	for (var i=0; i < maxCol; i++) {
		createCol(i);
	}
	
	 currentSpot = (Math.floor(Math.random() * maxCol));
};

function createCol (num) {
	var tempCol = document.createElement('div');
	tempCol.className = "earthCol";
	earthShip.appendChild(tempCol);
	
	var tempFill = document.createElement('div');
	tempFill.className = "earthFill";
	tempFill.id = "earthFill" + num;
	tempCol.appendChild(tempFill);
};

function setEarthTiming() {
	elementTime = setInterval(function(){addItem();}, 25);
	moveTime = setInterval(function(){growItem();}, 26);
};

function clearEarthTiming() {
	clearInterval(elementTime);
	clearInterval(moveTime);
};

function setSpot() {
	
	if (currentSpot < 0) {
		currentDirection = 1;
		currentSpot = currentSpot + currentDirection;
	} else if (currentSpot > maxCol) {
		currentDirection = -1;
		currentSpot = currentSpot + currentDirection;
	} else {
		var num = Math.random();
		
		if (num > .8) {
			currentDirection = -currentDirection;
		}
		
		currentSpot = currentSpot + currentDirection;
	}
}

function addItem() {
	setSpot();
	
	var tempAdd = document.createElement('div');
	tempAdd.className = "earthFillUnitStart";
	
	tempAdd.style.backgroundColor = colors[(Math.floor(Math.random() * 2))];
	
	document.getElementById("earthFill" + currentSpot).appendChild(tempAdd);
	
};

function growItem() {
	var earthItems = document.getElementsByClassName("earthFillUnitStart");

	for (var i = 0; i < earthItems.length; i++) {
		earthItems[i].className = "earthFillUnitStop";
	}
};

function clearEarth() {
	clearEarthEvent = setTimeout(function(){maxCol = 0;earthShip.parentNode.removeChild(earthShip)},2000);

	//var earthItems = document.getElementsByClassName("earthFill");

	//for (var i = 0; i < earthItems.length; i++) {
	//	var temp = earthItems[i];
	//	setTimeout(function(){temp.parentNode.removeChild(temp)},200);
	//}
}

function toggleEarth() {
	if (maxCol == 0) {
		firstRunEarth();
	}

	if (earthing) {
		clearEarthTiming();
		earthShip.style.transition = "opacity 2s";
		earthShip.style.opacity = "0";
		clearEarth();
		earthing = false;
	} else {
		setEarthTiming();
		earthShip.style.opacity = "1";
		earthing = true;
		clearTimeout(clearEarthEvent);
	}
};