import React from 'react'

function TextArea<T>(props: {
  onChange: (newVal) => void
  val: string
  width?: string
  id?: string
  name?: string
  testId?: string
  placeholder?: string
}) {
  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newVal = ev.target.value
    props.onChange(newVal)
  }
  let val = props.val

  return (
    <div>
      <textarea
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

export { TextArea }
