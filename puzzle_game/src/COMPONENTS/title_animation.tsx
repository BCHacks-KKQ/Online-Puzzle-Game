import React from 'react'
import TextTransition, { presets } from 'react-text-transition'

const Header = () => {
  const TEXTS = ['PUZZLE GAME', 'FUN TO PLAY']
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    )
    return () => clearTimeout(intervalId)
  }, [])

  return (
    <h1 style={{ fontFamily: 'Shalimar' }}>
      <TextTransition
        text={TEXTS[index % TEXTS.length]}
        springConfig={presets.wobbly}
      />
    </h1>
  )
}
export default Header
