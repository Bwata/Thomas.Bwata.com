<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="asdf" content="">
    <title></title>
    
</head>
<body>
     <?php
     
     echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT)."\n";
	// $2y$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// For example:
// $2y$10$.vGA1O9wmRjrwAVXD98HNOgsNpDczlqm3Jq7KnEd1rVAGv3Fykk1a

// Usage 2:
$options = array('cost' => 11);
echo password_hash("rasmuslerdorf", PASSWORD_BCRYPT, $options)."\n";
     
     ?>   
        
        
        
        
        
</body>
</html>