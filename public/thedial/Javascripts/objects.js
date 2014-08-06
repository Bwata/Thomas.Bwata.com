
/*
This is the main app screen section. 

names are phoneApp, textApp, fitnessApp...
*/
function app (name, xLoc, yLoc, hidden) {
	this.name = name;
	this.xLoc = xLoc;
	this.yLoc = yLoc;
	this.hidden = hidden;
	
	this.move = move;
	function move (xVal, yVal) {
		this.xLoc = xVal;
		this.yLoc = yVal;
	}
};