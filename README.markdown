coffee-watcher is a script that can watch a directory and recompile your .coffee scripts if they change.
It's very useful for development - you basically don't need to think about recompiling your CoffeeScript files.

It searches in a recursive manner so sub-directories are handled as well.

To install coffee-watcher via npm simply do:
$ sudo npm install coffee-watcher

To use coffee-watcher simply do:
$ coffee-watcher
or
$ coffee-watcher ~/Desktop/my_dir

By default it compiles **file.coffee** to **.coffee.file.js**

For more info read:
http://amix.github.com/coffee-watcher/
