//App Switcher
//find center then subtract to get min
//then add to get max
var switcherIconLoc = -242;
var switcherControlLoc = -1100;
var switcherIconMax = -626;
var switcherControlMax = -2420;
var switcherIconMin = 78;
var switcherControlMin = 0;

var switcherDisplay = false;
var switcherVisable = true;
var appDisplay = false;
var appVisable = true;

var switchSlideDist = 75;

var switcherLoc = ['calendar', 'vidCall', 'pictures', 'camera', 'mail', 'phone', 'text', 'music', 'fitness', 'weather', 'alarm', 'settings'];
var switcherIndex = 5;

var slideLoc = {};
slideLoc['phone'] = 0;
slideLoc['text'] = 0;
slideLoc['vidCall'] = 0;
slideLoc['calendar'] = 0;
slideLoc['pictures'] = 0;
slideLoc['mail'] = 0;
slideLoc['weather'] = 0;
slideLoc['alarm'] = 0;

/*** Switcher Actions Controller *************************************/

/*function display_switcher () {
	if (switcherDisplay) {
		switcherDisplay = false;
		document.getElementById("switcher").style.top="-230px";
		tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplaySwitcher Hide : Move');
	} else {
		switcherDisplay = true;
		document.getElementById("switcher").style.top="5px";
		tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplaySwitcher Show : Move');
	}
	
	return true;
};*/

function display_switcher () {
	document.getElementById("switcher").style.top="5px";
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplaySwitcher Show : Move');
};

function hide_switcher () {
	document.getElementById("switcher").style.top="-230px";
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplaySwitcher Hide : Move');
};

/*function see_switcher () {
	if (switcherVisable == 1) {
		console.log("hide switcher");
		document.getElementById("switcher").style.opacity = 0;
		switcherVisable = 0;
	} else {
		if (viewing["switcher"]) {
			console.log("show switcher");
			document.getElementById("switcher").style.opacity = 1;
			switcherVisable = 1;
		}
	}
};*/

function swipe_switcher_left () { // subtract

	if ((switcherIconLoc - 64) >= switcherIconMax) {
		switcherIconLoc -= 64;
		document.getElementById("switcherIconSlide").style.left=switcherIconLoc + "px";
	}
	
	if ((switcherControlLoc - 220) >= switcherControlMax) {
		switcherControlLoc -= 220;
		document.getElementById("switcherControlSlide").style.left=switcherControlLoc + "px";
	}
	
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : Move left : Move');
	switcherIndex++;
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
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : Move Right : Move');
	switcherIndex--;
	
};

function swipe_switcher_up () {
	slideLoc[switcherLoc[switcherIndex]] = item_scroll_up ((switcherLoc[switcherIndex] + 'Slide'), slideLoc[switcherLoc[switcherIndex]], switchSlideDist);
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : Move up : Move');
};

function swipe_switcher_down () {
	slideLoc[switcherLoc[switcherIndex]] = item_scroll_down ((switcherLoc[switcherIndex] + 'Slide'), slideLoc[switcherLoc[switcherIndex]], switchSlideDist);
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : Move down : Move');
};

function hide_app () {
	document.getElementById(switcherLoc[switcherIndex] + 'App').style.top="230px";
	tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplayApp hide : Move');
	return true;
};

function display_app () {
	if (document.getElementById(switcherLoc[switcherIndex] + 'App') != null) {
			document.getElementById(switcherLoc[switcherIndex] + 'App').style.top="5px";
			tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplayApp show : Move');
			return true;
		} else { 
			user_message('The ' + switcherLoc[switcherIndex] + ' App is not developed at this time');
			tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : app Icon Press : Miss');
			return false;
		}
};

function hide_direct_app (screen) {
	console.log(screen);
	document.getElementById(screen).style.top="230px";
	tester_log(screen + ' : DirectDisplayApp show : Move');
	return true;
};

function display_direct_app (screen) {
	if (document.getElementById(screen) != null) {
		document.getElementById(screen).style.top="5px";
		tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplayApp show : Move');
		return true;
	} else { 
		user_message('The ' + switcherLoc[switcherIndex] + ' App is not developed at this time');
		tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : app Icon Press : Miss');
		return false;
	}
};


/*function display_app () {
	if (appVisable) {
		appVisable = false;
		document.getElementById(switcherLoc[switcherIndex] + 'App').style.top="230px";
		tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplayApp hide : Move');
		return true;
	} else {
		if (document.getElementById(switcherLoc[switcherIndex] + 'App') != null) {
			document.getElementById(switcherLoc[switcherIndex] + 'App').style.top="5px";
			tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : DisplayApp show : Move');
			appVisable = true;
			return true;
		} else { 
			user_message('The ' + switcherLoc[switcherIndex] + ' App is not developed at this time');
			tester_log('Switcher-' + switcherLoc[switcherIndex] + ' : app Icon Press : Miss');
			return false;
		}
	}

};

function display_direct_app(screen) {
	
	if (appDisplay) {
		appDisplay = false;
		document.getElementById(screen).style.top="230px";
		tester_log('Switcher-' + screen + ' : DisplayApp hide : Move');
		return true;
	} else {
		if (document.getElementById(screen) != null) {
			document.getElementById(screen).style.top="5px";
			tester_log('Switcher-' + screen + ' : DisplayApp show : Move');
			appDisplay = true;
			return true;
		} else { 
			user_message('The ' + screen + ' App is not developed at this time');
			tester_log('Switcher-' + screen + ' : app Icon Press : Miss');
			return false;
		}
	}
};*/

