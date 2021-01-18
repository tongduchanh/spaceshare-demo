import React from 'react'
import PropTypes from 'prop-types'

const LogoutIcon = (props) => (
    <svg viewBox="0 0 24 24" fill={props.fill} role="presentation" aria-hidden="true" focusable="false" className={props.className}>
      <g><path pid="0" d="M16.92 1.617c-.28.344-.116.824.251 1.036 3.115 1.802 5.794 5.462 5.794 9.31 0 5.741-5.258 11.08-11 11.08-5.74 0-10.942-5.339-10.942-11.08 0-3.851 2.42-7.245 5.524-9.06.39-.23.647-.669.435-1.035-.212-.367-.623-.464-.99-.251A11.944 11.944 0 0 0 .02 11.963c0 6.603 5.343 11.946 11.946 11.946 6.602 0 11.946-5.343 11.946-11.946 0-4.406-2.392-8.275-5.973-10.347-.366-.212-.739-.344-1.018 0z" fill="#000"></path><path pid="1" d="M11.441.715a.5.5 0 1 1 1 0v9.769a.5.5 0 0 1-1 0V.714z" fill="#222" fillRule="nonzero"></path></g>
    </svg>
)

LogoutIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

export default LogoutIcon
