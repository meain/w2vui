import React from 'react'

import './WordSet.css'

const WordSet = ({ title, color, words, onSelect }) => {
  return (
    <div className={`WordSet container ${color}`}>
      <h5 className={`header ${color}`}>{title}</h5>
      <div className="contents">
        {words.map(w => (
          <span key={w} className={`word ${color}`} onClick={() => onSelect(w)}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}

export default WordSet
