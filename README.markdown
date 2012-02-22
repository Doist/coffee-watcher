coffee-watcher is a script that can watch a directory and recompile your .coffee scripts if they change.

It's useful for development as you don't need to think about recompiling your CoffeeScript files.

It searches in a recursive manner so sub-directories are handled as well.

To install coffee-watcher via npm simply do:

    $ sudo npm install coffee-watcher

To use coffee-watcher simply do:

    coffee-watcher -p [prefix] -d [directory]
    
    Options:
      -d  Specify which directory to scan.                                                                             [default: "."]
      -p  Which prefix should the compiled files have? Default is style.coffee will be compiled to .coffee.style.css.  [default: ".coffee."]
      -h  Prints help                                                                                                  [boolean]

For more info read:
http://amix.github.com/coffee-watcher/
