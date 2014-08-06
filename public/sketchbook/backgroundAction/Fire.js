var fireing = false;


function setFireTiming() {
	elementTime = setInterval(function(){fire()}, 25);
	moveTime = setInterval(function(){fireMove()}, 26);
};

function clearFireTiming() {
	clearInterval(elementTime);
	clearInterval(moveTime);
};

function fire() {
	var bod = document.getElementById("Elements");
	var drop = document.createElement('div');
	drop.className = "FireStart";
	drop.style.left = (Math.floor(Math.random() * window.innerWidth)) + "px";
	//drop.addEventListener("transitionend", fallDone(drop), true);
	setTimeout(function(){drop.parentNode.removeChild(drop)},2000);
	bod.appendChild(drop);
};

function fireMove() {
	var rain = document.getElementsByClassName("FireStart");

	for (var i = 0; i < rain.length; i++) {
		rain[i].className = "FireStop";	
	}
};

function toggleFire() {
	if (fireing) {
		clearFireTiming();
		fireing = false;
	} else {
		setFireTiming();
		fireing = true;
	}
};