<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>PHP &amp; MySQL</title>
    <link href=".css" rel="stylesheet">

</head>
<body style="width: 300px;margin:0 auto;">
        

        <div id="formDiv">
            <form name="input" action="input.php" method="post" enctype="multipart/form-data">
                
                Name: <input type="text" name="name" id="name"><br>
                Phone: <input type="text" name="phone" id="phone"><br>
                Age: <input type="text" name="age" id="age"><br>
                <input type="submit" value="Submit">

            </form>
        </div>
        
    <div id="links">
        <a href="output.php">See all the records</a><br>
        <a href="Reset.php">Reset the database</a>
        
    </div>

        <?php 
        
        	include 'functions.php';
        
        	$con = connectToDB();
        	printRecord($con);
        	closeDB($con);

        ?>
        
        
        
        
</body>
</html>
