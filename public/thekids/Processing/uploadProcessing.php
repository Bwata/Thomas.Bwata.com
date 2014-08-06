<?php
//This file processes the check box change complete requests
session_start();

require '../../includes/kidsTimelineIncludes/timelineFunctions.php';

$return = uploadInfo($_POST);

if ($return == "success") {
  header("Location: upload.html");    
} else {
  print($return);
}

?>

