<?php session_start(); ?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="" content="">
    <title>Error Page</title>
    <link href=".css" rel="stylesheet">
</head>
<body>

  <h1 style="color: red;">There appears to have been a problem. Please try again.</h1>

  <?php echo '<h3>'.$_GET['error'].'</h3>'?>

  <h1>Create a new user</h1>
  <p>
  <form action="loginProcessing.php" method="POST">
  <input type="hidden" name="op" value="new">
  Username:<br>
  <input type="text" name="user" size="60"><br>
  Password:<br>
  <input type="password" name="pass" size="60"><br>
  <input type="submit" value="Create user">
  </form>

  <h1>Log in</h1>
  <p>
  <form action="loginProcessing.php" method="POST">
  <input type="hidden" name="op" value="login">
  Username:<br>
  <input type="text" name="user" size="60"><br>
  Password:<br>
  <input type="password" name="pass" size="60"><br>
  <input type="submit" value="Log in">
  </form>

  <h1>Change password</h1>
  <p>
  <form action="loginProcessing.php" method="POST">
  <input type="hidden" name="op" value="change">
  Username:<br>
  <input type="text" name="user" size="60"><br>
  Current password:<br>
  <input type="password" name="pass" size="60"><br>
  New password:<br>
  <input type="password" name="newpass" size="60"><br>
  <input type="submit" value="Change password">
  </form>

</body>
</html>
