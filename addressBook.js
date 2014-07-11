var fs = require('fs');
var HashMap = require('hashmap').HashMap;
var wstream = fs.createWriteStream('./myOutput.txt');
var csv = require("fast-csv");
var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("my.csv");
var map = new HashMap();

// fs.writeFile('./message.txt', 'Hello Node', function (err) {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });


function searchData (key) {
	console.log(map.get(key));
};

function loadData (filePath) {
	var csvFile = csv.fromPath(filePath);
	csvFile
		.on("record", function(data){
			map.set(parseInt(data[0]), [data[1], data[2]]);
		})
		.on("end", function(){
	 		console.log("done");
			map.forEach(function(value, key) {
			    console.log(key + " : " + value);
			});

			map.get(1);
			searchData(1);
		});
};

function saveData (filePath, data) {
	fs.appendFile(filePath, data, function (err) {
		if (err) throw err;
		
	});
};

writableStream.on("finish", function(){
  console.log("DONE!");
});


loadData('addressBook.csv');

saveData('addressBook.csv', '06, woogenius, 010101010');
