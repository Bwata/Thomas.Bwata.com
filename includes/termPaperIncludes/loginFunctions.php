<?php
include_once'loginConfig.php';
require 'PasswordHash.php';

/* Dummy salt to waste CPU time on when a non-existent username is requested.
 * This should use the same hash type and cost parameter as we're using for
 * real/new hashes.  The intent is to mitigate timing attacks (probing for
 * valid usernames).  This is optional - the line may be commented out if you
 * don't care about timing attacks enough to spend CPU time on mitigating them
 * or if you can't easily determine what salt string would be appropriate. */
$dummy_salt = '$2a$08$1234567890123456789012';

//error message used to determine the issue that has occured
$errorNote = 'None at all';

//have the user sign up for the service.
function signup() {
  global $errorNote;

	//gets the username from the global variable
	$user = get_post_var('user');
	// Sanity-check the username, don't rely on our use of prepared statements
	// alone to prevent attacks on the SQL server via malicious usernames.
	if (!preg_match('/^[a-zA-Z0-9_]{1,60}$/', $user)) {
		$errorNote = 'Invalid username';
    return false;
  }

	//gets the password from the global variable
	$email = get_post_var('email');
  //would need to check to see if it is in propor email format.

	//gets the password from the global variable
	$pass = get_post_var('pass');
	// Don't let them spend more of our CPU time than we were willing to.
	// Besides, bcrypt happens to use the first 72 characters only anyway.
	if (strlen($pass) > 72) {
		$errorNote = 'The supplied password is too long';
    return false;
  }

	//creates a new hasher object from phpass
	$hasher = new PasswordHash(HASH_COST_LOG2, HASH_PORTABLE);

	//hashes the password with phpass
	$hash = $hasher->HashPassword($pass);
	if (strlen($hash) < 20) {
		$errorNote = 'Failed to hash new password';
    return false;
  }
	unset($hasher);


	//connects to the database
	$db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
	if (mysqli_connect_errno()){
    $errorNote = 'MySQL connect'. mysqli_connect_error();
    return false;
  }

  //attempts to insert the user information into the database and returns with
  //an error if the user already exists.
	if (!$stmt = $db->prepare('insert into test_login2 (username, email, password) values (?, ?, ?)')){
    $errorNote = 'MySQL prepare'. $db->error;
    return false;
  }

  //attach the variables to the prepared statement.
	if(!$stmt->bind_param('sss', $user, $email, $hash)){
    $errorNote = 'MySQL bind_param'. $db->error;
    return false;
  }

  //execute the prepared statement.
	if (!$stmt->execute()) {
		if ($db->errno === 1062 /* ER_DUP_ENTRY */) {
      $errorNote = 'This username is already taken';
      return false;
    }else{
      $errorNote = 'MySQL execute'. $db->error;
      return false;
    }
	}

  $errorNote = 'We have Success';
	return true;
}


function login(){
  global $errorNote;

  //gets the username from the global variable
	$user = get_post_var('user');
	// Sanity-check the username, don't rely on our use of prepared statements
	// alone to prevent attacks on the SQL server via malicious usernames.
	if (!preg_match('/^[a-zA-Z0-9_]{1,60}$/', $user)){
        $errorNote = 'Invalid username';
        return false;
      }

	//gets the password from the global variable
	$pass = get_post_var('pass');
	// Don't let them spend more of our CPU time than we were willing to.
	// Besides, bcrypt happens to use the first 72 characters only anyway.
	if (strlen($pass) > 72){
        $errorNote = 'The supplied password is too long';
        return false;
      }

	if (authenticatePassword($user, $pass)) {



    //Login successful.
		return true;
	} else {
    $errorNote = 'failure to log in';
    return false;
	}
}

