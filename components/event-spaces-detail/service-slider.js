import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Slider from 'react-slick'
import { withTranslation } from '../../i18n'
import { SlickSliderSettings } from '../../constants'
import {AppUtils} from '../../utils'
import {SpaceServiceType } from '../../constants'

const spaceShareSpace = 'https://spaceshare.s3-ap-southeast-1.amazonaws.com/static/web-app/services/SpaceShare.png'
const workingSpace = 'https://spaceshare.s3-ap-southeast-1.amazonaws.com/static/web-app/services/dedicated_desk.jpg'
const eventSpace = 'https://spaceshare.s3-ap-southeast-1.amazonaws.com/static/web-app/services/event_space.jpg'
const hotDesk = '/static/images/background/image1.jpg'
class ServiceSlider extends React.Component {
  state = {
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

  render () {
    const {t} = this.props
    const {windowWidth} = this.state
    const settings = SlickSliderSettings.SERVICE_SETTINGS
    const arrData = [
      {id: 2, name: 'Coworking Space', photo: spaceShareSpace, link: AppUtils.routerSpaceHref(SpaceServiceType.FLEXIBLE_DESK), as: AppUtils.routerSpaceHref(SpaceServiceType.FLEXIBLE_DESK)},
      {id: 3, name: 'Văn phòng trọn gói', photo: workingSpace, link: AppUtils.routerSpaceHref(SpaceServiceType.OFFICE_SPACE), as: AppUtils.routerSpaceHref(SpaceServiceType.OFFICE_SPACE)},
      {id: 4, name: t('event'), photo: eventSpace, link: AppUtils.routerSpaceHref(SpaceServiceType.DEDICATED_SPACE), as: AppUtils.routerSpaceHref(SpaceServiceType.DEDICATED_SPACE)},
      {id: 4, name: 'Chỗ ngồi cá nhân', photo: hotDesk, link: AppUtils.routerSpaceHref(SpaceServiceType.HOT_DESK), as: AppUtils.routerSpaceHref(SpaceServiceType.HOT_DESK)},
    ]
    return (
      <div>
        <div className="service service__slider">
          {windowWidth > 767 && (
            <Slider {...settings}>
              {arrData.map((val, key) => (
                <div className="service__item" style={{ width: `160px` }} key={key}>
                  <Link href={val.link} as={val.as}>
                    <a className="service__link">
                      <div className="service__cover">
                        <img src={val.photo} />
                      </div>
                      <div className="service__name">
                        <div>
                          {val.name}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </Slider>
          )}
          {windowWidth <= 767 && (
            <div className="slider-scroll">
              {arrData.map((val, key) => (
                <div key={key} className="service__item--slider" style={{ width: `160px`, minWidth: `160px` }}>
                  <div className="service__item">
                    <Link href={val.link} as={val.as}>
                      <a className="service__link">
                        <div className="service__cover">
                          <img src={val.photo} />
                        </div>
                        <div className="service__name">
                          <div>
                            {val.name}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

ServiceSlider.propTypes = {
  t: PropTypes.func
}

export default withTranslation('common')(ServiceSlider)
