<?php

include "../../../includes/CIS371Lab7/lab7Functions.php";



//need to get the op code of the function to perform
//check return on function call for false

if ($_GET['op'] == 'fillData') {
	echo dataPopulate();
} else if ($_GET['op'] == 'states') {
	retreiveStates();
} else {
	retreivePeople($_GET['state']);
}

?>