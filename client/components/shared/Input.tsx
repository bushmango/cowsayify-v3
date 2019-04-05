import React from 'react'

function Input<T>(props: {
  onChange: (newVal) => void
  value: string
  width?: string
  id?: string
  name?: string
  testId?: string
  placeholder?: string
  maxLength?: number
}) {
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = ev.target.value
    props.onChange(newVal)
  }
  let val = props.value

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
        maxLength={props.maxLength}
      />
    </div>
  )
}

export { Input }
