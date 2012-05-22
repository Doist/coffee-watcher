(function() {
  var WATCHED_FILES, compileCoffeeScript, compileIfNeeded, findCoffeeFiles, program, usage, watcher_lib;
  usage = "Watch a directory and recompile .coffee scripts if they change.\nUsage: coffee-watcher -p [prefix] -d [directory].";
  program = require('commander');
  program.version('1.5.0').usage(usage).option('-d, --directory <path>', 'Specify which directory to scan. [Default: .]', '.').option('-p, --prefix <type>', 'Which prefix should the compiled files have? Default is script.coffee will be compiled to .coffee.style.js.').option('-n, --noprefix', "Don't use a prefix. script.coffee will be compiled to script.js. Not the default option!").parse(process.argv);
  program.directory = program.directory || '.';
  if (program.prefix === void 0 || program.prefix === true) {
    program.prefix = '.coffee.';
  }
  if (program.noprefix) {
    program.prefix = '';
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
      return file.replace(/([^\/\\]+)\.coffee/, "" + program.prefix + "$1.js");
    };
    return watcher_lib.compileFile("coffee -bp " + file, file, fnGetOutputFile);
  };
  watcher_lib.startDirectoryPoll(program.directory, findCoffeeFiles);
}).call(this);
