(function() {
  var WATCHED_FILES, compileCoffeeScript, compileIfNeeded, findCoffeeFiles, program, usage, watcher_lib;
  usage = "Watch a directory and recompile .coffee scripts if they change.\nUsage: coffee-watcher -p [prefix] -d [directory].";
  program = require('commander');
  program.version('0.0.1').usage(usage).option('-d, --directory', 'Specify which directory to scan. [Default: .]').option('-p, --prefix [type]', 'Which prefix should the compiled files have? Default is script.coffee will be compiled to .coffee.style.js.').parse(process.argv);
  program.directory = program.directory || '.';
  program.prefix = program.prefix || '.coffee.';
  watcher_lib = require('watcher_lib');
  findCoffeeFiles = function(dir) {
    return watcher_lib.findFiles('*.coffee', dir, compileIfNeeded);
  };
  WATCHED_FILES = {};
  compileIfNeeded = function(file) {
    return watcher_lib.compileIfNeeded(WATCHED_FILES, file, compileCoffeeScript);
  };
  compileCoffeeScript = function(file) {
    var fnGetOutputFile;
    fnGetOutputFile = function(file) {
      return file.replace(/([^\/\\]+)\.coffee/, "" + program.prefix + "$1.js");
    };
    return watcher_lib.compileFile("coffee -bp " + file, file, fnGetOutputFile);
  };
  watcher_lib.startDirectoryPoll(program.directory, findCoffeeFiles);
}).call(this);
