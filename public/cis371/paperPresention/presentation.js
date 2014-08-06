var windowHeight = window.innerHeight +1;
var currentLoc = 0;
var slideNum = 0;
console.log("stuff");
var scrollUnLock = true;

document.onkeydown = function() {
    switch (window.event.keyCode) {
        case 37:
            console.log('left');
            break;
        case 38:
            console.log('up');
            console.log("scroll up: " + currentLoc + " : " + window.pageYOffset);
            slideNum = slideNum - 1;
            currentLoc = windowHeight*slideNum;
            window.scrollBy(0,-windowHeight+41);
            console.log("scroll up: " + currentLoc + " : " + window.pageYOffset);
            break;
        case 39:
            console.log('right');
            break;
            case 32:
            console.log('space');
            break;
        case 40:
            //console.log('down');
            console.log("scroll down: " + currentLoc + " : " + window.pageYOffset);
            slideNum = slideNum + 1;
            currentLoc = windowHeight*slideNum;
            window.scrollBy(0,windowHeight-41);
            console.log("scroll down: " + currentLoc + " : " + window.pageYOffset);
    }
};