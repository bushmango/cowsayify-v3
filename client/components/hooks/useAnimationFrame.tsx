// see: https://usehooks.com/useAnimation/

import { useState, useEffect, useRef } from 'react'

export function useAnimationFrame() {
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    const start = Date.now()
    let animationFrame = null
    const onFrame = () => {
      setElapsedMs(Date.now() - start)
      loop()
    }
    animationFrame = requestAnimationFrame(onFrame)
    const loop = () => {
      animationFrame = requestAnimationFrame(onFrame)
    }
    loop()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return elapsedMs
}
