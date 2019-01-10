const test = require('tape')
const colorize = require('tap-colorize')

test.createStream().pipe(colorize()).pipe(process.stdout)
