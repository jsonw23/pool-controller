import { styled } from '@mui/joy/styles'

import { GpioPin, useGpioPinsQuery } from '../generated/graphql';
import { Theme } from '@mui/joy';

const Pins = () => {
  const { loading, error, data } = useGpioPinsQuery()

  type IteratorResult<T> =
    | { value: T; done: false }
    | { value: undefined; done: true }

  function makeIterator<T>(arr: T[]): Iterator<T> {
    let index = 0;
    return {
      next(): IteratorResult<T> {
        if (index < arr.length) {
          return { value: arr[index++], done: false }
        }
        return { value: undefined as unknown as T as any, done: true }
      }
    }
  }

  const pinSVG = (
    <svg fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" />
    </svg>
  )

  let physicalPins: GpioPin[] = []
  if (data && data.gpioPins) {
    // sort the GPIO pins by physical pin
    physicalPins = data.gpioPins.slice().sort((a, b) => {
      if (a.physicalPin && b.physicalPin) {
        return a.physicalPin - b.physicalPin
      }
      return 0
    })
  }

  const Board = styled('div')(({ theme }) => ({
    backgroundColor: theme.vars.palette.neutral.softActiveBg,
    width: 230,
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const PinLayout = styled('ol')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, auto)',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    counterReset: 'item',
  }))

  const Position = styled('li')(({ theme }) => ({
    counterIncrement: 'item',
    position: 'relative',
    display: 'flex',
    gap: 24,
    textWrap: 'nowrap',
    '&:nth-child(odd)': {
      flexDirection: 'row-reverse'
    },
  }))

  type PinProps = {
    isEven: boolean
    isGPIO?: boolean
    reservedFor?: string | null
    used?: boolean
  }

  const getPinColor = (theme: Theme, props: PinProps): string => {
    if (props.reservedFor) return theme.vars.palette.neutral[400]
    if (props.isGPIO) return theme.vars.palette.neutral[300]
    return theme.vars.palette.neutral[500]
  }

  const Pin = styled('div')<PinProps>(({ theme, ...props }) => ({
    position: 'relative',
    backgroundColor: '#262626',
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: getPinColor(theme, props),
    '&::before,&::after': {
      color: theme.vars.palette.text.secondary,
      fontSize: 8,
      fontWeight: 'bold',
    },
    ...(!props.isEven && {
      '&::before': {
        content: 'counter(item)',
        position: 'absolute',
        left: -18,
        width: 16,
        textAlign: 'right',
      }
    }),
    ...(props.isEven && {
      '&::after': {
        content: 'counter(item)',
        position: 'absolute',
        right: -18,
        width: 16,
      }
    }),
    div: {
      width: 10,
      height: 10,
      backgroundColor: theme.vars.palette.neutral[500],
    }
  }))

  const Label = styled('div')(({ theme }) => ({
    display: 'inline-block',
    width: 55,
    fontSize: '.8em',
    lineHeight: '20px',
    color: theme.vars.palette.text.primary
  }))

  // build a 40 pin layout as list items for an ordered list
  const pins = []
  const it = makeIterator(physicalPins)
  let nextPin = it.next()
  for (let i = 1; i <= 40; i++) {
    if (!nextPin.done && nextPin.value.physicalPin == i) {
      pins.push((
        <Position key={i}>
          <Pin isEven={i % 2 == 0} isGPIO reservedFor={nextPin.value.reservedFor}>{pinSVG}</Pin>
          <Label>
            GPIO {nextPin.value.number}{nextPin.value.reservedFor && "*"}
          </Label>
        </Position>
      ))
      nextPin = it.next()
    } else {
      pins.push((
        <Position key={i}>
          <Pin isEven={i % 2 == 0}>{i > 1 && pinSVG}{i == 1 && <div />}</Pin>
        </Position>
      ))
    }
  }

  return (
    <Board>
      <PinLayout>
        {pins}
      </PinLayout>
    </Board>
  )
}

export default Pins