import React from 'react'
import PropTypes from 'prop-types'

const CloseIcon = (props) => (
    <svg viewBox="0 0 32 32" role="presentation" aria-hidden="true" focusable="false" className={props.className}
      style={{ 
        width: `${props.width || 16}px`, 
        height: `${props.height || 16}px`, 
        fill: `${props.fill}`, 
        stroke: 'currentcolor',
        strokeWidth: 3, 
        overflow: 'visible' 
    }}
    >
      {/* <path d="m11.5 10.5c.3.3.3.8 0 1.1s-.8.3-1.1 0l-4.4-4.5-4.5 4.5c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1l4.5-4.5-4.4-4.5c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l4.4 4.5 4.5-4.5c.3-.3.8-.3 1.1 0s .3.8 0 1.1l-4.5 4.5z" fillRule="evenodd" /> */}
      <path d="m6 6 20 20"></path>
      <path d="m26 6-20 20"></path>
    </svg>
)

CloseIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string
}

export default CloseIcon
