export function x(message, ...args) {
  if (typeof console !== 'undefined') {
    console.log(message, ...args)
  }
}
