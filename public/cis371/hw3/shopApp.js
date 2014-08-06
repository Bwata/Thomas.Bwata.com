
function insertNewRow () {

	var itemNum = Number(document.getElementById("itemNum").value);
	var quant = Number(document.getElementById("itemQuant").value);

	if (itemNum != NaN && itemNum > 0 && itemNum < 6) {

		if (quant != NaN && quant > 0) {

			var cost = parseFloat(document.getElementById("price" + itemNum).innerHTML);


			var table = document.getElementById("inputTable");

			var row = table.insertRow(table.rows.length-1);
		  	var cell1 = row.insertCell(0);
		  	var cell2 = row.insertCell(1);
		  	var cell3 = row.insertCell(2);

		  	cell1.innerHTML = itemNum;
		  	cell2.innerHTML = quant;
		  	cell3.innerHTML = "$"+(cost*quant).toFixed(2);

		  	document.getElementById("itemNum").value = "";
			document.getElementById("itemQuant").value = "";
			document.getElementById("itemNum").focus();

		} else {
			showError(document.getElementById("itemQuant").value, 1);
		}
	  
	} else {
		showError(document.getElementById("itemNum").value, 0);
	}
};

function showError (val, why) {
	var errorArea = document.getElementById("error");
	if (why == 0) {
		error.innerHTML = "<h4>" + val + " is not a valid input for Item Number!</h4>"
		setTimeout(function(){error.innerHTML = ''},6000);
		document.getElementById("itemNum").focus();
		document.getElementById("itemNum").select();
	} else if (why == 1) {
		error.innerHTML = "<h4>" + val + " is not a valid input for Quantity!</h4>"
		setTimeout(function(){error.innerHTML = ''},6000);
		document.getElementById("itemQuant").focus();
		document.getElementById("itemQuant").select();
	}
	
};

function pressKey(e) {
    if(event.which == 13 || event.keyCode == 13) {
        insertNewRow();
    }
};