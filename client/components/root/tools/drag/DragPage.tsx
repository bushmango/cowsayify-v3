import React, { useEffect } from 'react'
import styles from './DragPage.scss'
import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'

let initItems = ['hello', 'world', 'to', 'be', 'or', 'not', 'to', 'be']

const Drag = () => {
  return (
    <Layout title='drag test'>
      <DragPage />
    </Layout>
  )
}

const DragPage = () => {
  let [items, setItems] = React.useState<Array<any>>(
    _.map(initItems, (c, cIdx) => ({ id: cIdx + 1, label: c }))
  )

  let refContainer = React.useRef<HTMLDivElement>(null)
  let [selectedItem, setSelectedItem] = React.useState(null)
  let [mouseXy, setMouseXy] = React.useState([0, 0])
  let [dropLoc, setDropLoc] = React.useState(null)

  let numItems = items.length
  let height = 60
  let margins = 12

  useEffect(() => {})

  useEffect(() => {
    const getNewPos = () => {
      let newPos = Math.floor((mouseXy[1] - 20) / (height + margins))
      if (newPos < 0) {
        newPos = 0
      }
      if (newPos > numItems) {
        newPos = numItems
      }
      return newPos
    }

    const onMouseMove = (ev) => {
      if (refContainer.current) {
        let el = refContainer.current
        let rect = el.getBoundingClientRect()
        let x = ev.clientX - rect.left
        let y = ev.clientY - rect.top
        setMouseXy([x, y])

        if (selectedItem) {
          let newPos = getNewPos()
          setDropLoc(newPos)
        }
      }
    }
    const onMouseUp = (ev) => {
      if (selectedItem) {
        let newPos = getNewPos()
        let oldPos = items.indexOf(selectedItem)
        if (newPos !== oldPos) {
          let newItems = _.clone(items)
          _.remove(newItems, selectedItem)
          if (oldPos < newPos) {
            newPos--
          }
          newItems.splice(newPos, 0, selectedItem)
          setItems(newItems)
        }
      }
      setDropLoc(null)
      setSelectedItem(null)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  })

  return (
    <div>
      <div>
        Drag page location props {mouseXy[0]} - {mouseXy[1]}
        <div
          ref={refContainer}
          className={styles.dNdContainer + ' ' + styles.noTextSelect}
          style={{ height: (height + margins) * numItems + 'px' }}
        >
          {dropLoc != null && selectedItem && (
            <div
              className={styles.dndSelectedLine}
              style={{
                top: dropLoc * (height + margins) - 0 + 'px',
              }}
            />
          )}
          {selectedItem && (
            <div
              key={'selected-' + selectedItem.id}
              className={styles.dNdItem}
              style={{
                height: height + 'px',
                top: mouseXy[1] - 25 + 'px',
                backgroundColor: '#777',
                zIndex: 10000,
              }}
            >
              {selectedItem.id} - {selectedItem.label}
            </div>
          )}

          {_.map(items, (c, cIdx) => {
            return (
              <div
                key={c.id}
                className={
                  styles.dNdItem +
                  (c === selectedItem ? ' ' + styles.dndSelected : '')
                }
                onMouseDown={() => {
                  setSelectedItem(c)
                }}
                style={{
                  height: height + 'px',
                  top: (height + margins) * cIdx + 'px',
                  cursor: 'pointer',
                }}
              >
                {c === selectedItem ? (
                  ''
                ) : (
                  <span>
                    {c.id} - {c.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { DragPage, Drag }
