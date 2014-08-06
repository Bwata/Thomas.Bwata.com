// functions.js
// by Thomas Verstraete
// April 2, 2014
// GVSU CIS-452 Operating Systems
// These are the basic functions that make up the controller of the memory management 
// simulator.

//Array of the Frames in Main Memory
var frames = new Array();

//All current Processes
var processes = new Array();
// 
// //Old Processes
// var oldProcesses = new Array();

//number of Frames in Main Memory
var frameMax = 8;

//list of Empty Frames
var emptyFrame = new Array();

//standard Page/Frame size
var PAGE_SIZE = 512;

//creates the initial empty frame array
for (var i = 0; i < frameMax; i++) {
	emptyFrame.push(i);
} //use emptyFrame.shift() to get FILO

//array of colors to be used for the processes
var colors = ['#f14360', '#d33dd5', '#5161fa', '#2ed5d7','#55d13d','#f8f24f','#f2b627'];


//runs the next command and performs all the necessary operations
function runNextCommand() {

	//checks if we have begun the program or not
	if (curCommand > -1) {
		//unhighlight the command that just ran
		document.getElementsByClassName("curComm")[0].className = "";
	
		//check if there is a next command, increment if there is
		if (curCommand < maxCommand-1) {
			curCommand++;
		}
	
		//auto scroll the command list to keep current command in focus
		document.getElementById('comBox').scrollTop = (curCommand*20);
	
		//highlight the next command or this command if last
		var comms = document.getElementById('comm' + curCommand);
		comms.className = "curComm";
	} else {
		curCommand = 0;
		
		document.getElementById('comBox').scrollTop = (curCommand*20);
	
		//highlight the next command or this command if last
		var comms = document.getElementById('comm' + curCommand);
		comms.className = "curComm";
	}


	//check if there is a next command
	if (curCommand < maxCommand) {
		//there is a command to perform

		//gets the command from the HTML list and splits it
		var runCommNode = document.getElementById('comm' + curCommand);
		var runComm = runCommNode.innerHTML;
		var runCommParts = runComm.split(" ");
		
		//check for command type
		if (runCommParts.length == 3) {
			//the command is a new process
			
			//find the process with PID runCommParts[0] if it exists.
 			var newProc;

			
			if(newProc = findPID){			
				//create new process
				var newProc = new Process(runCommParts[0], runCommParts[1], runCommParts[2]);
				processes.push(newProc);
			}
			
			displayProcess(newProc);
			
			//increments the command colors
			var oldColor = colors.shift();
			colors.push(oldColor);
		} else {
			//Halt process
			
			//find the process with PID runCommParts[0]
			var procToRemove;
			procToRemove = findPID(runCommParts[0]);
			
			//remove that process from the view
			undisplayProcess(procToRemove);
		}
	}
};

//undoes the previous command and performs all the necessary operations
function runPrevCommand() {
	
	//check if the current command is the first command: true if it isn't
	if (curCommand > -1) {
		
		//gets the command from the HTML list and splits it
		var runCommNode = document.getElementById('comm' + curCommand);
		var runComm = runCommNode.innerHTML;
		var runCommParts = runComm.split(" ");
		
		if (runCommParts.length == 3) {
			//the command was a new process
			//remove the process from the display
			
			//find the process with PID runCommParts[0]
			var procToRemove;
			procToRemove = findPID(runCommParts[0]);
			undisplayProcess(procToRemove);
		
		} else {
			//it was a halt command, need to redisplay process
		
			//find the process with PID runCommParts[0]
			var procToReturn;
			procToReturn = findPID(runCommParts[0]);
			displayProcess(procToReturn);

			//increments the command colors
			var oldColor = colors.shift();
			colors.push(oldColor);
		}
			
	
		//unhighlight the command that just ran
		document.getElementsByClassName("curComm")[0].className = "";

		//decrement command
		curCommand--;
		
		document.getElementById('comBox').scrollTop = (curCommand*20);
		
		//highlight the next command or this command if last
		var comms = document.getElementById('comm' + curCommand);
		comms.className = "curComm";
	}
};


//Finds the process with PID of idNum.
function findPID(idNum) {
	//find the process with PID runCommParts[0] if it exists.
	var newProc;
	for (var key in processes) {
		if (processes[key].processID == idNum) {
			newProc = processes[key];
		}
	}
	
	return newProc;
};

