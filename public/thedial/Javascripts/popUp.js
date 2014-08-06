var popUpAction;





function display_popup (text, topOption, bottomOption, action, location) {
	if (Math.abs(location) < 220) {
		screenStackIndex++;
		screenStack[screenStackIndex] = "popUp";
		document.getElementById("popUpBodyText").innerHTML = text;
		document.getElementById("popUpTopText").innerHTML = topOption;
		document.getElementById("popUpBotText").innerHTML = bottomOption;
		popUpAction = action;
		
		document.getElementById("popUpWindow").style.top= location + "px";
	} else {
		screenStackIndex--;
		document.getElementById("popUpBodyText").innerHTML = text;
		document.getElementById("popUpTopText").innerHTML = topOption;
		document.getElementById("popUpBotText").innerHTML = bottomOption;
		popUpAction = action;
		document.getElementById("popUpWindow").style.top= location + "px";
		
	}
};

function change_text (text, topOption, bottomOption, action) {
	document.getElementById("popUpBodyText").innerHTML = text;
		document.getElementById("popUpTopText").innerHTML = topOption;
		document.getElementById("popUpBotText").innerHTML = bottomOption;
		popUpAction = action;
};

function popUp_swipe_up() {
	popUp_accept_action ();
};


function popUp_swipe_down () {
	tester_log('PopUp-' + popUpAction + ' : swipe down : Move');
	display_popup('', '', '', '', 230);
};

function popUp_accept_action () {
	
	switch (popUpAction) {
		case "CallMom":
			tester_log('PopUp-' + popUpAction + ' : swipe Up to call Mother : Hit');
			change_text ('Calling Mother', 'Options', 'End', 'InCall');
		  	break;
		case "InCall":
			messages_pass (['NotI', 'PopUp-InCall : Swipe for Options : Miss']);
			break;
		case "TextTest":
			change_text ('Message Sent', 'Send Another', 'End', 'NotI');
			
			break;
		case "NotI":
			messages_pass (['NotI', 'PopUp-InCall : Swipe for Options : Miss']);
			break;
		case "Log":
			break;
		default:
		  	
	}

};