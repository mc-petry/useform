export function isFieldEqual(a: any, b: any) {
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}
