import React from 'react'

import './Header.css'

const Header = ({ routes, current, onChange }) => {
  return (
    <div className="Header">
      <div className="Header-title">word2vec</div>
      <div className="Header-routes">
        {routes.map((r, i) => {
          return (
            <div key={i} className={`Header-route ${r.title}`} onClick={() => onChange(i)}>
              {r.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
