
import React from 'react'
import PropTypes from 'prop-types'
import {CardImg} from 'reactstrap'

const dummy = 'static/images/dummny.png'

class SpaceImage extends React.Component {
  render () {
    const {index, image} = this.props
    return (
      <CardImg alt={`flexible-${index}`} top src={image || dummy} />
    )
  }
}

SpaceImage.propTypes = {
  image: PropTypes.string,
  index: PropTypes.number,
}

export default SpaceImage
