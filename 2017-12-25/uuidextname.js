const uuid = require('uuid/v4');
const path = require('path');

let filename = "1.png";
let newfilename = `${uuid().replace(/\-/g,"")}${path.extname(filename)}`;

console.log('====================================');
console.log(newfilename);
console.log('====================================');