// code block types
const enum CodeBlockType {
  string = 'string',
  funcBlock = 'funcBlock',
  function = 'function',
  object = 'object',
  array = 'array',
  keyVal = 'keyVal',
  bracket = 'bracket',
  statement = 'statement'
}

// parse result item
interface CodeParseResultItem {
  indentify: string
  raw: string
  type: CodeBlockType,
  value: string
  valueType: CodeBlockType
  children?: Array<CodeParseResultItem>
}

// parse result array
type CodeParseResult = Array<CodeParseResultItem>

/**
 * JS code block wrappers
 * @type {Object}
 */
const SEPARATORS = {
  "'": "'",
  '"': '"',
  '{': '}',
  '(': ')',
  '[': ']',
  '`': '`'
} as {[k: string]: string}

/**
 * get corresponed separator pos
 * @param  {String} code          code string
 * @param  {Number} startPosition separator start pos
 * @return {Number}               separator close pos
 */
function getCodeBlockPos (code: string, startPosition: number) {
  const totalLen = code.length
  const separator = code[startPosition]
  const closeSep = SEPARATORS[separator]
  if (!closeSep) {
    if (isIdenChar(separator)) {
      return getIdenfiyEndPos(code, startPosition)
    }
    return startPosition
  }
  const closeSepLen = closeSep.length
  const separatorLen = separator.length
  let pos = startPosition + 1
  let tagCount = 1
  while (pos < totalLen) {
    pos = skipNonsense(code, pos)
    if (pos >= totalLen) return pos
    if (code.slice(pos, pos + closeSepLen) === closeSep) {
      --tagCount
      pos += closeSepLen
      if (tagCount < 1) return pos
    } else if (code.slice(pos, pos + separatorLen) === separator) {
      ++tagCount
      pos += separatorLen
    } else {
      ++pos
    }
  }
  console.log(`can not find mathed separator ${closeSep} for ${separator}`)
  return pos
}

/**
 * try skip blank, comment, block comment
 * @param  {String} code code string
 * @param  {Number} pos  pos to start skip
 * @return {Number}      the first position witch contains sensitve char after pos
 */
function skipNonsense (code: string, pos: number) {
  const totalLen = code.length
  while (pos < totalLen) {
    const prev = pos
    pos = skipBlank(code, pos)
    pos = skipComment(code, pos)
    pos = skipBlockComment(code, pos)
    if (prev === pos) return pos
  }
  return pos
}

/**
 * try skip blank
 * @param  {String} code code string
 * @param  {Number} pos  pos to start skip
 * @return {Number}      pos
 */
function skipBlank (code: string, pos: number) {
  const len = code.length
  while (pos < len) {
    if (/\s/.test(code[pos])) {
      ++pos
    } else {
      return pos
    }
  }
  return pos
}

/**
 * try skip comment start with //
 * @param  {String} code code string
 * @param  {Number} pos  pos to start
 * @return {Number}      next char of end of the comment
 */
function skipComment (code: string, pos: number) {
  if (code.slice(pos, pos + 2) !== '//') return pos
  pos += 2
  const len = code.length
  while (code[pos++] !== '\n' && len > pos) {}
  return pos
}

/**
 * try skip block comment start with /*
 * @param  {String} code code string
 * @param  {Number} pos  pos to start
 * @return {Number}      next char of end of the block comment
 */
function skipBlockComment (code: string, pos: number) {
  if (code.slice(pos, pos + 2) !== '/*') return pos
  pos += 2
  const len = code.length
  while (len > pos) {
    if (code.slice(pos, pos + 2) === '*/') return pos + 2
    ++pos
  }
  return pos
}

/**
 * get the first char in code start at startAt
 * @param  {String} code    code string
 * @param  {String} char    single char
 * @param  {Number} startAt pos start to search
 * @return {Number}         first match position
 */
function getPosOf (code: string, char: string, startAt = 0) {
  let pos = startAt
  const codeLen = code.length
  const len = char.length
  while (pos < codeLen) {
    if (code.slice(pos, pos + len) === char) {
      return pos
    } else {
      ++pos
    }
  }
  return null
}

/**
 * Reg to match var indentify
 * @type {RegExp}
 */
const ID_REG = /[\.\w$]/
function isIdenChar (char: string) {
  return ID_REG.test(char)
}

/**
 * find the end pos of an identify
 *   if the given pos is not valid identify, then return pos itself
 * @param  {String} code code string
 * @param  {Number} pos  pos to start find
 * @return {Number}      end pos
 */
