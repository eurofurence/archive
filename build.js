const Mustache = require('mustache');
const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function copyFileSync( source, target ) {

  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          var curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}

deleteFolderRecursive('build');
fs.mkdirSync('build');

const years = [];

fs.readdirSync('pages').forEach(function(file){
  const curPath = "pages/" + file;
  const config = JSON.parse(fs.readFileSync(curPath));

  years.push({number: file.slice(0, -5), theme: config.theme, data: config});
});

years.sort((a,b) => b.number - a.number);

const template = fs.readFileSync('template.html', 'utf8');
fs.writeFileSync('build/index.html', Mustache.render(template, {years}), {encoding: 'utf8'});

years.forEach(year => {
  fs.mkdirSync('build/'+year.number);
  fs.writeFileSync('build/'+year.number+'/index.html', Mustache.render(template, {years, content: year.data, year: year.number}), {encoding: 'utf8'});
});

copyFileSync('style.css', 'build/style.css');
copyFileSync('robots.txt', 'build/robots.txt');
copyFileSync('.htaccess', 'build/.htaccess');
copyFileSync('google923ea510961858c2.html', 'build/google923ea510961858c2.html');
copyFolderRecursiveSync('images', 'build');
copyFolderRecursiveSync('fonts', 'build');
