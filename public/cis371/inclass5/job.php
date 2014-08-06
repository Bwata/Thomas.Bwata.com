<?php session_start(); ?>
<!DOCTYPE HTML>

<html>
<head>
    <meta charset="utf-8">
    <meta name="PHP Lesson" content="PHP Lesson">
    <title>Job</title>
    <!--link href=".css" rel="stylesheet"-->



</head>
<body style="width: 400px; margin: 0 auto;">
  
<H1>Job Cover Letter!</H1>
  <?php
    echo "<p>Dear " . $_SESSION['contact'] . ",<br> Please hire me for the " . $_SESSION['jobs'] . " position of " . $_SESSION['title'] . ". <br>Sincerely " . $_SESSION['firstName'] . "</p>";
   

  ?>
     
        
        
        
        
</body>
</html>