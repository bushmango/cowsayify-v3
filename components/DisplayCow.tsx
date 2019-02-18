import cowsay from 'cowsay-browser'
import styles from '../pages/cowsay.scss'

export default function render(options) {
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
