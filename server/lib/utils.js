import XLSX from 'xlsx';

/*
 added convertType to allow for wb to be converted to json and html

Complete test code form https://github.com/SheetJS/js-xlsx/issues/249
function process_wb(wb, headers) {
	var sheet = wb.Sheets[wb.SheetNames[0]];
	var H = []; // we need to convert the headers object into an array
	Object.keys(headers).forEach(function(h) {
		if(!headers.hasOwnProperty(h)) return;
		H[+headers[h]-1] = h; // the array is zero-indexed
	});
	var s2jopts = {
		range:1, // skip the first row -- remove this line if the first row in your worksheet is data
		header:H
	};
	var json = XLSX.utils.sheet_to_json(sheet, s2jopts);
	json.forEach(function(j) { delete j["undefined"]; }); // this will be unnecessary soon
	return json;
}

// read the file -- this is how you do it in node
var XLSX = require('xlsx');
var wb = XLSX.readFile('issue_249.xlsx');

var json = process_wb(wb, {postal:16, fleet:7, date:7, starttm:10});
console.log(json);

*/
//
// meteor wants the funtion to be defined with
// youFunctionName = function() { ... };
process_wb = function(wb, headers, convertType) {
	var sheet = wb.Sheets[wb.SheetNames[0]];
	var H = []; // we need to convert the headers object into an array
	Object.keys(headers).forEach(function(h) {
			if(!headers.hasOwnProperty(h)) return;
			H[+headers[h]-1] = h; // the array is zero-indexed
	});
	var s2jopts = { range:1, header:H};
    // range:1 skip the first row - remove this line if the first row in your ws is data

	var json = XLSX.utils.sheet_to_json(sheet, s2jopts);
	json.forEach(function(j) { delete j["undefined"]; }); //

	// by default this function returns json
	// return json;
		
	if (convertType === "json"){
	        return json;
	}else if (convertType === "html"){
		// convert json-->sheet-->html
		// todo: fix to allow direct conversion json-->html
		var sheet = XLSX.utils.json_to_sheet(json);

		// setup options
		var s2hopts = { editable: false};
		// now convert sheet-to-html
		var html = XLSX.utils.sheet_to_html(sheet, s2hopts);
		return html;
	}
	else {
		return "process_wb convertType error, use json or html";
	}
};
