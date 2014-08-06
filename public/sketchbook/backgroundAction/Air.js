var airing = false;


function setAirTiming() {
	elementTime = setInterval(function(){air()}, 25);
	moveTime = setInterval(function(){airMove()}, 26);
};

function clearAirTiming() {
	clearInterval(elementTime);
	clearInterval(moveTime);
};

function air() {
	var bod = document.getElementById("Elements");
	var drop = document.createElement('div');
	drop.className = "AirStart";
	drop.style.top = (Math.floor(Math.random() * window.innerHeight)) + "px";
	//drop.addEventListener("transitionend", fallDone(drop), true);
	setTimeout(function(){drop.parentNode.removeChild(drop)},3000);
	bod.appendChild(drop);
};

function airMove() {
	var air = document.getElementsByClassName("AirStart");

	for (var i = 0; i < air.length; i++) {
		air[i].className = "AirStop";	
	}
};

function toggleAir() {
	if (airing) {
		clearAirTiming();
		airing = false;
	} else {
		setAirTiming();
		airing = true;
	}
};