import * as React from 'react'
const { useEffect } = React

const Pace = (props: { isLoading }) => {
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    if (props.isLoading) {
      setTimeout(() => {
        if (props.isLoading) {
          setCount(count + 1)
        } else {
          setCount(0)
        }
      }, 1000 / 60)
    } else {
      setCount(0)
    }
  })

  let y = (1 - 1 / ((count - 2) / 5 + 1)) * 100
  if (count <= 2 || !props.isLoading) {
    y = 0
  }

  return (
    <div
      style={{
        width: y + '%',
        backgroundColor: props.isLoading && '#aaa',
        height: '3px',
        maxHeight: '3px',
        position: 'fixed',
        top: '2px',
        borderRadius: '2px',
      }}
    >
      &nbsp;
    </div>
  )
}
export { Pace }
