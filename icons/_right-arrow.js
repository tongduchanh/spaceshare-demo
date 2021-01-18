import React from 'react'
import PropTypes from 'prop-types'

const RightArrow = (props) => (
  <span className="d-inline-flex">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129" 
      style={{ width: `${props.w}px`, height: `${props.h}px`, fill: `${props.fill}` }}
    >
      <g>
        <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
      </g>
    </svg>
  </span>
)

RightArrow.propTypes = {
  className: PropTypes.string,
  w: PropTypes.number,
  h: PropTypes.number,
  fill: PropTypes.string
}
export default RightArrow
