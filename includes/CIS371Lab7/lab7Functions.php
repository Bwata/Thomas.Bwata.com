<?php

/** * These are the database login details */
define("HOST","tmvcis371.bwata.com");// The host you want to connect to.
define("USER","thomasver");// The database username.
define("PASSWORD","zmHBrYAefBoWzLjhEBRRmbBIm");// The database password.
define("DATABASE","tmvcis371");// The database name.


//need to get the op code of the function to perform
//check return on function call for false

// if (/*populate data*/) {
// 	$result = dataPopulate();
//
// } else if (/*get states*/) {
// 	retrieveStates();
// } else { //get names
// 	retreivePeople($_POST['stateID']);
// }


function dataPopulate() {

	$errorNote = "none";

	$db=new mysqli(HOST, USER, PASSWORD, DATABASE);
	if (mysqli_connect_errno()){
    	return 'MySQL connect'. mysqli_connect_error();
  	}

  	$records = file("data.txt");

	foreach($records as &$value) {
        $units = explode("\t", $value);

        //attempts to insert the user information into the database and returns with
		//an error if the user already exists.
		if (!$stmt = $db->prepare('insert into lab7 (givenname, surname, streetaddress, city, state, zipcode, emailaddress, telephonenumber) values (?, ?, ?, ?, ?, ?, ?, ?)')){
			return 'MySQL prepare'. $db->error;
		}

		//attach the variables to the prepared statement.
		if(!$stmt->bind_param('sssssiss', $units[0], $units[1], $units[2], $units[3], $units[4], $units[5], $units[6], $units[7])){
			return 'MySQL bind_param'. $db->error;
		}

		//execute the prepared statement.
		if (!$stmt->execute()) {
			return 'MySQL execute'. $db->error;
		}
    }

    return $errorNote;
}


function retreiveStates () {

	$returnVal = "none";

	$db=new mysqli(HOST, USER, PASSWORD, DATABASE);
	if (mysqli_connect_errno()){
		$returnVal = 'MySQL connect'. mysqli_connect_error();
		//return false;
	}

	//get the hashed password from the database for that user.
	if (!$stmt = $db->prepare('SELECT DISTINCT state FROM lab7 ORDER BY state')){
		$returnVal = 'MySQL prepare'. $db->error;
		//return false;
	}

	if (!$stmt->execute()){
		$returnVal = 'MySQL execute'. $db->error;
		//return false;
	}

	if (!$stmt->bind_result($stateID)){
		$returnVal = 'MySQL bind_result'. $db->error;
		//return false;
	}


	$retVal=array();

 	while ($stmt->fetch()){
// 		//use $stateID to create array
 		$retVal[]=$stateID;
 	}


  	echo json_encode($retVal);
	//return true;
}


//GETS THE INFORMATION ABOUT THE PEOPLE IN A SPECIFIC STATE
function retreivePeople($stateID) {

	$db=new mysqli(HOST, USER, PASSWORD, DATABASE);
	if (mysqli_connect_errno()){
    	return 'MySQL connect'. mysqli_connect_error();
  	}

  	//get the hashed password from the database for that user.
	if (!$stmt = $db->prepare('SELECT DISTINCT givenname, surname, streetaddress, city, zipcode, emailaddress, telephonenumber FROM lab7 WHERE state=? ORDER BY surname')){
		$errorNote = 'MySQL prepare'. $db->error;
		return false;
	}

	//attach the variables to the prepared statement.
		if(!$stmt->bind_param('s', $stateID)){
			return 'MySQL bind_param'. $db->error;
		}

	if (!$stmt->execute()){
		$errorNote = 'MySQL execute'. $db->error;
		return false;
	}

	if (!$stmt->bind_result($givenName, $surname, $streetaddress, $city, $zipcode, $emailaddress, $telelphonenumber)){
		$errorNote = 'MySQL bind_result'. $db->error;
		return false;
	}


	//START CREATION OF XML DOCUMENT
	$imp = new DOMImplementation;

    //Creates a DOMDocumentType instance
 	$dtd = $imp->createDocumentType('people', '', 'peopleState.dtd');

	// Creates a DOMDocument instance
	$dom = $imp->createDocument("", "", $dtd);

	$dom->encoding = 'UTF-8';

	$xsl = $dom->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="peopleState.xsl"');

	$root = $dom->createElement('people');

	//adding it to the xml
	$dom->appendChild($xsl);
	$dom->appendChild($root);

	//loop to create XML document
	while ($stmt->fetch()){
		$personNode = $dom->createElement("person");

		//creates the nodes inside person...ouch
		$firstNameNode = $dom->createElement("firstName");
		$lastNameNode = $dom->createElement("lastName");
		$addressNode = $dom->createElement("address");
		$phoneNode = $dom->createElement("phone");

		//firstname
		$textFNode = $dom->createTextNode($givenname);
		$firstNameNode->appendChild($textFNode);
		$personNode->appendChild($firstNameNode);

		//lastname
		$textLNode = $dom->createTextNode($surname);
		$lastNameNode->appendChild($textLNode);
		$personNode->appendChild($lastNameNode);


		//address
		$comboAddress = $streetaddress . " " . $city ." " . $stateID . " " . $zipcode;
		$textANode = $dom->createTextNode($comboAddress);
		$lastNameNode->appendChild($textANode);
		$personNode->appendChild($lastNameNode);

		//phone
		$textPNode = $dom->createTextNode($telelphonenumber);
		$phoneNode->appendChild($textPNode);
		$personNode->appendChild($phoneNode);

		$root->appendChild($personNode);
	}

		$dom->save("test.xml");
  	//echo "cats";
  	echo $dom->saveXML();

}
?>
