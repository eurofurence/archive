"use strict";

var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if(path.extname(file) === '.html' && file.indexOf('200.html') === -1) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

walk('./build', function(err, results) {
  if (err) throw err;
  results.forEach(file => {
    handleFile(file);
  });
});

function handleFile(file) {

  console.log('postprocessing ' + file);

  const content = fs.readFileSync(file).toString();
  const fileParts = file.split('/');
  const isSubPage = fileParts.length === 4;
  const relPrefix = isSubPage ? '' : 'static/';

  const newContent = content
    .replace(/( data-([^"]+)"([^"]*)")/g, '')
    .replace(/="\/static\//g, '="' + relPrefix)
    .replace(/<!--[^>]+>/g, '')
    .replace(/<script(.*)<\/script>/g, '');

  if(isSubPage) {
    fs.unlinkSync(file);
    fs.rmdirSync(fileParts[0] + '/' + fileParts[1] + '/' + fileParts[2]);
    const newFileName = fileParts[0] + '/' + fileParts[1] + '/static/index_' + fileParts[2] + '.html';

    console.log(' -- moving to ' + newFileName);

    fs.writeFileSync(newFileName, newContent);
  } else {
    fs.writeFileSync(file, newContent);
  }
}