//States 
/*var viewing = {}
viewing ['messageCenter'] = false;
viewing ['popUp'] = false;
viewing ['lockScreen'] = true;
viewing ['switcher'] = false;
viewing ['appView'] = false;
viewing ['fitnessApp'] = false;
viewing ['textApp'] = false;
viewing ['cameraApp'] = false;
viewing ['phoneApp'] = false;
viewing ['alarmApp'] = false;*/
var currentView = 'lockScreen';

var screenStack = ['lockScreen'];
var screenStackIndex = 0;

//messageCenterView = false;
//appView = false;
//switcherView = false;
//lockScreenView = true;

//swipe reading
var startX;
var startY;
var endX;
var endY;

var testNum = "Test 0";
var tester = "User"; 



/****************************************************************************************
The actions on load that need to be taken care of to set up the "Application"
****************************************************************************************/

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

//Attach the swipe listeners to the watch face
var watchface = document.getElementById('watchface');
watchface.addEventListener('touchstart', startingSwipe, false);
watchface.addEventListener('touchend', endingSwipe, false);

//console.log('window height: ' + window.innerHeight);
//console.log('window width: ' + window.innerWidth);

/****************************************************************************************
message format

****************************************************************************************/

window.addEventListener("message", function(event) {

	messages_pass (event.data);

    
});


/****************************************************************************************


****************************************************************************************/
function messages_pass (message) {
	

	switch (message[0]) {
		case "user_message":
			user_message(message[1]);
		  	break;
		case "popUp":
			display_popup (message[1], message[2], message[3], message[4], 25);
			break;
		case "musicRick":
			play_rick(message[1]);
			break;
		case "music":
			play_music();
			break;
		case "NotI":
			user_message("Functionality not a part of the test");
			tester_log (message[1]);
			break;
		case "NotIMore":
			user_message(message[2]);
			tester_log (message[1]);
			break;
		case "Log":
			tester_log (message[1]);
			break;
		default:
		  	
	}
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
    if (runningTask) {
		if (longDist > 120 && shortDist < 50) {
			if (Math.abs(distX) > Math.abs(distY)) {
				if (distX > 0) {						//RIGHT Swipe
					swipe_right();
				} else {								//LEFT Swipe
					swipe_left();
				}
			} else {
				if (distY > 0) {						//DOWN Swipe
					swipe_down();
				} else { 								//UP Swipe
					swipe_up();
				}
			}
		}
	} else {
		user_message("Please press play to start test");
	}
};


/****************************************************************************************

****************************************************************************************/
//app -> switcher -> lockscreen
function click_dial_button () {

	if (runningTask) {

	switch(screenStack[screenStackIndex]) {
		case "lockScreen":
		  	change_screen("switcher");
		  	break;
		case "popUp":
		  	popUp_swipe_down();
		  	break;
		case "messageCenter":
			change_screen("messageCenter");
			break;
		default:
			change_screen(screenStack[screenStackIndex]);
	}
	}
};

/****************************************************************************************

****************************************************************************************/
function app_button () {
	
	change_screen(switcherLoc[switcherIndex] + 'App');
	//console.log('current app: ' + switcherLoc[switcherIndex]);
};


/****************************************************************************************
userMessagesText
****************************************************************************************/
function user_message (message) {
	document.getElementById("userMessagesText").innerHTML = message;
};

/****************************************************************************************
Log Message format: User, Test, Location, Event, Miss/Hit
****************************************************************************************/
function tester_log (message) {
	console.log('tester log: ' + new Date().toString() + ' : ' + tester + ' : ' + testNum + ' : ' + message);
}

/************************************************************
The controller associated with swipes

hierarchy
message center
app
app switcher
lock screen
************************************************************/
/****************************************************************************************

****************************************************************************************/
function swipe_left () {

	switch (screenStack[screenStackIndex]) {
		case "messageCenter":
			
			break;
		case "popUp":
		
			break;
		case "lockScreen":
			lock_swipe_left ();
			break;
		case "switcher":
			swipe_switcher_left();
			break;
		default:
			//document.getElementById(switcherLoc[switcherIndex] + 'App').contentWindow.swipe_left();
		
	}
};


