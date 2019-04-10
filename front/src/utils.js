import { slugify } from 'markdown-toc/lib/utils'

// -------------------------------------------------------------------------------------------------- //
// Misc
// -------------------------------------------------------------------------------------------------- //

function toCamelCase(string) {
  return string.replace(/_([a-z])/g, (_, n) => n.toUpperCase())
}

function toSnakeCase(string) {
  return string.replace(/(.)([A-Z][a-z])/g, "$1_$2").replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()
}

function withObjectKeys(object, formatter) {
  if (typeof object === typeof 1 || typeof object === typeof " ") return object
  if (object instanceof Array) return object.map((element) => withObjectKeys(element, formatter))
  return Object.keys(object).reduce((formatted, key) => {
    const value = object[key]
    formatted[formatter(key)] = withObjectKeys(value, formatter)
    return formatted
  }, {})
}

export function toSnakeCaseObject(object) {
  return withObjectKeys(object, toSnakeCase)
}

export function toCamelCaseObject(object) {
  return withObjectKeys(object, toCamelCase)
}

// -------------------------------------------------------------------------------------------------- //
// Id plugin for remarkable
// -------------------------------------------------------------------------------------------------- //

const heading_open = function(tokens, idx) {
  const token = tokens[idx]
  return `<h${token.hLevel} ${token.slug ? `id="${token.slug}"` : ""} >`
};
// Adapted from original code look for [NEW CODE]
const heading_parser = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos >= max) { return false; }

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && ch !== 0x20/* space */)) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipCharsBack(max, 0x20, pos); // space
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20/* space */) {
    max = tmp;
  }

  state.line = startLine + 1;

  // [NEW CODE] Here we slugify the content and provide the slug property for the
  // new heading_open renderer
  var slug
  if (pos < max) {
    slug = slugify(state.src.slice(pos, max).trim())
  }

  state.tokens.push({ type: 'heading_open',
    hLevel: level,
    lines: [ startLine, state.line ],
    level: state.level,
    // [NEW CODE]
    slug
  });

  // only if header is not empty
  if (pos < max) {
    state.tokens.push({
      type: 'inline',
      content: state.src.slice(pos, max).trim(),
      level: state.level + 1,
      lines: [ startLine, state.line ],
      children: []
    });
  }
  state.tokens.push({ type: 'heading_close', hLevel: level, level: state.level });

  return true;
};

export function withHeadingIds(md) {
  md.block.ruler.at('heading', heading_parser)
  md.renderer.rules.heading_open = heading_open
}