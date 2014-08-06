var currentIcon = 0;
var totalIcons = 4;
var colors = ["#ff3333", "#33d1ff", "#ffc833", "#d85aa1", "#35e739"];

function showSection (num) {
	
	changeIcon((Math.floor(currentIcon/10)), (Math.floor(num/10)));
	
	
	changeTitle((Math.floor(currentIcon/10)), (Math.floor(num/10)));
    
	document.getElementById("bod" + currentIcon).style.opacity = "0";
	document.getElementById("bod" + currentIcon).style.zIndex = "0";
	document.getElementById("bod").style.borderColor = colors[(Math.floor(num/10))];
	document.getElementById("titlebar").style.backgroundColor = colors[(Math.floor(num/10))];
	document.getElementById("bodyArea").style.height = (document.getElementById("bod" + num).offsetHeight) + "px";
	document.getElementById("bod" + num).style.opacity = "1";
	document.getElementById("bod" + num).style.zIndex = "3";
	
	currentIcon = num;
};

function showSubSection (oldSub, newSub) {
	document.getElementById("bod" + oldSub).style.opacity = "0";
	document.getElementById("bod" + newSub).style.opacity = "1";
	
	
	document.getElementById("bodyArea").style.height = (document.getElementById("bod" + newSub).offsetHeight) + "px";
	
	document.getElementById("bod" + oldSub).style.zIndex = "0";
	document.getElementById("bod" + newSub).style.zIndex = "1";
	currentIcon = newSub;
};

function changeTitle (oldNum, newNum) {
		document.getElementById("title" + oldNum).style.transform = 'rotateX(90deg)';
		document.getElementById("title" + oldNum).style.webkitTransform = 'rotateX(90deg)';
		setTimeout(function(){
			document.getElementById("title" + newNum).style.transform = 'rotateX(0deg)';
			document.getElementById("title" + newNum).style.webkitTransform = 'rotateX(0deg)';
		}, 200);
};

function test () {
	console.log("test");
};

function changeIcon (oldNum, newNum) {

	//change old icons
	changeIconSize(oldNum, 50, 40);
	if (oldNum != 0) {
		changeIconSize((oldNum - 1), 50, 40);
	}
	if (oldNum != totalIcons) {
		changeIconSize((oldNum + 1), 50, 40);
	}
	
	//change new icons
	changeIconSize((newNum), 75, 65);
	if (newNum != 0) {
		changeIconSize((newNum - 1), 65, 55);
	}
	if (newNum != totalIcons) {
		changeIconSize((newNum + 1), 65, 55);
	}
	
};

function changeIconSize (num, boxSize, imgSize) {
	var obj = document.getElementById("icon" + num);
	
	//console.log(num);
	
	obj.style.width = boxSize +"px";
    obj.style.height = boxSize +"px";
    
    obj.getElementsByTagName("img")[0].style.width = imgSize +"px";
    obj.getElementsByTagName("img")[0].style.height = imgSize +"px";
};

showSection(0);
//changeIcon(0);