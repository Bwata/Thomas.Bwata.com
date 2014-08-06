//message center vars
var mcListLoc = 0;
var mcListDist = 75;

/**********************************************
Message Center Actions 
***********************************************/

function click_message_button () {
	if (screenStack[screenStackIndex] != 'popUp' && runningTask) {
		if (screenStack[screenStackIndex] != "messageCenter" ) {
			console.log("close MC");
			change_screen ("messageCenter");
		} else {
			console.log("open MC");
			change_screen ("messageCenter");
		}
	}
}

function display_message_center () {
	document.getElementById("messageCenter").style.right="5px";
	return true;
};

function hide_message_center () {
	document.getElementById("messageCenter").style.right="-230px";
	return true;
}


/*function display_message_center () {
	if (screenStack[screenStackIndex] == "messageCenter") {
		document.getElementById("messageCenter").style.right="-230px";
		//viewing["messageCenter"] = false;
	} else {
		document.getElementById("messageCenter").style.right="5px";
		//viewing["messageCenter"] = true;
	}
	return true;
};*/

function mcMessage_click () {
	console.log("message clicked");
};

function mc_scroll_down () {
	mcListLoc = item_scroll_down ("mcSlide", mcListLoc, mcListDist);
};

function mc_scroll_up () {
	mcListLoc = item_scroll_up ("mcSlide", mcListLoc, mcListDist);
};
