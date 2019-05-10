console.warn = jest.fn((...warn) => {
  console.log('warning', ...warn)
  throw new Error(...warn)
})
console.error = jest.fn((...err) => {
  console.log('error', ...err)
  throw new Error(...err)
})

jest.setTimeout(30000)