/****************************************************************************************

****************************************************************************************/
function swipe_right () {


	switch (screenStack[screenStackIndex]) {
		case "messageCenter":
			
			break;
		case "popUp":
		
			break;
		case "lockScreen":
			lock_swipe_right ();
			break;
		case "switcher":
			swipe_switcher_right();
			break;
		default:
			//document.getElementById(switcherLoc[switcherIndex] + 'App').contentWindow.swipe_right();
		
	}

};


/****************************************************************************************

****************************************************************************************/
function swipe_up () {

	switch (screenStack[screenStackIndex]) {
		case "messageCenter":
			mc_scroll_up();
			break;
		case "popUp":
			popUp_swipe_up();
			break;
		case "lockScreen":
			lock_swipe_up ();
			break;
		case "switcher":
			swipe_switcher_up();
			break;
		default:
			//document.getElementById(switcherLoc[switcherIndex] + 'App').contentWindow.swipe_left();
		
	}
};


/****************************************************************************************

****************************************************************************************/
function swipe_down () {

	switch (screenStack[screenStackIndex]) {
		case "messageCenter":
			mc_scroll_down();
			break;
		case "popUp":
			console.log("popUp swipe down");
			popUp_swipe_down();
			break;
		case "lockScreen":
			lock_swipe_down ();
			break;
		case "switcher":
			swipe_switcher_down();
			break;
		default:
			//document.getElementById(switcherLoc[switcherIndex] + 'App').contentWindow.swipe_down();
		
	}
};

/****************************************************************************************
Int screen values
MessageCenter = 0
LockScreen = 1
AppSwitcher = 2
App = 3
****************************************************************************************/
function change_screen (changeTo) {

	console.log("change screen from:" + screenStack[screenStackIndex] + " to: " + changeTo);
	
	if (changeTo == screenStack[screenStackIndex]) {
		hide_screen(changeTo);
		screenStackIndex--;
		document.getElementById(screenStack[screenStackIndex]).style.opacity = 1;
	} else {
		document.getElementById(screenStack[screenStackIndex]).style.opacity = 0;
		display_screen(changeTo);
		screenStackIndex++;
		screenStack[screenStackIndex] = changeTo;
	}
};

/****************************************************************************************

****************************************************************************************/

function display_screen(screen) {
	var valid = false;
	
	switch(screen) {
		case "lockScreen":
		  	//valid = display_lockscreen();
		  	break;
		case "switcher":
		  	valid = display_switcher();
		  	break;
		case "messageCenter":
			valid = display_message_center();
			break;
		default:
		  	valid = display_direct_app(screen);
	}
	return valid;
};

/****************************************************************************************

****************************************************************************************/

function hide_screen(screen) {
	var valid = false;
	
	switch(screen) {
		case "lockScreen":
		  	//valid = display_lockscreen();
		  	break;
		case "switcher":
		  	valid = hide_switcher();
		  	break;
		case "messageCenter":
			valid = hide_message_center();
			break;
		default:
		  	valid = hide_direct_app(screen);
	}
	return valid;
};



/****************************************************************************************

****************************************************************************************/
function item_scroll_down (item, location, distance) {
	console.log(item);

	var height = -document.getElementById(item).offsetHeight;

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
	var height = document.getElementById(item).offsetHeight;
	if (height > 220) {
		height -= 220;
	}
	
	height = -height;
	
	console.log(distance);
	console.log(location);

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


function testClick (test) {
	console.log(test);
};

function reset () {
	for (var i = screenStackIndex; i >0; i--) {
		if (screenStack[i] == "popUp") {
			display_popup('', '', '', '', 230);
		} else {
			change_screen (screenStack[i]);
		}
	}
	

	
};

console.log("loaded");