var raining = false;


function setRainTiming() {
	elementTime = setInterval(function(){rain();}, 25);
	moveTime = setInterval(function(){rainMove();}, 26);
};

function clearRainTiming() {
	clearInterval(elementTime);
	clearInterval(moveTime);
};

function rain() {
	var bod = document.getElementById("Elements");
	var drop = document.createElement('div');
	drop.className = "RainStart";
	drop.style.left = (Math.floor(Math.random() * window.innerWidth)) + "px";
	//drop.addEventListener("transitionend", fallDone(drop), true);
	setTimeout(function(){drop.parentNode.removeChild(drop)},2000);
	bod.appendChild(drop);
};

function rainMove() {
	var rain = document.getElementsByClassName("RainStart");

	for (var i = 0; i < rain.length; i++) {
		rain[i].className = "RainStop";
	}
};

function toggleRain() {
	if (raining) {
		clearRainTiming();
		raining = false;
	} else {
		setRainTiming();
		raining = true;
	}
};