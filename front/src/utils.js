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
