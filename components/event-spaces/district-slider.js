/**
 * @author HanhTD
 * District slider
 */

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { Container } from 'reactstrap'
import moment from 'moment'
import Slider from 'react-slick'

import { withTranslation } from '../../i18n'
import { SpaceServiceType } from '../../constants'

class DistrictSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [],
      actionOn: {},
      offset: 0,
      limit: '',
      showSeeAll: true,
      showMap: false,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.spaces !== state.coworkings) {
      return {
        coworkings: props.spaces,
        spaces: props.spaces,
      }
    }

    if (props.profile !== state.user) {
      return {
        user: props.profile,
      }
    }

    if (props.showMap !== state.showMap) {
      return {
        showMap: props.showMap,
      }
    }
    return null
  }

  handleRedirect = (provinceId) => {
    let params = new URLSearchParams(this.props.router.query)
    const serviceType = this.props.serviceType
    params.set('provinces', provinceId)
    let href, as
    if (serviceType === SpaceServiceType.OFFICE_SPACE) {
      href = `/office-search?${params.toString()}`
      as = `/s/office?${params.toString()}`
    } else if (serviceType === SpaceServiceType.DEDICATED_SPACE) {
      href = `/dedicated-space-search?${params.toString()}`
      as = `/s/event-spaces?${params.toString()}`
    } else if (serviceType === SpaceServiceType.HOT_DESK) {
      href = `/hot-desk-search?${params.toString()}`
      as = `/s/hot-desk?${params.toString()}`
    }
    this.props.router.push(href, as).then(() => window.scrollTo(0, 0))
  }

  render() {
    moment.locale('en')
    const { title, subTitle, provinceList } = this.props

    const settings = {
      infinite: false,
      slidesToShow: 7,
      speed: 800,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            infinite: false,
            slidesToShow: 1,
            speed: 400,
            variableWidth: true,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 6,
          },
        },
      ],
    }
    return (
      <div className="section">
        <div className="area">
          <Container>
            <div className="section-title mt--24">
              <div className="section-title__main">
                <div>
                  <h3>{title}</h3>
                </div>
              </div>
              <div className="section-title__description j-space-between">
                <h4>{subTitle}</h4>
              </div>
            </div>
            <Slider {...settings}>
              {provinceList &&
                provinceList.map((item, index) => (
                  <div key={index} style={{ width: `272px` }}>
                    <div
                      className="area__item is-relative"
                      onClick={() => this.handleRedirect(item.id)}
                    >
                      <div className="area__img">
                        <img className="w-100" src={item.thumbnail} />
                      </div>
                      <div className="area__text">{item.name}</div>
                    </div>
                  </div>
                ))}
            </Slider>
          </Container>
        </div>
      </div>
    )
  }
}

DistrictSlider.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  t: PropTypes.func,

  provinceList: PropTypes.array,
  profile: PropTypes.object,
  router: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  serviceType: PropTypes.number
}

export default withTranslation('common')(withRouter(DistrictSlider))
