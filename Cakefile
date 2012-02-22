{spawn, exec} = require 'child_process'

option '-p', '--prefix [DIR]', 'set the installation prefix for `cake install`'

task 'build', 'continually build the coffee-watcher library with --watch', ->
  coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()

task 'install', 'install the `coffee-watcher` command into /usr/local (or --prefix)', (options) ->
  base = options.prefix or '/usr/local'
  lib  = base + '/lib/coffee-watcher'
  exec([
    'mkdir -p ' + lib
    'cp -rf bin README resources lib ' + lib
    'ln -sf ' + lib + '/bin/coffee-watcher ' + base + '/bin/coffee-watcher'
  ].join(' && '), (err, stdout, stderr) ->
   if err then console.error stderr
  )

task 'doc', 'rebuild the coffee-watcher documentation', ->
  exec([
    'docco src/coffee-watcher.coffee'
    'sed "s/docco.css/resources\\/docco.css/" < docs/coffee-watcher.html > Documentation.html'
    'rm -r docs'
  ].join(' && '), (err) ->
    throw err if err
  )
