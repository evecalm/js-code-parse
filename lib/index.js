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
}

/**
 * get corresponed separator pos
 * @param  {String} code          code string
 * @param  {Number} startPosition separator start pos
 * @return {Number}               separator close pos
 */
function getCodeBlockPos (code, startPosition) {
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
}

/**
 * try skip blank, comment, block comment
 * @param  {String} code code string
 * @param  {Number} pos  pos to start skip
 * @return {Number}      the first position witch contains sensitve char after pos
 */
function skipNonsense (code, pos) {
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
 * @param  {[type]} code [description]
 * @param  {[type]} pos  [description]
 * @return {[type]}      [description]
 */
function skipBlank (code, pos) {
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
function skipComment (code, pos) {
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
function skipBlockComment (code, pos) {
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
function getPosOf (code, char, startAt = 0) {
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
function isIdenChar (char) {
  return ID_REG.test(char)
}

/**
 * find the end pos of an identify
 *   if the given pos is not valid identify, then return pos itself
 * @param  {String} code code string
 * @param  {Number} pos  pos to start find
 * @return {Number}      end pos
 */
function getIdenfiyEndPos (code, pos) {
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
function isSentenseSep (char) {
  return char === ';' || char === ','
}

/**
 * get code block type
 * @param  {String} sep    separator char
 * @param  {Array} result all result genrated by now
 * @return {String}        block type
 */
function getBlockType (sep, result) {
  const prev = result && result[result.length - 1]
  switch (sep) {
    case "'":
    case '"':
    case '`':
      return 'string'
    case '{':
      if (prev && prev.type === 'bracket') {
        return 'funcBlock'
      } else {
        return 'object'
      }
    case '[':
      return 'array'
    case ':':
      return 'keyVal'
    case '(':
      return 'bracket'
    default:
      // console.warn('unsupported code block', sep)
      return 'code'
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
function parse (code, result = [], startAt = 0, endAt = Infinity) {
  if (!code) return result
  const totalLen = Math.min(code.length, endAt)
  let pos = startAt
  while (pos < totalLen) {
    let item = {}
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
      item.raw = code.slice(startPos, pos)
      item.rawWrapper = code.slice(initPos, pos)
      if (item.type === 'object' || getBlockType(code[startPos]) === 'object') {
        item.children = parse(code, [], startPos + 1, pos - 1)
      }
      result.push(item)
      if (isSentenseSep(code[pos])) ++pos
    } else if (SEPARATORS[char]) {
      item.type = getBlockType(char, result)
      pos = getCodeBlockPos(code, pos)
      item.raw = code.slice(initPos, pos)
      if (item.type === 'funcBlock') {
        const last = result[result.length - 1]
        last.type = 'function'
        last.raw += item.raw
        last.rawWrapper += item.raw
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
          last.raw += funBody
          last.rawWrapper += funBody
          continue
        }
      }
      console.log(
        'code style not support',
        char,
        code.slice(pos - 10, pos + 10)
      )
      result.push({
        text: 'shit, noting found'
      })
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
