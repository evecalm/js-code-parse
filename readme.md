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
```ts
// parse result array
type CodeParseResult = Array<CodeParseResultItem>

// parse result item
interface CodeParseResultItem {
  indentify: string
  raw: string
  type: CodeBlockType,
  value: string
  valueType: CodeBlockType
  children?: Array<CodeParseResultItem>
}
```

## Sample
you may view <./test/result.js> to review the parsing result of `sample-code.js`, or just `cd test && ts-node --type-check test.ts` to try yourself.


sss 