(function() {
  var WATCHED_FILES, compileCoffeeScript, compileIfNeeded, directoryPoll, execute, findCoffeeFiles, fs;
  findCoffeeFiles = function(dir) {
    return execute(process.platform.toLowerCase().indexOf("win") === 0 ? "dir \"" + dir + "\\*.coffee\" /a:-d /b /s" : "find " + dir + " -name '*.coffee' -print", function(error, stdout, stderr) {
      var file, _i, _len, _ref, _results;
      _ref = stdout.split(/[\r\n]+/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(file ? compileIfNeeded(file) : void 0);
      }
      return _results;
    });
  };
  WATCHED_FILES = {};
  compileIfNeeded = function(file) {
    return fs.stat(file, function(err, stats) {
      var new_mtime, old_mtime, should_compile;
      old_mtime = WATCHED_FILES[file];
      new_mtime = new Date(stats.mtime);
      if (!old_mtime) {
        should_compile = true;
      } else if (new_mtime > old_mtime) {
        should_compile = true;
      } else {
        should_compile = false;
      }
      WATCHED_FILES[file] = new_mtime;
      if (should_compile) {
        return compileCoffeeScript(file);
      }
    });
  };
  compileCoffeeScript = function(file) {
    return execute("coffee -bp " + file, function(error, stdout, stderr) {
      var output_filename;
      if (error !== null) {
        return console.log(error.message);
      } else {
        output_filename = file.replace(/([^\/\\]+)\.coffee/, '.coffee.$1.js');
        return fs.writeFile(output_filename, stdout.toString(), function(err) {
          if (err) {
            throw err;
          }
          return console.log("Compiled " + file + " to " + output_filename);
        });
      }
    });
  };
  execute = require('child_process').exec;
  fs = require('fs');
  directoryPoll = function() {
    return findCoffeeFiles(process.argv[0] || '.');
  };
  directoryPoll();
  setInterval(directoryPoll, 1000);
}).call(this);
