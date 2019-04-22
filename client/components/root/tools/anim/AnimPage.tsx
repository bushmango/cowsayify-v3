import React, { useEffect, useState } from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'

import { Button } from '@components/common/button/Button'

import styles from './Anim.scss'

import { useAnimation } from '@components/hooks/useAnimation'
import { useAnimationFrame } from '@components/hooks/useAnimationFrame'
import { Pace2 } from '@components/shared/Pace2'

const Anim = () => {
  return (
    <Layout title='Anim'>
      <AnimPage />
    </Layout>
  )
}

// const AnimExample = () => {
//   const animation1 = useAnimation('elastic', 600, 0)

//   return (
//     <div className={styles.animContainer}>
//       An animation {'' + animation1}
//       <div className={styles.anim} style={{ left: animation1 * 200 + 'px' }}>
//         :|
//       </div>
//     </div>
//   )
// }

// const AnimExample2 = () => {
//   const elapsed = useAnimationFrame()

//   return (
//     <div className={styles.animContainer}>
//       An animation 2{'' + elapsed}
//       <div className={styles.anim} style={{ left: (elapsed / 100) * 1 + 'px' }}>
//         :|
//       </div>
//     </div>
//   )
// }

const InfiniteLoader = (props: { isLoading: boolean }) => {
  return <div>{props.isLoading && <InfiniteLoaderInner />}</div>
}

const InfiniteLoaderInner = () => {
  const elapsed = useAnimationFrame()

  let y = 0
  let delay = 250
  if (elapsed > delay) {
    let count = (elapsed - delay) / 60
    y = (1 - 1 / ((count - 2) / 5 + 1)) * 100
  }

  return (
    <div>
      <div className={styles.infiniteLoaderBar} style={{ width: y + '%' }} />
    </div>
  )
}

const AnimPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      <div>Anim</div>
      <Button
        onClick={() => {
          setIsLoading(!isLoading)
        }}
      >
        Toggle
      </Button>
      <InfiniteLoader isLoading={isLoading} />
    </div>
  )
}

export { AnimPage, Anim }
