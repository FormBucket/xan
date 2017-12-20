var Metalsmith  = require('metalsmith')
var markdown    = require('metalsmith-remarkable')
var layouts     = require('metalsmith-layouts')
var inPlace     = require('metalsmith-in-place')
var permalinks  = require('metalsmith-permalinks')
var hljs        = require('highlight.js')
var moment      = require('moment')
var path        = require('path')

let createNewSite = ({name, description}) => {

  console.log(__dirname)

  var s = new Date()
  console.log('Metalsmith go')
  Metalsmith(process.cwd())
    .metadata({
      name,
      description
    })
    .source( path.join( __dirname, '/default-site') )
    .destination(path.join(process.cwd(), name))
    .clean(false)
    .use(inPlace({
      engine: 'handlebars'
    }))
    .build(function(err, files) {
      if (err) { throw err; }
    });

}

module.exports = createNewSite;
