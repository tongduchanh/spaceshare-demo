import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Accordion.scss'
import Chevron from '../Chevron'

function Accordion(props) {
  const [setActive, setActiveState] = useState('')
  const [setHeight, setHeightState] = useState('0px')
  const [setRotate, setRotateState] = useState('accordion__icon')

  const content = useRef(null)

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '')
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`,
    )
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate',
    )
  }

  return (
    <div className="accordion__section">
      <div className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div className="accordion__title">{props.title}</div>
        <Chevron className={`${setRotate}`} width={10} fill={'#777'} />
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  )
}

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  defaultOpen: PropTypes.bool,
}
export default Accordion
