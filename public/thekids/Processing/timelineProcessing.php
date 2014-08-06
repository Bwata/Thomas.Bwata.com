<?php
//This file processes the check box change complete requests
session_start();

require '../../includes/kidsTimelineIncludes/timelineFunctions.php';

//get the id from the GET variable, This means they want the events
if (isset($_GET['id'])) {
  if ($return = getEventsByTimelineID($_GET['id'])) {
    echo $return;
  } else {
    echo "Nope, It broke!";
  }
} else {
  //they want the timelines
  if ($return = getAllTimelines()) {
    echo $return;
  } else {
    echo "Nope, It broke!";
  }
}


?>