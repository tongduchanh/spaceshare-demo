import React from 'react'
import PropTypes from 'prop-types'

const SectionDevide = (props) => {
  return (
    <div className={`section-divide mt--30 mb--30 ${props.variant}`}>
      <div />
    </div>
  )
}

SectionDevide.propTypes = {
  variant: PropTypes.string
}

export default SectionDevide
