/*
TODO:
	- Work in Logging or user messages
	- 

*/


var horizontalIndex = 0;
var verticalLoc = [];
var sectionTotal;  /* array size plus 1*/
var verticalDist = 75;
var headerTexts;
var currentApp;
var footerDisplay;

//swipe reading
var startX;
var startY;
var endX;
var endY;

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

//Attach the swipe listeners to the watch face
var watchface = document.getElementById('watchface');
watchface.addEventListener('touchstart', startingSwipe, false);
watchface.addEventListener('touchend', endingSwipe, false);

/****************************************************************************************

****************************************************************************************/

function app_setUp(app, numSections, sections, startSection, footerVisable) {
	currentApp = app;
	sectionTotal = numSections;
	headerTexts = sections;
	footerDisplay = footerVisable;
	
	for (var i = 0; i < sectionTotal; i++) {
		verticalLoc[i] = 0;
	}
	
	horizontalIndex = startSection-1;
	document.getElementById('allSections').style.left = -(horizontalIndex * 162) + "px";
	document.getElementById('headerText').innerHTML = headerTexts[horizontalIndex];
};

/****************************************************************************************

****************************************************************************************/
function parent_message (message) {
	parent.postMessage(message, "*");
};

/****************************************************************************************
Registers the users finger is placed on the screen and determines the starting point of the touch.
****************************************************************************************/
function startingSwipe (event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    
    startX = touch.screenX;
    startY = touch.screenY;
    
    console.log("start touch app");
  }
};

/****************************************************************************************
Registers the users finger is take off the screen and registers the location of removel. Calculates if the difference between where the user places his finger and removes his finger is within the parameters of the "Swipe" and determimes the direction of the swipe then sets into action what is required for that action.
****************************************************************************************/
function endingSwipe (event) {
    var touch = event.changedTouches[0];
    
    endX = touch.screenX;
    endY = touch.screenY;
    
    var distX = endX - startX;
    var distY = endY - startY;
    var longDist = 0;
    var shortDist = 0;
    
    if (Math.abs(distX) > Math.abs(distY)) {
    	longDist = Math.abs(distX);
    	shortDist = Math.abs(distY);
    } else {
    	longDist = Math.abs(distY);
    	shortDist = Math.abs(distX);
    }
    
    console.log("distX = " + distX);
    console.log("distY = " + distY);
    
    
	if (longDist > 120 && shortDist < 50) {
		if (Math.abs(distX) > Math.abs(distY)) {
			if (distX > 0) {						//RIGHT Swipe
				swipe_right();
			} else {								//LEFT Swipe
				/*swipe_left();*/
			}
		} else {
			if (distY > 0) {						//DOWN Swipe
				swipe_down();
			} else { 								//UP Swipe
				swipe_up();
			}
		}
	}
	
	//console.log("current App: " + currentView);
};


/****************************************************************************************

****************************************************************************************/
function item_scroll_down (item, location, distance) {
	console.log(item);

	var height = -document.getElementById(item).clientHeight;
	console.log('down height: ' + height);

	console.log(height);
	if ((location + distance) >= 0) {

		location = 0;
		document.getElementById(item).style.top= location + "px";
		document.getElementById(item).style.top= location + "px";
		console.log("down than");

	} else {
		location += distance;
		document.getElementById(item).style.top= location + "px";
		console.log("down else");
	}
	return location;
	console.log(location);
};

/****************************************************************************************

****************************************************************************************/
function item_scroll_up (item, location, distance) {
	var height = document.getElementById(item).clientHeight;
	
	console.log('up height: ' + height);
	if (height > 220) {
		height -= 220;
	}
	
	height = -height;
	
	console.log('app distance: ' + distance);
	console.log('app location: ' + location);

	if ((location - distance) < height) {
		location = height;
		document.getElementById(item).style.top = location + "px";
		console.log("up than");
	} else {
		location -= distance;
		document.getElementById(item).style.top = location + "px";
		console.log("up else");
	}
	
	return location;
	console.log(location);
};

/****************************************************************************************

****************************************************************************************/
function item_scroll_right (item) {
	
	if ((horizontalIndex - 1) >= 0) {
		horizontalIndex-=1;
		document.getElementById(item).style.left = -(horizontalIndex * 162) + "px";
		document.getElementById('headerText').innerHTML = headerTexts[horizontalIndex];
		if (footerDisplay[horizontalIndex]) {
			document.getElementById('footerBox').style.bottom = "-5px";
		} else {
			document.getElementById('footerBox').style.bottom = "-50px";
		}
	} else {
		parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'No Right Swipe' + ' : ' + 'Miss']);
	}
	
	
};

/****************************************************************************************

****************************************************************************************/
function item_scroll_left (item) {
	
	if ((horizontalIndex + 1) < sectionTotal) {
		horizontalIndex += 1;
		document.getElementById(item).style.left = -(horizontalIndex * 162) + "px";
		document.getElementById('headerText').innerHTML = headerTexts[horizontalIndex];
		if (footerDisplay[horizontalIndex]) {
			document.getElementById('footerBox').style.bottom = "-5px";
		} else {
			document.getElementById('footerBox').style.bottom = "-50px";
		}
	} else {
		parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'No Left Swipe' + ' : ' + 'Miss']);
	}
	
	
};


function swipe_left () {
	parent_message(['Log', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Swipe Left' + ' : ' + 'Move']);
	item_scroll_left ('allSections');
	console.log("app swipe left");
	
};

function swipe_right () {
	parent_message(['Log', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Swipe Right' + ' : ' + 'Move']);
	item_scroll_right ('allSections');
	console.log("app swipe right");
};

function swipe_up () {
	parent_message(['Log', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Swipe Up' + ' : ' + 'Move'])
	verticalLoc[horizontalIndex] = item_scroll_up (('slide' + horizontalIndex), verticalLoc[horizontalIndex], verticalDist);
	
	console.log("app swipe up");
};

function swipe_down () {
	parent_message(['Log', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Swipe Down' + ' : ' + 'Move'])
	verticalLoc[horizontalIndex] = item_scroll_down (('slide' + horizontalIndex), verticalLoc[horizontalIndex], verticalDist);
	console.log("app swipe down");
};

function footer_button () {
	switch (currentApp) {
		case "phone":
			parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Footer Button' + ' : ' + 'Miss']);
		  	break;
		case "music":
			parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Footer Button' + ' : ' + 'Miss']);
			break;
		default:
		  	
	}
};

function play_music () {
	parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Play Rick' + ' : ' + 'Miss']);
	document.getElementById('musicPlay').style.opacity = 0;
	document.getElementById('musicPause').style.opacity = 1;
	document.getElementById('musicPlay').style.zIndex = -1;
	document.getElementById('musicPause').style.zIndex = 1;
};

function pause_music () {
	parent_message(['NotI', currentApp + 'App -' + headerTexts[horizontalIndex] + ' : ' + 'Play Rick' + ' : ' + 'Miss']);
	document.getElementById('musicPlay').style.opacity = 1;
	document.getElementById('musicPause').style.opacity = 0;
	document.getElementById('musicPlay').style.zIndex = 1;
	document.getElementById('musicPause').style.zIndex = -1;
};


