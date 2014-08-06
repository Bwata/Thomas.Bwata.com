<?php

include_once 'loginConfig.php';

//Gets all events for a specifc timeline
function getEventsByTimelineID($id) {
  $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
  if (mysqli_connect_errno()){
    return false;
  }
  if ($result = $db->query("SELECT belongsToTimeline, eventID, eventTitle, eventDate, eventContents FROM event WHERE belongsToTimeline = $id")) {
    while($row = mysqli_fetch_array($result)) {
      $arrayedResults[] = array('timelineID' => $row['belongsToTimeline'], 'eventID' => $row['eventID'],'eventTitle' => $row['eventTitle'], 'eventDate' => $row['eventDate'], 'eventContents' => $row['eventContents']);
    }
  } else {
    return false;
  }
  $db->close();
  return json_encode(array('events'=>$arrayedResults));
}

//Gets all the timelines from the database
function getAllTimelines() {
  $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
  if (mysqli_connect_errno()){
    return false;
  }

  if ($result = $db->query("SELECT timelineID, timelineTitle, timelineColorName FROM timeline")) {
    while($row = mysqli_fetch_array($result)) {
      $arrayedResults[] = array('timelineID' => $row['timelineID'],'timelineTitle' => $row['timelineTitle'], 'timelineColorName' => $row['timelineColorName']);
    }
  } else {
    return false;
  }

  $db->close();
  return json_encode(array('timelines'=>$arrayedResults));
}

// Saves text based event data to database
function uploadInfo($info) {
  $title = $info["title"];
  $date = $info["date"];
  $kid = $info["kid"] + 1;
  $content = $info["content"];
  $key = $info["key"];

  if ($key == "wonderboy") {
    $db = new mysqli(HOSTW, USERW, PASSWORDW, DATABASEW, PORTW);
    if (mysqli_connect_errno()){
      return "connection error";
    }
    
    if (!$stmt = $db->prepare('INSERT INTO event (belongsToTimeline, eventTitle, eventDate, eventContents) values (?, ?, ?, ?)')){
      $db->close();
      return "statement error";
    }

    if(!$stmt->bind_param('ssss', $kid, $title, $date, $content)){
      $db->close();
      return "bind error";
    }
    
    if (!$stmt->execute()) {
      if ($db->errno === 1062 /* ER_DUP_ENTRY */) {
        $db->close();
        return "duplicate error";
      } else {
        $db->close();
        return "unknown error";
      }
    }
    
    $stmt->close();
    $db->close();
    return "success";
  }

return "No or wrong Key";  
}

//get the earliest date in the events table
function earliestDate() {
  $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
  if (mysqli_connect_errno()){
    return false;
  }
  
  if (!$stmt = $db->prepare('SELECT MIN(eventDate) FROM event')){
    $db->close();
    return false;
  }
  if (!$stmt->execute()){
    $db->close();
    return false;
  }
  if (!$stmt->bind_result($lowDate)){
    $db->close();
    return false;
  }
  if (!$stmt->fetch() && $db->errno){
    $db->close();
    return false;
  }
  
  $stmt->close();
  $db->close();
  return $lowDate;
}

function getAllGalleries () {
  $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
  if (mysqli_connect_errno()){
    return false;
  }

  if ($result = $db->query("SELECT galleryID, galleryTitle, galleryDate FROM gallery")) {
    while($row = mysqli_fetch_array($result)) {
      $arrayedResults[] = array('galleryID' => $row['galleryID'],'galleryTitle' => $row['galleryTitle'], 'galleryDate' => $row['galleryDate']);
    }
  } else {
    return false;
  }

  $db->close();
  return json_encode(array('galleries'=>$arrayedResults));
}

//Gets all events for a specifc timeline
function getImagesByGalleryID($id) {
  $db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
  if (mysqli_connect_errno()){
    return false;
  }
  if ($result = $db->query("SELECT belongsToTimeline, belongsToGallery, imageID, imageTitle, imageDate, imageContents FROM image WHERE belongsToGallery = $id")) {
    while($row = mysqli_fetch_array($result)) {
      $arrayedResults[] = array('timelineID' => $row['belongsToTimeline'], 'galleryID' => $row['belongsToGallery'], 'imageID' => $row['imageID'],'imageTitle' => $row['imageTitle'], 'imageDate' => $row['imageDate'], 'imageContents' => $row['imageContents']);
    }
  } else {
    return false;
  }
  $db->close();
  return json_encode(array('events'=>$arrayedResults));
}



?>