function getIdenfiyEndPos (code: string, pos: number) {
  const len = code.length
  while (len > pos) {
    const char = code[pos]
    if (isIdenChar(char) || (/\s/.test(char) && char !== '\n')) {
      ++pos
      pos = skipNonsense(code, pos)
    } else {
      return pos
    }
  }
  return pos
}

/**
 * is sentense separator, aka , ;
 * @param  {String}  char single char
 * @return {Boolean}
 */
function isSentenseSep (char: string) {
  return char === ';' || char === ','
}

/**
 * get code block type
 * @param  {String} sep    separator char
 * @param  {Array} result all result genrated by now
 * @return {String}        block type
 */
function getBlockType (sep: string, result?: CodeParseResult): CodeBlockType {
  const prev = result && result[result.length - 1]
  switch (sep) {
    case "'":
    case '"':
    case '`':
      return CodeBlockType.string
    case '{':
      if (prev && prev.type === 'bracket') {
        return CodeBlockType.funcBlock
      } else {
        return CodeBlockType.object
      }
    case '[':
      return CodeBlockType.array
    case ':':
      return CodeBlockType.keyVal
    case '(':
      return CodeBlockType.bracket
    default:
      // console.warn('unsupported code block', sep)
      return CodeBlockType.statement
  }
}

/**
 * parse a code string
 * @param  {String} code    code string
 * @param  {Array}  result  result which to store
 * @param  {Number} startAt position start to parse
 * @param  {Number} endAt   position stop to parase
 * @return {Array}          parsed array
 */
function parse (code: string, result: CodeParseResult = [], startAt = 0, endAt = Infinity) {
  if (!code) return result
  const totalLen = Math.min(code.length, endAt)
  let pos = startAt
  while (pos < totalLen) {
    let item = {} as CodeParseResultItem
    let initPos = pos
    pos = skipNonsense(code, pos)
    if (pos >= totalLen) break
    const char = code[pos]
    let startPos = pos
    // parse code block start with
    if (isIdenChar(char)) {
      pos = getIdenfiyEndPos(code, pos)
      item.indentify = code.slice(startPos, pos)
      item.type = getBlockType(code[pos], result)
      if (item.type === 'keyVal') {
        pos = skipNonsense(code, pos + 1)
      }
      startPos = pos
      pos = getCodeBlockPos(code, pos)
      item.value = code.slice(startPos, pos)
      item.raw = code.slice(initPos, pos)
      item.valueType = getBlockType(code[startPos])
      if (item.type === CodeBlockType.object ||
        item.valueType === CodeBlockType.object) {
        item.children = parse(code, [], startPos + 1, pos - 1)
      }
      result.push(item)
      if (isSentenseSep(code[pos])) ++pos
    } else if (SEPARATORS[char]) {
      // console.log('in separator', char)
      item.type = getBlockType(char, result)
      pos = getCodeBlockPos(code, pos)
      item.value = code.slice(initPos, pos)
      item.raw = code.slice(initPos, pos)
      if (item.type === CodeBlockType.function) {
        const last = result[result.length - 1]
        last.type = CodeBlockType.function
        last.valueType = CodeBlockType.function
        last.value += item.value
        last.raw += item.value
        let lastButOne = result[result.length - 2]
        if (lastButOne && /^\s*\bfunction\b/.test(lastButOne.value)) {
          lastButOne.type = last.type
          lastButOne.valueType = last.valueType
          lastButOne.value += last.value
          lastButOne.raw += last.raw
          result.pop()
        }
      } else {
        result.push(item)
      }
      if (isSentenseSep(code[pos])) ++pos
    } else {
      const last = result[result.length - 1]
      // arrow function
      if (code.slice(pos, pos + 2) === '=>' && last) {
        let prevPos = skipNonsense(code, pos + 2)
        pos = getCodeBlockPos(code, prevPos)
        if (pos > prevPos) {
          const funBody = code.slice(initPos, pos)
          last.value += funBody
          last.raw += funBody
          continue
        }
      }
      console.log(
        'code style not support',
        char,
        code.slice(pos - 10, pos + 10)
      )
      item.value = 'shit, noting found'
      result.push(item)
      ++pos
    }
  }
  return result
}

module.exports = {
  SEPARATORS,
  getCodeBlockPos,
  skipNonsense,
  skipBlank,
  skipComment,
  skipBlockComment,
  getPosOf,
  getIdenfiyEndPos,
  parse
}
