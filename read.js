
/**
 * 从xlsx中读文件，并且写成json格式的数据
 * @type {[type]}
 */
var xlsx = require('xlsx');
const fs = require('fs');
var xmlFile = xlsx.readFile('./test.xlsx');
var Sheets = xmlFile.Sheets;
var SheetNames = xmlFile.SheetNames;
worksheet = Sheets[SheetNames[0]];

var json_conversion = xlsx.utils.sheet_to_json(worksheet);

var translate = {};

var i = 0;
json_conversion.forEach(function(recode){
  translate[recode.key] = recode.text;
  i++
})

fs.writeFile('./outputFile.json', JSON.stringify(translate), 'utf-8', function(err){
  if(err){
    console.log("出错了!");
  }
});
