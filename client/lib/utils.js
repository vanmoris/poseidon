import XLSX from 'xlsx';


getHTMLtable = function(jsonData) {

	let htmlTable = "<table border='0'><tr>";
				 for (jsonItem in jsonData) {
					 if(jsonItem !== "_id" && jsonItem !== "loaded_ts"){
						 htmlTable += "<td>" + jsonItem + ":" + jsonData[jsonItem]+ ";</td>";
					 }
				 }
				 htmlTable += "</tr></table>";
	 return htmlTable;
};
