<?php

require '../../../includes/termPaperIncludes/loginFunctions.php';

// gets the operation code for what part of the login was used
$op = $_POST['op'];
if ($op !== 'new' && $op !== 'login' && $op !== 'change')
	header('Location: http://thomas.bwata.com/cis371/termPaper/errorPage.php?error=wrong op code');

if ($op == 'new')
  $result = signup();

if ($op == 'login')
  $result = login();

if ($op == 'change')
  $result = changePassword();

if ($result) {
  header('Location: http://thomas.bwata.com/cis371/termPaper/protected_page.php');
} else {
  header('Location: http://thomas.bwata.com/cis371/termPaper/errorPage.php?error=Login Processing '.$errorNote);
}
