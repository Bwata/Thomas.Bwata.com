<?php

function connectToDB () {
	$con = mysql_connect('tmvcis371.bwata.com','thomasver','zmHBrYAefBoWzLjhEBRRmbBIm'); 

	if (!$con){
		die('Could not connect: '.mysql_error()); 
	}

	mysql_select_db ('tmvcis371', $con)
		  or die ("Unable to select database");
	
	return $con;
}

function createTable ($connection) {

	$result1 = mysql_query('DROP TABLE hw5Friends;', $connection);
	
	//echo $result1 . "<br>";

	$result = mysql_query("CREATE TABLE hw5Friends
		(
		ID 				int NOT NULL AUTO_INCREMENT,
		fName			CHAR(20),
		phone			CHAR(12),
		fAge			int,
		PRIMARY KEY (ID)
		);", $connection);
		
	//echo $result . "<br>";
		
}

function populateFromFile ($fileName, $connection) {

	$records = file($fileName);
	
	foreach($records as &$value) {
        $units = explode(",", $value);
        
        $nameStr = $units[0] . ' ' .$units[1];

        $result = mysql_query("INSERT INTO hw5Friends (fName,phone,fAge)
        VALUES ('$nameStr','$units[2]','$units[3]');", $connection);

	}
}

function instertValues ($fname, $phone, $age, $connection) {
	
	$result = mysql_query("INSERT INTO hw5Friends (fName,phone,fAge)
        VALUES ('$fname','$phone','$age');", $connection);

}

function printRecord ($connection) {
	
	$result = mysql_query('SELECT * FROM hw5Friends', $connection);
	
	echo "<table><tr><th>Index</th><th>Name</th><th>Phone</th><th>Age</th></tr>";

	while($row = mysql_fetch_array($result)){
		
		echo "<tr><td>" . $row['ID'] . "</td>";
		echo "<td>" . $row['fName'] . "</td>";
		echo "<td>" . $row['phone'] . "</td>";
		echo "<td>" . $row['fAge'] . "</td></tr>";
	
	
		//echo $row['ID'] . " " . $row['fName'] . " " . $row['phone'] . " " . $row['fAge']."<br>";
	}
	
	echo "</table>";
}

function closeDB ($connection) {
	mysql_close($connection);
}




?>