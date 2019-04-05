import React from 'react'

function Input<T>(props: {
  onChange: (newVal) => void
  val: string
  width?: string
  id?: string
  name?: string
  testId?: string
  placeholder?: string
}) {
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = ev.target.value
    props.onChange(newVal)
  }
  let val = props.val

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        value={val as any}
        style={{ width: props.width, minWidth: props.width }}
        id={props.id}
        name={props.name}
        data-t={props.testId}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export { Input }
