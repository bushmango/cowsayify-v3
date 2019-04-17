export function isServer() {
  return typeof document === 'undefined'
}
