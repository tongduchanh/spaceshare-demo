import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import classnames from 'classnames'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery'

function SpaceGallerySlider(props) {
  const [hovered, setHovered] = useState(false)
  const [hoverItem, setHoverItem] = useState(null)
  const {photos} = props
  const settings = {
    infinite: false,
    slidesToShow: 1,
    variableWidth: true,
    speed: 800,
    swipe: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          slidesToShow: 1,
          speed: 400,
          swipe: true,
        }
      },
      
    ]
  }

  function handleHover(key) {
    setHovered(!hovered)
    setHoverItem(key)
  }

  return (
    <div 
      className={classnames(
        'space-detail__gallery', 
        {
        'is-hovering': hovered
        })
      }
    >
      <LightgalleryProvider 
        lightgallerySettings={
          {
            download: false,
          }
        }
      >
        <Slider {...settings}>
          {photos && photos.map((val, key) => {
            return (
              <div key={key} className="space-detail__gallery-image">
                <LightgalleryItem src={val.photo} group="space">
                  <img src={val.photo}
                    className={classnames(
                    {
                    'is-hover': hovered && hoverItem === key
                    })
                  }
                    onMouseEnter={() => handleHover(key)}
                    onMouseLeave={() => handleHover(key)}
                  />
                </LightgalleryItem>
              </div>
            )
          })}
        </Slider>
      </LightgalleryProvider>
    </div>
  )
}

SpaceGallerySlider.propTypes = {
  photos: PropTypes.array
}

export default SpaceGallerySlider
