import { configureApp } from './app'

export function start() {
  const port = 3005
  configureApp().listen(port)
  console.log(`Listening on port ${port}`)
}