function changePassword () {
  global $errorNote;

	//connects to the database
	$db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
	if (mysqli_connect_errno()){
        $errorNote = 'MySQL connect'. mysqli_connect_error();
        return false;
      }

	//gets the username from the global variable
	$user = get_post_var('user');
	/* Sanity-check the username, don't rely on our use of prepared statements
	* alone to prevent attacks on the SQL server via malicious usernames. */
	if (!preg_match('/^[a-zA-Z0-9_]{1,60}$/', $user)){
        $errorNote = 'Invalid username';
        return false;
      }

	//gets the password from the global variable
	$pass = get_post_var('pass');
	/* Don't let them spend more of our CPU time than we were willing to.
	* Besides, bcrypt happens to use the first 72 characters only anyway. */
	if (strlen($pass) > 72){
        $errorNote = 'The supplied password is too long';
        return false;
      }

	//gets the password from the global variable
	$newpass = get_post_var('newpass');
	/* Don't let them spend more of our CPU time than we were willing to.
	* Besides, bcrypt happens to use the first 72 characters only anyway. */
	if (strlen($newpass) > 72){
      $errorNote = 'The supplied password is too long';
      return false;
    }

	if (authenticatePassword($user, $pass, $db)) {

		//creates a new hasher object from phpass
		$hasher2 = new PasswordHash(HASH_COST_LOG2, HASH_PORTABLE);

		//hashes the password with phpass
		$hash = $hasher2->HashPassword($newpass);
		if (!strlen($hash)) {
          $errorNote = 'Failed to hash new password';
          return false;
        }
		unset($hasher);

		if (!$stmt = $db->prepare('update test_login2 set password=? where username=?')){
          $errorNote = 'MySQL prepare'. $db->error;
          return false;
        }
		if (!$stmt->bind_param('ss', $hash, $user)){
          $errorNote = 'MySQL bind_param'. $db->error;
          return false;
        }
		if (!$stmt->execute()){
          $errorNote = 'MySQL execute'. $db->error;
          return false;
        }

		return true;
	} else {
        $errorNote = 'failure';
        return false;
	}


}

function authenticatePassword($user, $password, $db = '') {
  global $errorNote;

  //allows the $db to remain if passed in as parameter
	$dbRemain = true;

	if ($db == '') {
		$dbRemain = false;
		//connects to the database
		$db = new mysqli(HOST, USER, PASSWORD, DATABASE, PORT);
		if (mysqli_connect_errno()) {
      $errorNote = 'MySQL connect'. mysqli_connect_error();
			return false;
    }
	}

	$hashDB = '*'; // In case the user is not found

	//get the hashed password from the database for that user.
	if (!$stmt = $db->prepare('select id, password from test_login2 where username=?')){
    $errorNote = 'MySQL prepare'. $db->error;
		return false;
  }
	if (!$stmt->bind_param('s', $user)){
    $errorNote = 'MySQL bind_param'. $db->error;
		return false;
  }
	if (!$stmt->execute()){
    $errorNote = 'MySQL execute'. $db->error;
		return false;
  }
	if (!$stmt->bind_result($user_id, $hashDB)){
    $errorNote = 'MySQL bind_result'. $db->error;
		return false;
  }
	if (!$stmt->fetch() && $db->errno){
    $errorNote = 'MySQL fetch'. $db->error;
		return false;
  }

	// Mitigate timing attacks (probing for valid usernames)
	if (isset($dummy_salt) && strlen($hashDB) < 20)
		$hashDB = $dummy_salt;

	//creates a new hasher object from phpass
	$hasher = new PasswordHash(HASH_COST_LOG2, HASH_PORTABLE);

	//checks the password
	if ($hasher->CheckPassword($password, $hashDB)) {

    unset($hasher);

		$stmt->close();

		if (!$dbRemain) {
			$db->close();
		}

		return true; //'Authentication succeeded';
	} else {

		$stmt->close();

		if (!$dbRemain) {
			$db->close();
		}

    $errorNote = 'Authentication failed';
		return false;
	}
}

function get_post_var($var) {
	$val = $_POST[$var];
	if (get_magic_quotes_gpc()) {
    $val = stripslashes($val);
  }
  return $val;
}
