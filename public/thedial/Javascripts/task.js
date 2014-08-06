var taskTextWords = ['Thank you for volunteering for our usability study. Today we are testing a new smart watch interface. This is a high fidelity prototype of our interface to see how users, such as yourself,  will interact with the new product. We are going to attempt to run through five tasks but as time is a factor we will do as much as we can. While performing these tasks we ask that you think aloud what you are doing and what you see.  If at anytime throughout this test you feel lost please let us know as this means there is a problem with the design. Before we design the hardware we would like to test out the user interface. We ask that you imagine performing these actions on a wrist watch. You can see that there are green arrowns on the right side of The Dial.  These are used to press the side buttons that would be on the actual watch. Do you have any questions before we begin?', 
'Imagine you are given this smart watch from a friend who wants you to take a look at the new smart watch. You grab it and notice the round screen. You also see that there is a dial on the side similar to a regular watch. Take a few minutes to explore the product. There is no goal except to help gain familiarity with our interface. Again please think aloud what you are doing and seeing.', 
'You are in the middle of a meeting and notice you have a text message from a friend. Since you are in a meeting you will have to reply later.  Dismiss the notification so you can reply after your meeting. Then some time passes and you now reply to the message.', 
'You missed a call from your mother earlier today; call her back.', 
'You are sitting around and you get a song stuck in your head. The song is “Never gonna give you up” in the album “Whenever you need somebody.” Use the watch to play that awesome song.', 
'You are getting home after riding your bike. You need to stop your fitness app from recording your workout. Stop the recording and check out the stats of your fitness regimen.'];

var runningTask = false;
var taskTime;
var taskNumber = 0;





function task_button_click(taskNum) {
	if (!runningTask) {
		
		document.getElementById("taskText").innerHTML = taskTextWords[taskNum];
		reset ();
		taskNumber = taskNum;
		console.log("Task is viewed: " + taskNum);
		switch (taskNum) {
			case 0:				
				document.getElementById("taskStart").style.opacity = .5;
				document.getElementById("taskStop").style.opacity = .5;
				break;
			case 1: 
				testNum = 'test 1';
				document.getElementById("taskStop").style.opacity = .5;
				document.getElementById("taskStart").style.opacity = 1;
				break;
			case 2: 
				testNum = 'test 2';
				document.getElementById("taskStop").style.opacity = .5;
				document.getElementById("taskStart").style.opacity = 1;
				break;
			case 3: 
				testNum = 'test 3';
				document.getElementById("taskStop").style.opacity = .5;
				document.getElementById("taskStart").style.opacity = 1;
				break;
			case 4: 
				testNum = 'test 4';
				document.getElementById("taskStop").style.opacity = .5;
				document.getElementById("taskStart").style.opacity = 1;
				break;
			case 5: 
				testNum = 'test 5';
				document.getElementById("taskStop").style.opacity = .5;
				document.getElementById("taskStart").style.opacity = 1;
				break;
			default: 
	
				break;
		}
	}
};

function start_task () {//taskStart
	if (runningTask) {
	} else {
		tester_log ("START TEST ******************************");
		runningTask = true;
		taskTime = new Date();

		document.getElementById("taskStart").style.opacity = .5;
		document.getElementById("testInfoBox").style.opacity = .4;
		document.getElementById("taskStop").style.opacity = 1;
		
		if (taskNumber == 2) {
			messages_pass(['popUp', 'Do you like theDial?', 'To Jarvis', 'Cancel', 'TextTest']);
		}
	}
};

function stop_task () {
	if (runningTask) {
		tester_log ("STOP TEST ****" + (new Date()-taskTime).toString() + "****");
		runningTask = false;
		document.getElementById("taskStart").style.opacity = 1;
		document.getElementById("testInfoBox").style.opacity = 1;
		document.getElementById("taskStop").style.opacity = .5;
	} else {
		
	}

};