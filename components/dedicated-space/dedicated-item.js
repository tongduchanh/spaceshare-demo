import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import classnames from 'classnames'
import Rating from 'react-star-rating-lite'
import Slider from 'react-slick'
import { AppUtils } from '../../utils'
import { withTranslation } from '../../i18n'
import { SpaceServiceType, PricingType } from '../../constants'
import { ProfileIcon } from '../../icons'

class SpaceItem extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
  }
  state = {
    dragging: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dragging !== state.dragging) {
      return {
        dragging: props.dragging,
      }
    }

    if (props.space !== state.space) {
      return {
        space: props.space,
      }
    }
    return null
  }

  favoriteToggle = (space) => {
    this.props.favoriteToggle(space)
  }

  onMouseEnter = (space) => {
    this.timer = setTimeout(() => {
      this.setState({
        hoverId: space.id,
      })
    }, 1000)
  }

  onMouseLeave = () => {
    clearTimeout(this.timer)
    this.setState({
      hoverId: null,
    })
  }

  render() {
    const settings = {
      slidesToShow: 1,
      speed: 500,
      lazyLoad: true,
      swipe: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      cssEase: 'ease-out',
    }
    const { dragging, hoverId } = this.state
    const { space, mapView, t, windowWidth, serviceType } = this.props

    return (
      <Card
        className={classnames('space__item', {
          'is-horizontal': mapView,
        })}
      >
        <Link
          href={AppUtils.routerSpaceDetailHref(serviceType, space.id)}
          as={AppUtils.routerSpaceDetailAsWithDistrict(serviceType, space)}
        >
          <a
            className="dedicated__img position-relative"
            onClick={(e) => dragging && e.preventDefault()}
            onMouseEnter={() => this.onMouseEnter(space)}
            onMouseLeave={() => this.onMouseLeave(space)}
          >
            {windowWidth <= 767 ? (
              <CardImg
                className="fade-in"
                top
                src={space.photos && space.photos[0] && space.photos[0].thumbnail}
              />
            ) : (
              <React.Fragment>
                <CardImg
                  className={classnames('fade-in dedicated__image', {})}
                  top
                  src={space.photos && space.photos[0] && space.photos[0].thumbnail}
                />
                {space && space.id === hoverId && (
                  <div className="slideshow">
                    <Slider {...settings} ref={(slider) => (this.slider = slider)}>
                      {space.photos &&
                        space.photos
                          .filter((_, index) => index !== 0)
                          .map((photo, key) => (
                            <div className="item" key={key}>
                              <CardImg alt={`flexible-${key}`} top src={photo.thumbnail} />
                            </div>
                          ))}
                    </Slider>
                  </div>
                )}
              </React.Fragment>
            )}
            {/* {serviceType === SpaceServiceType.DEDICATED_SPACE && !this.props.hidePrice && (
              <div className="space__price">
                {space.is_instant_booking && (
                  <img className="space__price-img mr-1" src="/static/images/flash.svg" width="16" height="16" />
                )}
                <span className="text-sm">{t('from')}{` `}</span>
                <span className="font-weight-bold">{AppUtils.number_format(space.basic_rate && space.basic_rate.rate)}{` `}</span>
                {space.basic_rate && space.basic_rate.rate_type === PricingType.HOURLY_RATE && (
                  <span className="text-sm text-lowercase">{`đ/${t('hour')}`}</span>
                )}
                {space.basic_rate && space.basic_rate.rate_type === PricingType.DAILY_RATE && (
                  <span className="text-sm text-lowercase">{`đ/${t('day')}`}</span>
                )}
                {space.basic_rate && space.basic_rate.rate_type === PricingType.SHIFT_RATE && (
                  <span className="text-sm text-lowercase">{`đ/${t('shift')}`}</span>
                )}
              </div>
            )} */}
          </a>
        </Link>
        {/*<div className="space__favorite">*/}
        {/*  {space.is_favorite ? (*/}
        {/*    <span className="space__favorite--favorite" onClick={() => this.favoriteToggle(space)}>*/}
        {/*      <i className="fas fa-heart" />*/}
        {/*    </span>*/}
        {/*  ) : (*/}
        {/*    <span onClick={() => this.favoriteToggle(space)}>*/}
        {/*      <i className="fas fa-heart" />*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*</div>*/}
        <CardBody className="space__info">
          <div className="space__type">
            {space.space_service_type_meta && space.space_service_type_meta.name}
          </div>
          <Link
            href={AppUtils.routerSpaceDetailHref(serviceType, space.id)}
            as={AppUtils.routerSpaceDetailAsWithDistrict(serviceType, space)}
          >
            <a onClick={(e) => dragging && e.preventDefault()}>
              <CardTitle title={space.title} className="space__name has-right-icon">
                <h5 className="mb--6">{space.name}</h5>
              </CardTitle>
            </a>
          </Link>
          <div className="space__pricing">
            {space.is_instant_booking && (
              <img
                className="space__prcing-icon mr-1"
                src="/static/images/flash.svg"
                width="16"
                height="16"
                title="Đặt chỗ ngay không cần đợi không gian xác nhận"
              />
            )}
            <span className="space__pricing-real">
              <span>
                {AppUtils.number_format(space.basic_rate && space.basic_rate.rate)}
              </span>
              {space.basic_rate && space.basic_rate.rate_type === PricingType.HOURLY_RATE && (
                <span className="text-lowercase">{`đ/${t('hour')}`}</span>
              )}
              {space.basic_rate && space.basic_rate.rate_type === PricingType.DAILY_RATE && (
                <span className="text-lowercase">{`đ/${t('day')}`}</span>
              )}
              {space.basic_rate && space.basic_rate.rate_type === PricingType.SHIFT_RATE && (
                <span className="text-lowercase">{`đ/${t('shift')}`}</span>
              )}
            </span>
          </div>
          <div className="space__description">
            {space.capacity} khách <span aria-hidden="true"> · </span> {space.area} m2
          </div>

          <div className="space__address">
            <span>{space.space_meta && space.space_meta.shorten_address}</span>
          </div>

          <div className="space__info--bottom align-item-center">
            {space.rating > 0 && (
              <div className="space__rating is-flex">
                <Rating value={space.rating.toString()} weight="14" color="#fbc02d" readonly />
                <span className="text-gray  ml-2">({space.review})</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    )
  }
}

SpaceItem.propTypes = {
  space: PropTypes.object,
  dragging: PropTypes.bool,
  mapView: PropTypes.bool,
  index: PropTypes.number,
  favoriteToggle: PropTypes.func,
  t: PropTypes.func,
  windowWidth: PropTypes.number,
  serviceType: PropTypes.number,
  hidePrice: PropTypes.bool,
}

export default withTranslation('common')(withRouter(SpaceItem))
