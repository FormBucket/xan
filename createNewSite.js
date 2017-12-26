var exec = require("child_process").exec;
var path = require("path");

let createNewSite = ({ name, description }) => {
  var start = new Date();
  let templateDir = path.join(__dirname, "/default-site");
  let cwd = path.join(process.cwd(), name);

  console.log(templateDir, cwd);
  exec(`cp -r ${templateDir} ${cwd}`, function(error, stdout, stderr) {
    // command output is in stdout
    if (error) {
      console.log("COPY ERROR:", error, stderr);
    }

    console.log(stdout);
  });
};

module.exports = createNewSite;