//Removes the given process from the display.
function undisplayProcess(procToRemove) {
	//remove the pages from the frame DOM
	for (var key in procToRemove.pageTable) {
		var fNum = procToRemove.pageTable[key].frameNum;
		var frame = document.getElementById("frame" + fNum);
		frame.innerHTML = "<p>empty</p>";
		frame.parentNode.style.backgroundColor = 'transparent';
		//put now empty frames into the emptyFrame queue
		emptyFrame.push(fNum);
	}
	
	//remove process from process DOM
	var nodeToRemove;
	var procNodes = document.getElementsByClassName('proc');
	for (var key in procNodes) {
		var node = procNodes[key];
		if (node.innerHTML.search("PID: " + procToRemove.processID) != -1) {
			(node.parentNode).removeChild(node);
			break;
		}
	}
};

//takes the given process and displays it in the process box and the frames
function displayProcess(process) {

	//display process in procBox
	var procBox = document.getElementById('procBox');
	var lastNode = procBox.lastChild;
	procBox.insertBefore(buildProcessElement(process), lastNode);

	//insert pages into frames
	for (var key in process.pageTable) {
		var frame = document.getElementById("frame" + process.pageTable[key].frameNum);
		frame.innerHTML = "";
		frame.appendChild(buildFrameElement(process.pageTable[key]));
		frame.parentNode.style.backgroundColor = colors[0];
	}
};

//creates DOM node to display the given process' information
function buildProcessElement(process) {

	var mainBox = createElement('div', null, null, 'proc');
	mainBox.style.borderColor = colors[0];
	var titlebox = createElement('h5', 'PID: ' + process.processID, null, 'title');
	titlebox.style.backgroundColor = colors[0];
	mainBox.appendChild(titlebox);
	var sizeBox = createElement('div', null, null, 'procInfo');
	sizeBox.appendChild(createElement('h6', 'Text: ' + process.textSize, null, 'text'));
	sizeBox.appendChild(createElement('h6', 'Data: ' + process.dataSize, null, 'data'));
	mainBox.appendChild(sizeBox);

	//build the page table
	mainBox.appendChild(createElement('h6', 'Page Table', null, 'title'));
	var tableBox = createElement('div', null, null, 'procPageTable');
	
	//page table header
	var line;
	tableBox.appendChild(line = createElement('div', null, null, 'title'));
	line.appendChild(createElement('h6', 'Page', null, 'title'));
	line.appendChild(createElement('h6', 'Frame', null, 'title'));
	line.appendChild(createElement('h6', 'Bytes', null, 'title'));

	//builds the info in the page table
	for (var key in (process.pageTable)) {
		tableBox.appendChild(buildPageElement(process.pageTable[key]));
		tableBox.appendChild(createElement('div', null,null,'clear'));
	}
	
	mainBox.appendChild(tableBox);
	
	return mainBox;
}

//builds a single line for the page table from the given page
function buildPageElement(page) {
	var line = createElement('div', null, null, page.pageType);
	line.appendChild(createElement('h6', "" + page.pageNum, null, null));
	line.appendChild(createElement('h6', "" + page.frameNum, null, null));
	line.appendChild(createElement('h6', "" + page.dataSize, null, null));
	line.appendChild(createElement('div', null, null, 'clear'));
	return line;
}

//builds a single line for the frame from the given page
function buildFrameElement (page) {
	var line = createElement('div', null, null, null);
	if (page.pageType == 'text') {
		line.style.backgroundColor = '#DE8181';
	} else {
		line.style.backgroundColor = '#8C89D6';
	}

	line.appendChild(createElement('h6', "PID: " + page.procID, null, null));
	line.appendChild(createElement('h6', "Page: " + page.pageNum, null, null));
	line.appendChild(createElement('h6', "Bytes: " + page.dataSize, null, null));
	line.appendChild(createElement('div', null, null, 'clear'));
	return line;
}


//Helper Function to create a DOM node element
function createElement (type, contents, idVal, classVal) {
	
	var elem = document.createElement(type);
	
	if (contents != null) {
		if (typeof contents == 'string' || contents instanceof String) {
			elem.innerHTML = contents;
		} else {
			//elem.appendChild(contents);
		}
	}
	
	if (idVal != null) {
		elem.id = idVal;
	}
	
	if (classVal != null) {
		elem.className += elem.className ? ' '+classVal : classVal;
	}
	
	return elem;
};