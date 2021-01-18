/**
 * @author HanhTD
 * Banner component
 */
import React from 'react'
import PropTypes from 'prop-types'
import {isSafari} from 'react-device-detect'

import Slider from 'react-slick'
import { withTranslation } from '../../i18n'

class Banner extends React.Component {
  state = {
    banners: [],
    activeIndex: 0,
    windowWidth: 0
  }

  setWidth = () => {
    this.setState({
      windowWidth: window.innerWidth
    })
  }

  componentDidMount() {
    // Tính chiều rộng window để hiển thị responsive cho datepicker
    this.setState({
      windowWidth: window.innerWidth
    })
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.banners !== state.banners) {
      return {
        banners: props.banners
      }
    } else return null
  }

  render() {
    const {banners, windowWidth} = this.state

    const settings = {
      infinite: false,
      slidesToShow: 3,
      speed: 800,
      swipe: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            swipe: true,
            slidesToShow: 1,
            variableWidth: true
          }
        }, 
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          }
        }, 
      ]
    }
    return (
      <div>
        <div className="section__body">
          {windowWidth > 767 && (
            <div className="banner banner__slider">
              <Slider {...settings}>
                {banners && banners.map((val, key) => (
                  <div key={key} className="banner__item" style={{width: `272px`}}>
                    <a href={val.link} className="is-relative frame-wrap" target="_blank" rel="noreferrer noopener">
                      <img src={val.image} alt={`banner-${key}`} />
                      {!isSafari && (
                        <div className="frame-shadow">
                          <img src={val.image} alt={`banner-${key}`} />
                        </div>
                      )}
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {windowWidth <= 767 && (
            <div className="banner banner__slider slider-scroll">
              {banners && banners.map((val, key) => (
                  <div key={key} className="banner__item banner__item--slider" style={{width: `272px`, minWidth: `272px`}}>
                    <a href={val.link} className="is-relative frame-wrap" target="_blank" rel="noreferrer noopener">
                      <img src={val.image} alt={`banner-${key}`} />
                      {!isSafari && (
                        <div className="frame-shadow">
                          <img src={val.image} alt={`banner-${key}`} />
                        </div>
                      )}
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Banner.propTypes = {
  t: PropTypes.func,
  banner: PropTypes.object,
  currentLanguage: PropTypes.string
}

export default withTranslation('common')(Banner)
