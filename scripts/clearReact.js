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
  const content = fs.readFileSync(file).toString();

  // remoe all data attributes
  const newContent = content
    .replace(/( data-([^"]+)"([^"]*)")/g, '')
    .replace(/<script(.*)<\/script>/g, '');

  fs.writeFileSync(file, newContent);
}