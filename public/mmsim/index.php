<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="" content="">
    <title></title>
    <link href="cssReset.css" rel="stylesheet">
    <link href="main.css" rel="stylesheet">
    <script src="process.js" type="text/javascript"></script>
    <script src="function.js" type="text/javascript"></script>

</head>
<body>

<div class="mainBox" id="titlebar">
	<h1>Memory Management Simulator</h1>
	<h3>by Thomas Verstraete</h3>
</div>

<div class="mainBox" id="commands">
	<h3 class="sectionTitle">Commands</h3>
	<div id="comBox">
	
	<?php //read in the file and insert into html
	
		if (isset($_GET['file'])) {
			$commandInput = file($_GET['file'].'.data.txt');
		} else {
			$commandInput = file("input3b.data.txt");
		}
		
		//$arr as $key => $value
		foreach($commandInput as $key => $command) {
		
			$comBefore = "<p id='comm".$key."'>";
			$comAfter = "</p>";
			
			echo $comBefore . $command . $comAfter;
		}
		
		$maxComm = count($commandInput);
	?>
	
	</div>
	<div class="buttonBox">
		<div class="button" id="prevCom" onclick="runPrevCommand()">
			<h6>Previous</h6>
		</div>
	
		<div class="button" id="nextCom" onclick="runNextCommand()">
			<h6>Next</h6>
		</div>
	</div>	
	
</div>

<div class="mainBox" id="physMem">
	<h3 class="sectionTitle">Physical Memory</h3>
	<div id="physMemBox">
		<div class="frame">		
			<h6>0</h6>
			<div id="frame0">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>1</h6>
			<div id="frame1">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>2</h6>
			<div id="frame2">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>3</h6>
			<div id="frame3">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>4</h6>
			<div id="frame4">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>5</h6>
			<div id="frame5">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>6</h6>
			<div id="frame6">
				<p>empty</p>
			</div>
		</div>
		
		<div class="frame">	
			<h6>7</h6>
			<div id="frame7">
				<p>empty</p>
			</div>
		</div>
	</div>
</div>

<div class="mainBox" id="helpbox">
	<h3 class="sectionTitle">Help</h3>
	<p id="helperText">This is a memory management simulator. It is meant to represent how an operating system divides up a process' data and text (code) into 512 byte pages and places them into open frames in the physical memory.</p>
</div>

<div class="clear"></div>

<div class="mainBox" id="processes">
	<h3 class="sectionTitle">Processes</h3>
	<div id="procBox">
		<!--Where the processes are displayed-->
		<div class="clear"></div>
	</div>
</div>
        
        
<script>
//set variables
var curCommand = -1;
var maxCommand = <?php echo $maxComm; ?>;

</script>     
        
</body>
</html>