#!/usr/bin/env node
var program = require('commander');

var exec = require('child_process').exec;
var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';


program
  .version(require('./package.json').version)

program
  .command('start')
  .description('run server')
  .action(function() {
    require('./devServer')
  });

program
  .command('build')
  .description('build the public folder')
  .action(function(cmd) {

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
    exec(`node ${__dirname}/runMetalSmith`, function(error, stdout, stderr) {
      if (error) {
        console.log('Metalsmith error:', error)
      }

      console.log('Metalsmith end', (new Date() - s) + 'ms')
    });

    console.log('Webpack start')
    exec(`webpack --config ${__dirname}/webpack.config.prod.js`, function(error, stdout, stderr) {
      if (error) {
        console.log('Webpack error:', error)
      }

      // command output is in stdout
      console.log('Weback end', (new Date() - s) + 'ms')
      console.log(stdout, stderr)
    });
  });11



program.parse(process.argv);
