const purifycss = require("purify-css");
const fs = require('fs');
const path = require('path');

const fileName = fs.readdirSync('./build/static/css').find(el => path.extname(el) === '.css');

let content = ['./build/index.html', './build/static/*.html'];
let css = [fileName];
let options = {
    output: fileName,
    minify: true
}

console.log('purifying CSS of ' + fileName);

purifycss(content, css, options);