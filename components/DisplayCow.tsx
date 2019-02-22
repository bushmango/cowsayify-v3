import cowsay from 'cowsay-browser'
import styles from '../pages/cowsay.scss'

const DisplayCow = (props: { options }) => {
  const { options } = props

  if (!options || !options.text) {
    return <div>whomp</div>
  }

  return (
    <div className={styles.cowBox}>
      <pre>
        {options.action === 'think'
          ? cowsay.think(options)
          : cowsay.say(options)}
      </pre>
    </div>
  )
}

export default DisplayCow
