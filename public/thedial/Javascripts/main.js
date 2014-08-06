var myHash = {};
myHash['mcSlide'] = 0;


//States
messageCenterView = false;
appView = false;
switcherView = false;
lockScreenView = true;

//swipe reading
var startX;
var startY;
var endX;
var endY;

//App Switcher
//find center then subtract to get min
//then add to get max
var switcherIconLoc = -242;
var switcherControlLoc = -1100;
var switcherIconMax = -626;
var switcherControlMax = -2420;
var switcherIconMin = 78;
var switcherControlMin = 0;

//message center vars
//var mcListLoc = 0;
var mcListDist = 75;

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

//Attach the swipe listeners to the watch face
var watchface = document.getElementById('watchface');
watchface.addEventListener('touchstart', startingSwipe, false);
watchface.addEventListener('touchend', endingSwipe, false);


/**********************************************
Reads the swipes for the actions

***********************************************/
function startingSwipe (event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    
    startX = touch.screenX;
    startY = touch.screenY;
  }
};

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
};

//app -> switcher -> lockscreen
function click_dial_button () {
	if (!messageCenterView) {
		if (appView) {
			console.log("close app");
			//function to return to switcher
			//appView = false;
		} else if (switcherView) {
			document.getElementById("switcher").style.top="-230px";
			document.getElementById("lockDots").style.opacity="1";
			lockScreenView = true;
			switcherView = false;
			console.log("close switcher");
		} else {
			console.log("in lockscreen");
		}
	}
};


function item_scroll_down (item) {
	console.log(item);

	var height = -document.getElementById(item).offsetHeight;

	if ((myHash[item] + mcListDist) >= 0) {
		myHash[item] = 0;
		document.getElementById(item).style.top= myHash[item] + "px";
	} else {
		myHash[item] += mcListDist;
		document.getElementById(item).style.top= myHash[item] + "px";
	}
	
	console.log(myHash[item]);
};

function item_scroll_up (item) {
	console.log(item);
	var height = document.getElementById(item).offsetHeight;
	if (height > 220) {
		height -= 220;
	}
	
	height = -height;
	

	if ((myHash[item] - mcListDist) < height) {
		myHash[item] = height;
		document.getElementById(item).style.top = myHash[item] + "px";
	} else {
		myHash[item] -= mcListDist;
		document.getElementById(item).style.top = myHash[item] + "px";
	}
	
	console.log(myHash[item]);
};

/************************************************************
The controller associated with swipes

hierarchy
message center
app
app switcher
lock screen
************************************************************/
function swipe_left () {
	if (messageCenterView) {
		
	} else if (appView) {
	
	} else if (switcherView) {
		swipe_switcher_left();
	} else if (lockScreenView) {
		lock_swipe_left ();
	} else {
	
	}
};

function swipe_right () {
	if (messageCenterView) {
	
	} else if (appView) {
	
	} else if (switcherView) {
		swipe_switcher_right();
	} else if (lockScreenView) {
		lock_swipe_right ();
	} else {
	
	}
};

function swipe_up () {
	if (messageCenterView) {
		item_scroll_up ('mcSlide');
	} else if (appView) {
	
	} else if (switcherView) {
	
	} else if (lockScreenView) {
		lock_swipe_up ();
	} else {
	
	}
};

function swipe_down () {
	if (messageCenterView) {
		item_scroll_down ('mcSlide');
	} else if (appView) {
	
	} else if (switcherView) {
	
	} else if (lockScreenView) {
		lock_swipe_down ();
	} else {
	
	}
};

/**********************************************
Lock Screen Actions 

***********************************************/

function lock_swipe_left () {
	document.getElementById("camera").style.right="5px";
	document.getElementById("lockDots").style.opacity="0";
	lockScreenView = false;
	appView = true;
};

function lock_swipe_right () {
	document.getElementById("fitness").style.left="5px";
	document.getElementById("lockDots").style.opacity="0";
	lockScreenView = false;
	appView = true;
};

function lock_swipe_up () {
	document.getElementById("text").style.bottom="5px";
	document.getElementById("lockDots").style.opacity="0";
	lockScreenView = false;
	appView = true;
};

function lock_swipe_down () {
	document.getElementById("switcher").style.top="5px";
	document.getElementById("lockDots").style.opacity="0";
	lockScreenView = false;
	switcherView = true;
};


/**********************************************
Message Center Actions 
***********************************************/

function click_message_button () {
	if (messageCenterView) {
		console.log("close MC");
		show_message_center ();
	} else {
		console.log("open MC");
		show_message_center ();
	}
}

function show_message_center () {
	if (messageCenterView) {
		document.getElementById("messageCenter").style.right="-230px";
		document.getElementById("switcher").style.opacity="1";
		if (lockScreenView) {
			document.getElementById("lockDots").style.opacity="1";
		}
		messageCenterView = false;
	} else {
		document.getElementById("messageCenter").style.right="5px";
		document.getElementById("switcher").style.opacity="0";
		document.getElementById("lockDots").style.opacity="0";
		messageCenterView = true;
	}
};

function mcMessage_click () {
	console.log("message clicked");
};

function mc_scroll_down () {

	var height = -document.getElementById("mcSlide").offsetHeight;

	if ((mcListLoc + mcListDist) >= 0) {
		mcListLoc = 0;
		document.getElementById("mcSlide").style.top= mcListLoc + "px";
	} else {
		mcListLoc += mcListDist;
		document.getElementById("mcSlide").style.top= mcListLoc + "px";
	}
};

function mc_scroll_up () {
	var height = document.getElementById("mcSlide").offsetHeight;
	if (height > 220) {
		height -= 220;
	}
	
	height = -height;
	

	if ((mcListLoc - mcListDist) < height) {
		mcListLoc = height;
		document.getElementById("mcSlide").style.top = mcListLoc + "px";
	} else {
		mcListLoc -= mcListDist;
		document.getElementById("mcSlide").style.top = mcListLoc + "px";
	}
};

/*** Switcher Actions Controller *************************************/

function swipe_switcher_left () { // subract

	if ((switcherIconLoc - 64) >= switcherIconMax) {
		switcherIconLoc -= 64;
		document.getElementById("switcherIconSlide").style.left=switcherIconLoc + "px";
	}
	
	if ((switcherControlLoc - 220) >= switcherControlMax) {
		switcherControlLoc -= 220;
		document.getElementById("switcherControlSlide").style.left=switcherControlLoc + "px";
	}
};

function swipe_switcher_right () { //add
	
	if ((switcherIconLoc + 64) <= switcherIconMin) {
		switcherIconLoc += 64;
		document.getElementById("switcherIconSlide").style.left=switcherIconLoc + "px";
	}
	
	if ((switcherControlLoc + 220) <= switcherControlMin) {
		switcherControlLoc += 220;
		document.getElementById("switcherControlSlide").style.left=switcherControlLoc + "px";
	}
	
};





