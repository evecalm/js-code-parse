# A simple JS code parser
currently only support to parse json like code block

## usage
```js
const fs = require('fs')
const parser = require('./lib/')
const codeString = fs.readFileSync('js-code-to-parse.js', 'utf8')

const result = parser.parse(codeString)
```

structure of result:
```json
[{
    "indentify": "export default ",
    "type": "object",
    "raw": "{xxxxxxx}",
    "rawWrapper": "export default {xxxxxxx}",
    "children": [{
      "indentify": "name",
      "type": "keyVal",
      "raw": "'actionsheet'",
      "rawWrapper": "\n  name: 'actionsheet'"
    },...]
},...]
````