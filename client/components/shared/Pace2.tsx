import React from 'react'
const { useEffect } = React

const Pace2 = (props: { isLoading }) => {
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    let timeoutId: any = null

    if (props.isLoading) {
      timeoutId = setTimeout(() => {
        if (props.isLoading) {
          setCount(count + 1)
        } else {
          setCount(0)
        }
      }, 1000 / 60)
    } else {
      setCount(0)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })

  let y = (1 - 1 / ((count - 2) / 5 + 1)) * 100
  if (count <= 5 || !props.isLoading) {
    y = 0
  }

  return (
    <div
      style={{
        width: y + '%',
        backgroundColor: props.isLoading && '#aaa',
        height: '3px',
        maxHeight: '3px',
      }}
    >
      &nbsp;
    </div>
  )
}
export { Pace2 }
