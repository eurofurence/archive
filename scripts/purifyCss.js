const purifycss = require("purify-css");
const fs = require('fs');
const path = require('path');

const fileName = './build/static/css/' + fs.readdirSync('./build/static/css').find(el => path.extname(el) === '.css');

let content = ['./build/index.html', './build/static/*.html'];
let css = [fileName];
let options = {
    minify: true,
    whitelist: [ '*:not*' ]
}

console.log('purifying CSS of ' + fileName);

purifycss(content, css, options, function(purified) {
  const out = purified
    .replace("https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin", "../../fonts/lato.css");

    fs.writeFileSync(fileName, out);
});