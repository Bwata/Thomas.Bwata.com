<?php session_start(); ?>
<!DOCTYPE HTML>

<html>
<head>
    <meta charset="utf-8">
    <meta name="PHP Lesson" content="PHP Lesson">
    <title>In Class 5</title>
    <!--link href=".css" rel="stylesheet"-->



</head>
<body style="width: 300px; margin: 0 auto;">
  

  <?php

    $_SESSION['firstName'] = $_POST['firstName'];
    $_SESSION['contact'] = $_POST['contact'];
    $_SESSION['jobs'] = $_POST['jobs'];
    $_SESSION['title'] = $_POST['title'];

    echo "<h1>Thank you " . $_SESSION['firstName'] . "</h1>";

  ?>
        
        <a href="job.php">Job</a>
        <a href="intern.php">Internship</a>
        
        
        
        
        
</body>
</html>