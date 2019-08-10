const checkError = (op, alt) => {
  try {
    return op()
  } catch(e) {
      return alt
  }
}
const serialize = val => val instanceof Date ? value.getTime() : null
const parseValue = val => 
  checkError(() => val == null ? null : new Date(val), null)
const parseLiteral = ast => ast.kind === Kind.INT ? new Date(ast.value) : null

export const Date = {
  serialize,
  parseLiteral,
  parseValue
}
