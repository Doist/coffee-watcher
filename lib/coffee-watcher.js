(function() {
  var WATCHED_FILES, argv, compileCoffeeScript, compileIfNeeded, findCoffeeFiles, specs, usage, watcher_lib;
  usage = "Watch a directory and recompile .coffee scripts if they change.\nUsage: coffee-watcher -p [prefix] -d [directory].";
  specs = require('optimist').usage(usage)["default"]('d', '.').describe('d', 'Specify which directory to scan.')["default"]('p', '.coffee.').describe('p', 'Which prefix should the compiled files have? Default is script.coffee will be compiled to .coffee.style.css.').boolean('h').describe('h', 'Prints help');
  if (specs.parse(process.argv).h) {
    specs.showHelp();
    process.exit();
  } else {
    argv = specs.argv;
  }
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
      return file.replace(/([^\/\\]+)\.coffee/, "" + argv.p + "$1.js");
    };
    return watcher_lib.compileFile("coffee -bp " + file, file, fnGetOutputFile);
  };
  watcher_lib.startDirectoryPoll(argv.d, findCoffeeFiles);
}).call(this);
