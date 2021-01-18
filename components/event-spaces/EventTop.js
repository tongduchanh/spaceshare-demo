import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { withRouter } from 'next/router'

import { withTranslation } from '../../i18n'
import { SpaceServiceType, SlickSliderSettings } from '../../constants'
import { AppUtils } from '../../utils'
class EventTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activityType: [],
      windowWidth: 0,
    }
  }

  setWidth = () => {
    this.setState({
      windowWidth: window.innerWidth,
    })
  }

  componentDidMount() {
    // Tính chiều rộng window để hiển thị responsive cho datepicker
    this.setState({
      windowWidth: window.innerWidth,
    })
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activityType !== state.activityType) {
      return {
        activityType: props.activityType,
      }
    }
    return null
  }
  handleRedirect = (typeId) => {
    let params = new URLSearchParams(this.props.router.query)
    params.set('use_types', typeId)
    let href, as
    href = `/dedicated-space-search?${params.toString()}`
    as = `/s/event-spaces?${params.toString()}`
    this.props.router.push(href, as).then(() => window.scrollTo(0, 0))
  }
  render() {
    const { activityType, windowWidth } = this.state
    const { type } = this.props
    const settings = SlickSliderSettings.SERVICE_SETTINGS
    return (
      <div>
        <div className="service service__slider">
          {windowWidth > 767 && (
            <Slider {...settings}>
              {activityType &&
                activityType.map((item, index) => (
                  <div
                    className="service__item"
                    key={index}
                    style={{ width: `160px` }}
                    onClick={() => this.handleRedirect(item.id)}
                  >
                    <a className="service__link">
                      <div className="service__cover">
                        {type === SpaceServiceType.DEDICATED_DESK && <img src={item.icon} />}
                        {type === SpaceServiceType.DEDICATED_SPACE && (
                          <img src={item.feature_image} />
                        )}
                      </div>
                      <div className="service__name">{item.name}</div>
                    </a>
                  </div>
                ))}
            </Slider>
          )}
          {windowWidth <= 767 && (
            <div className="slider-scroll">
              {activityType &&
                activityType.map((item, index) => (
                  <div
                    key={index}
                    className="service__item--slider"
                    style={{ width: `160px`, minWidth: `160px` }}
                  >
                    <a className="service__link">
                      <div className="service__item" onClick={() => this.handleRedirect(item.id)}>
                        <div className="service__cover">
                          {type === SpaceServiceType.DEDICATED_DESK && <img src={item.icon} />}
                          {type === SpaceServiceType.DEDICATED_SPACE && (
                            <img src={item.feature_image} />
                          )}
                        </div>
                        <div className="service__name">{item.name}</div>
                      </div>
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

EventTop.propTypes = {
  listPurpose: PropTypes.func,
  t: PropTypes.func,
  activeType: PropTypes.array,
  dataPurpose: PropTypes.object,
  type: PropTypes.number,
  additionalService: PropTypes.array,
  router: PropTypes.object,
}

export default withTranslation('common')(withRouter(EventTop))
