#!/usr/bin/env node
var program = require('commander');

var exec = require('child_process').exec;

program
  .version(require('./package.json').version)

// Run Server Command
// usage: xan new :name
program
    .command('new [name]')
    .description('Create new app')
    .version(require('./package.json').version)
    .action(function(name) {
      var createSite = require('./createNewSite')
      createSite({name})
    });


// Run Server Command
// usage: xan server
program
  .command('server')
  .description('run server')
  .action(function() {
    require('./devServer')
  });

// Build static site command
// usage: xan build
program
  .command('build')
  .description('build the public folder')
  .action(function() {

    var s = new Date()

    console.log('Copy image start')
    exec("cp -r ./img public/", function(error, stdout, stderr) {
      // command output is in stdout
      if (error) {
        console.log('IMAGE COPY ERROR:', error)
      }

      console.log('Copy image done', stdout)

    });

    console.log('Metalsmith start')
    exec(`node ${__dirname}/createStaticPages`, function(error, stdout, stderr) {
      if (error) {
        console.log('Metalsmith error:', error)
      }

      console.log('Metalsmith end', (new Date() - s) + 'ms')
    });

    let {webpack, config} = require('./createWebpackCompiler');

    console.log('Webpack start')
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.log('Error:', err, stats)
      }
      console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
      }));
    });
  });



program.parse(process.argv);
