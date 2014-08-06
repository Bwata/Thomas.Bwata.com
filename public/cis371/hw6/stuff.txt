<?php 

$string = file_get_contents("fortune500.json");

$json_a=json_decode($string,true);


$imp = new DOMImplementation;

// Creates a DOMDocumentType instance
$dtd = $imp->createDocumentType('companies', '', 'f500.dtd');

// Creates a DOMDocument instance
$dom = $imp->createDocument("", "", $dtd);

$dom->encoding = 'UTF-8';

$xsl = $dom->createProcessingInstruction('xml-stylesheet', 'type="text/xsl" href="f500.xsl"');





$root = $dom->createElement('companies');

//adding it to the xml
$dom->appendChild($xsl);
$dom->appendChild($root);


foreach($json_a as $key1 => $value1) { //grabs who list
	foreach($value1 as $key2 => $value2) { //grabs each company
		if ($key2 < 30) {
			$companyNode = $dom->createElement("companyA");
		
			foreach($value2 as $key3 => $value3) { //graps each element of the company
				//echo "output for " . $key2 . " Key: " . $key3 . " Value: " . $value3 . "<br>";
			
				//creates the node inside company
				$itemNode = $dom->createElement($key3);
			
				//inserts the value as text into item node.
				$textNode = $dom->createTextNode($value3);
				$itemNode->appendChild($textNode);
			
				$companyNode->appendChild($itemNode);
			}	
		
			$root->appendChild($companyNode);
		}
	}
}
header('Content-type: text/xml; charset=utf-8');
echo $dom->saveXML();
?>
