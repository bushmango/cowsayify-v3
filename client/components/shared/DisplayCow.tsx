import cowsay from 'cowsay-browser'
import styles from './DisplayCow.scss'

import { ICowOptions } from 'state/stateCowsay'

const DisplayCow = (props: { options: ICowOptions }) => {
  let { options } = props

  if (!options || !options.text) {
    options = {
      text: 'Whomp',
    } as any
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
