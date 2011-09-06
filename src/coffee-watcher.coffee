# **coffee-watcher** is a script that can watch
# a directory and recompile your [.coffee scripts](http://jashkenas.github.com/coffee-script/) if they change.
# It's very useful for development - you basically don't need to think about
# recompiling your CoffeeScript files.  Search is done in a recursive manner 
# so sub-directories are handled as well.
#
# Installing coffee-watcher is easy with [npm](http://npmjs.org/):
#
#       sudo npm install coffee-watcher
#
# Run this to watch for changes in the current working directory:
#
#       coffee-watcher
#
# Run this to watch for changes in a specified directory:
#
#       coffee-watcher ~/Desktop/my_project
#       
# coffee-watcher requires:
#
# * [node.js](http://nodejs.org/) 
# * [find](http://en.wikipedia.org/wiki/Find)
# * [CoffeeScript](http://jashkenas.github.com/coffee-script/)


# Searches through a directory structure for *.coffee files using `dir` on windows, otherwise `find`.
# For each .coffee file it runs `compileIfNeeded` to compile the file if it's modified.
findCoffeeFiles = (dir) ->
    execute(
        if process.platform.toLowerCase().indexOf("win") is 0 then "dir \"#{dir}\\*.coffee\" /a:-d /b /s" else "find #{dir} -name '*.coffee' -print"
      , (error, stdout, stderr) ->
               for file in stdout.split(/[\r\n]+/)
                   compileIfNeeded file if file
    )


# Keeps a track of modified times for .coffee files in a in-memory object,
# if a .coffee file is modified it recompiles it using compileCoffeeScript.
#
# When starting the script all files will be recompiled.
WATCHED_FILES = {}
compileIfNeeded = (file) ->
    fs.stat(file, (err, stats) -> 
        old_mtime = WATCHED_FILES[file]
        new_mtime = new Date(stats.mtime)

        if !old_mtime
            should_compile = true
        else if new_mtime > old_mtime
            should_compile = true
        else
            should_compile = false

        WATCHED_FILES[file] = new_mtime

        compileCoffeeScript file if should_compile
    )


# Compiles a file using `coffee -c`.
#
# Compilation errors are printed out to stdout.
compileCoffeeScript = (file) ->
    execute("coffee -c #{ file }", (error, stdout, stderr) ->
        if error isnt null
            console.log error.message
        else
            console.log "Compiled #{ file }"
    )


# Require external dependencies (only node.js for now)
execute = require('child_process').exec
fs = require('fs')


# Starts a poller that polls each second in a directory that's
# either by default the current working directory or a directory that's passed through process arguments.
directoryPoll = -> findCoffeeFiles(process.argv[0] or '.')
directoryPoll()
setInterval directoryPoll, 1000
