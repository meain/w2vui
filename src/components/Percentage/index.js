import React from 'react'

import './index.css'

export const affineTransform = (
  a: number,
  b: number,
  c: number,
  d: number,
  value: number
): number => {
  return (value - a) * ((d - c) / (b - a)) + c
}

const Percentage = ({ percentage }) => {
  const color = `hsl( ${120 - affineTransform(1, 0, 1, 120, percentage)}, 80%, 40%)`
  const style = { width: `${percentage*100}%`, background: color }
  return (
    <div className="Percentage">
      <div className="Percentage-meter" style={style} />
    </div>
  )
}

export default Percentage
