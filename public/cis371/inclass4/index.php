<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="Oscars" content="oscars">
    <title>Oscar List</title>
 
   
</head>
<body>
      <?php 
      $lines = file("oscars.txt");

    	foreach($lines as &$value) {

    		if (substr($value, 0, 4) == 'Best') {
    			echo "<h2>" . $value . "</h2>";
    			echo "<ol>";
    		} elseif (strlen($value) == 1) {
    			echo "</ol>";
    		} else {
    			echo "<li>" . $value . "</li>";
    		}
    	}
    	unset($value);
    	echo "</ol>";  

    	?>
</body>
</html>