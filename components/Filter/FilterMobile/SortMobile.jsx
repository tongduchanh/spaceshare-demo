import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './SortMobile.style.scss'

function SortMobile({ options, onChange, defaultValue, placeholder }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const handleSelect = (val) => {
    onChange(val)
    toggle()
  }
  return (
    <div className="sort-container">
      <div className="dropdown">
        <div className="dropdown__header" onClick={toggle}>
          <div className="dropdown__value">
            {(defaultValue && defaultValue.label) || placeholder}
          </div>
          <div className="dropdown__icon-wrapper">
            <span className="dropdown__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M31.8 7.8c-.3-.3-.8-.3-1.1 0L16 22.6 1.3 7.8C1 7.6.5 7.6.2 7.8s-.3.8 0 1.1l15.2 15.2c.1.1.3.2.5.2s.4-.1.5-.2L31.8 8.9c.3-.3.3-.8 0-1.1z" />
              </svg>
            </span>
          </div>
        </div>
        {dropdownOpen && (
          <div className="dropdown__content">
            {options.map((val, key) => (
              <div
                className="dropdown__item"
                key={key}
                onClick={() => handleSelect(val)}
              >
                {val.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
SortMobile.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
}
export default SortMobile
