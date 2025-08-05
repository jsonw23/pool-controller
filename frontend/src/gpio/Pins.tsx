import { useGpioPinsQuery } from '../generated/graphql';

import styles from './Pins.module.scss'

const Pins = () => {
  const { loading, error, data } = useGpioPinsQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  if (!data?.gpioPins) {
    return <p>No pins configured</p>
  }

  // sort the GPIO pins by physical pin
  const physicalPins = data?.gpioPins?.slice().sort((a, b) => {
    if (a?.physicalPin && b?.physicalPin) {
        return a.physicalPin - b.physicalPin
    }
    return 0
  })

  type IteratorResult<T> =
    | { value: T; done: false }
    | { value: undefined; done: true }

  function makeIterator<T>(arr: T[]): Iterator<T> {
    let index = 0;
    return {
        next(): IteratorResult<T> {
            if (index < arr.length) {
                return { value: arr[index++], done: false}
            }
            return { value: undefined as unknown as T as any, done: true}
        }
    }
  }

  const pinSVG = (
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5"/>
    </svg>
  )

  // build a 40 pin layout as list items for an ordered list
  const pins = []
  const it = makeIterator(physicalPins)
  let nextPin = it.next()
  for (let i = 1; i <= 40; i++) {
    if (!nextPin.done && nextPin.value?.physicalPin == i) {
        pins.push((
            <li className={styles.position} key={i}>
                <div className={[styles.marker, nextPin.value.reservedFor ?  styles.reserved : ''].join(' ')}>{pinSVG}</div>
                <div className={styles.label}>
                    <div className={styles.gpioLabel}>GPIO {nextPin.value.number}{nextPin.value.reservedFor && "*"}</div>
                    
                </div>
            </li>
        ))
        nextPin = it.next()
    } else {
        pins.push((
            <li className={styles.position} key={i}>
                <div className={[styles.marker, styles.other].join(' ')}>{pinSVG}</div>
            </li>
        ))
    }
  }

  return (
    <div className={styles.board}>
      <ol className={styles.pins}>
        {pins}
      </ol>
    </div>
  )
}

export default Pins