const fs = require('fs')
const transpiler = require('../lib')
let content = fs.readFileSync('./sample-code.js', 'utf8')
content = content.trim()
const result = JSON.stringify(transpiler.parse(content), null, 2)

fs.writeFileSync('./result.js', result, 'utf8')
