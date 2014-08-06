var lockScreenVisable = 1;
/**********************************************
Lock Screen Actions 

***********************************************/

function lock_swipe_left () {
	user_message("Left swipe gesture not functional for this test in this area.");
	tester_log('lockscreen : attempt to swipe left : Move');
};

function lock_swipe_right () {
	user_message("Right swipe gesture not functional for this test in this area.");
	tester_log('lockscreen : attempt to swipe right : Move');
};

function lock_swipe_up () {
	change_screen ("fitnessApp");
};

function lock_swipe_down () {
	change_screen ("switcher");
};