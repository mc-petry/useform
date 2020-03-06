/**
 * @internal
 */
export async function delay(ms: number = 0) {
  return new Promise(r => setTimeout(r, ms))
}
