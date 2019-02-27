import cowsay from 'cowsay-browser'
import displayCowStyles from './DisplayCow.scss'

const DisplayCow = (props: { options }) => {
  let { options } = props

  if (!options || !options.text) {
    options = {
      text: 'Whomp',
    } as any
  }

  return (
    <div className={displayCowStyles.cowBox}>
      <pre>
        {options.action === 'think'
          ? cowsay.think(options)
          : cowsay.say(options)}
      </pre>
    </div>
  )
}

export default DisplayCow
