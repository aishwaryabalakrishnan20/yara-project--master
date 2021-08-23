// *** Let name it cucumber-html-report.js **
const report = require("multiple-cucumber-html-reporter");
report.generate({
jsonDir: "test/reports-cucumber-json",  // ** Path of .json file **//
reportPath: "./reports-json/cucumber-htmlreport.html",
metadata: {
browser: {
name: "chrome",
version: "92",
},
device: "Local test machine",
platform: {
name: "windows 10 Pro",
version: "20H2",
},
},
});