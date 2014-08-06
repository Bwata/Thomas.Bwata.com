


<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="PHP Lesson" content="PHP Lesson">
    <title>PHP Lesson</title>
    <!--link href=".css" rel="stylesheet"-->

    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42864523-2', 'bwata.com');
  ga('send', 'pageview');

</script>


</head>
<body style="width: 300px; margin: 0 auto;">

<h3>Blood Analysis</h3>

    <?php

      $min = $_POST['minWeight'];
      $max = $_POST['maxWeight'];
      $sex = $_POST['sex'];
      
      $records = file("patients.txt");

      $_vals = array(array(), array());


      foreach($records as &$value) {
        $units = explode(",", $value);

        if ($units[1] == $sex && $units[3] < $max && $units[3] > $min) {
          $bType = $units[2];
          $sick = trim($units[4]);
          

          switch ($units[2]) {
            case "A+":
                if ($sick === "N") {
                  $_vals["A"]["N"]++;
                } else {
                  $_vals["A"]["Y"]++;
                }
                break;
            case "A-":
                if ($sick == "N") {
                  $_vals["A"]["N"]++;
                } else {
                  $_vals["A"]["Y"]++;
                }
                break;
            case "B+":
                if ($sick == "N") {
                  $_vals["B"]["N"]++;
                } else {
                  $_vals["B"]["Y"]++;
                }
                break;
            case "B-":
                if ($sick == "N") {
                  $_vals["B"]["N"]++;
                } else {
                  $_vals["B"]["Y"]++;
                }
                break;
            case "AB+":
                if ($sick == "N") {
                  $_vals["AB"]["N"]++;
                } else {
                  $_vals["AB"]["Y"]++;
                }
                break;
            case "AB-":
                if ($sick == "N") {
                  $_vals["AB"]["N"]++;
                } else {
                  $_vals["AB"]["Y"]++;
                }
                break;
            case "O+":
                if ($sick == "N") {
                  $_vals["O"]["N"]++;
                } else {
                  $_vals["O"]["Y"]++;
                }
                break;
            case "O-":
                if ($sick == "N") {
                  $_vals["O"]["N"]++;
                } else {
                  $_vals["O"]["Y"]++;
                }
                break;
            
            default:
               echo "<br>Not Found: " . $units[2] . "<br>";
            }
          }

      } //For Each Done
      echo "<table>";

      echo "<tr><td></td><td>A</td><td>B</td><td>AB</td><td>O</td></tr>";
      echo "<tr><td>N</td><td>".$_vals["A"]["N"]."</td><td>".$_vals["B"]["N"]."</td><td>".$_vals["AB"]["N"]."</td><td>".$_vals["O"]["N"]."</td></tr>";
      echo "<tr><td>Y</td><td>".$_vals["A"]["Y"]."</td><td>".$_vals["B"]["Y"]."</td><td>".$_vals["AB"]["Y"]."</td><td>".$_vals["O"]["Y"]."</td></tr>";
      echo "</table>";



    ?>
        
        
</body>
</html>