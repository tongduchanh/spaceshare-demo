import React from 'react'
import PropTypes from 'prop-types'

const MinusIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="presentation"
    aria-hidden="true"
    focusable="false"
    style={{
      width: `${props.width || 24}px`,
      height: `${props.height || 24}px`,
      fill: 'currentColor',
      display: 'block',
    }}
  >
    <rect height="2" rx="1" width="12" x="6" y="11" />
  </svg>

)

MinusIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  fill: PropTypes.string,
}
export default MinusIcon
