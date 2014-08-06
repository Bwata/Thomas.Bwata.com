<?php
//This file processes the check box change complete requests
session_start();

require '../../includes/kidsTimelineIncludes/timelineFunctions.php';

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);

$imageTitle = $_POST["title"];

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& in_array($extension, $allowedExts)) {
  if ($_FILES["file"]["error"] > 0) {
    print("Return Code: " . $_FILES["file"]["error"] . "<br>");
  } else {
    print("Upload: " . $_FILES["file"]["name"] . "<br>");
    print("Type: " . $_FILES["file"]["type"] . "<br>");
    print("Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>");
    print("Temp file: " . $_FILES["file"]["tmp_name"] . "<br>");
    if (file_exists("imageUpload/new" . $imageTitle . "." . $extension)) {
      print($imageTitle . "." . $extension . " already exists. ");
    } else {
      print($_FILES["file"]["tmp_name"] . " is the temp file. ");
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "imageUpload/new" . $imageTitle . "." . $extension);
      print("Stored in: " . "imageUpload/new" . $imageTitle . "." . $extension);
    }
  }
} else {
  print("Invalid file");
}

// $return = uploadInfo($_POST);

// if ($return == "success") {
//   header("Location: upload.html");    
// } else {
//   print($return);
// }

?>

