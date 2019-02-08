import React from 'react'

import './Operator.css'

const Operator = ({ word, sign, switchSign, remove, onChange }) => {
  console.log('sign:', sign)
  let plus = ''
  let minus = ''
  if (sign === '+') plus = 'active'
  else if (sign === '-') minus = 'active'

  return (
    <div className="operator">
      <span className="sign" onClick={switchSign}>
        <span className={`symbol plus ${plus}`}>+</span>
        <span className={`symbol minus ${minus}`}>-</span>
      </span>
      <input className="op" type="text" value={word} onChange={e => onChange(e.target.value)} />
      <span className="remove" onClick={remove}>
        rm
      </span>
    </div>
  )
}

export default Operator
