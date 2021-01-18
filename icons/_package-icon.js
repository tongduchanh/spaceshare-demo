import React from 'react'
import PropTypes from 'prop-types'

const PackageIcon = (props) => (
    <svg viewBox="0 0 24 24" fill={props.fill} role="presentation" aria-hidden="true" focusable="false" className={props.className}
      style={{ width: `${props.width}px`, height: `${props.height}px` }}
    >
      <path pid="0" d="M21.957 5.025h-4.99v-.998c0-1.1-.895-1.996-1.996-1.996H8.982c-1.1 0-1.996.895-1.996 1.996v.998h-4.99C.896 5.025 0 5.921 0 7.021v12.975c0 1.1.895 1.996 1.996 1.996h19.961c1.101 0 1.996-.895 1.996-1.996V7.021c0-1.1-.895-1.996-1.996-1.996zM7.984 4.027a1 1 0 01.998-.998h5.989a1 1 0 01.998.998v.998H7.984v-.998zm14.971 15.97a1 1 0 01-.998.997H1.997a1 1 0 01-.999-.998v-7.264c.295.172.633.278.998.278h7.985v1.497c0 .276.223.499.499.499h2.994a.499.499 0 00.499-.5V13.01h7.984c.365 0 .703-.106.998-.278v7.264zm-11.976-5.99v-1.995h1.996v1.996h-1.996zm11.976-2.993a1 1 0 01-.998.998h-7.984v-.5a.499.499 0 00-.5-.498H10.48a.499.499 0 00-.5.499v.499H1.996a1 1 0 01-.998-.998V7.02a1 1 0 01.998-.998h19.961a1 1 0 01.998.998v3.993z" fillRule="nonzero" />
    </svg>
)

PackageIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default PackageIcon
