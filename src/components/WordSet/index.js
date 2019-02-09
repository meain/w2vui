import React from 'react'

import './WordSet.css'
import Percentage from '../Percentage'

const WordSet = ({ title, color, words, onSelect }) => {
  return (
    <div className={`WordSet container ${color}`}>
      <h3 className={`WordSet-header ${color}`}>{title}</h3>
      <div className="WordSet-contents">
        {words.map(w => (
          <div key={w[0]} className={`WordSet-word-wrapper ${color}`} onClick={() => onSelect(w)}>
            <div>
              <span className="WordSet-word">{w[0]}</span>{' '}
              <span className="WordSet-percentage">{w[1] * 100 + '%'}</span>
            </div>
            <Percentage percentage={w[1]} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordSet
