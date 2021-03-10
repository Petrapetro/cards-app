import React, { useState } from 'react'
import { useSpring, animated as a } from 'react-spring'
import './styles.css'

function Card({children, name}) {
  const [flipped, set] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  const handleOnClick = () => {
    if (!isFlipped) {
      set(state => !state)
      setIsFlipped(true)
    }
  }
  return (
    <div className="card" onClick={handleOnClick}>
      <a.div className="c back" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}><h1>{name}</h1></a.div>
      <a.div className="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>{children}</a.div>
    </div>
  )
}

export default Card
