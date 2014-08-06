// process.js
// by Thomas Verstraete
// April 2, 2014
// GVSU CIS-452 Operating Systems
// These are the two objects that represent the data (model) in the memory management
// simulator.

//object that represents the process
function Process (num, txtSize, dtaSize) {
	
	//the process number
	this.processID = num;
	
	//total size of text for this process
	this.textSize = txtSize;
	
	//total size of data for this process
	this.dataSize = dtaSize;
	
	//page table of all pages, text and data
	this.pageTable = new Array();
	
	//loop to create the page table info for text
	var i = 0;
	for (; txtSize > PAGE_SIZE; i++) {
		this.pageTable.push(new Page(this.processID, 'text', i, emptyFrame.shift(), PAGE_SIZE));
		txtSize = txtSize - PAGE_SIZE;
	}
	this.pageTable.push(new Page(this.processID, 'text', i, emptyFrame.shift(), txtSize));
	i=0;
	
	//loop to create the page table info for data
	for (; dtaSize > PAGE_SIZE; i++) {
		this.pageTable.push(new Page(this.processID, 'data', i, emptyFrame.shift(), PAGE_SIZE));
		dtaSize = dtaSize - PAGE_SIZE;
	}
	this.pageTable.push(new Page(this.processID, 'data', i, emptyFrame.shift(), dtaSize));
}

//Object that Represents the page/frame information.
function Page (procID, type, pageNum, frameNum, dataSize) {

	//the process this page is associated with
	this.procID = procID;

	//the type of information this page table entry represents
	this.pageType = type;
	
	//The page number for page
	this.pageNum = pageNum;
	
	//The frame number for this page
	//console.log("P72: " + frameNum);
	this.frameNum = frameNum;
	
	//The size of data this page holds
	this.dataSize = dataSize;
}