import React from 'react'
import PropTypes from 'prop-types'

const BookingIcon = (props) => (
    <svg viewBox="0 0 24 24" fill={props.fill} role="presentation" aria-hidden="true" focusable="false" className={props.className}>
      <path pid="0" d="M1 10.04h22V5a1 1 0 00-1-1h-3v1a2 2 0 11-4 0V4H9v1a2 2 0 11-4 0V4H2a1 1 0 00-1 1v5.04zm0 1V21a1 1 0 001 1h20a1 1 0 001-1v-9.96H1zM19 3h3a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V5a2 2 0 012-2h3a2 2 0 114 0h6a2 2 0 114 0zM7 2a1 1 0 00-1 1v2a1 1 0 102 0V3a1 1 0 00-1-1zm10 0a1 1 0 00-1 1v2a1 1 0 002 0V3a1 1 0 00-1-1z" fillRule="nonzero" />
    </svg>
)

BookingIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}
export default BookingIcon
