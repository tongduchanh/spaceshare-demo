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
import ReactLazyLoad from '../LazyLoad'
import ImageLoader from '../content-loader/image-loader'
import { SpaceServiceType, PricingType } from '../../constants'
import { ProfileIcon } from '../../icons'
import StarRatings from 'react-star-ratings'

class SpaceItem extends React.Component {
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

  getCashBackType = (type) => {
    let cashType = ''
    if (type == 1) {
      cashType = '%'
    } else if (type == 2) {
      cashType = 'P'
    }
    return cashType
  }

  render() {
    const settings = {
      slidesToShow: 1,
      speed: 800,
      lazyLoad: true,
      swipe: false,
      fade: true,
    }
    const { dragging } = this.state
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
            className="space__img"
            onClick={(e) => dragging && e.preventDefault()}
          >
            {windowWidth <= 767 ? (
              <CardImg
                className="fade-in"
                top
                src={
                  space.photos && space.photos[0] && space.photos[0].thumbnail
                }
              />
            ) : (
              <Slider {...settings}>
                {space.photos &&
                  space.photos.map((photo, key) => (
                    <div className="space__slider-img" key={key}>
                      <ReactLazyLoad placeholder={<ImageLoader />} offset={200}>
                        <CardImg
                          className="fade-in"
                          alt={`flexible-${key}`}
                          top
                          src={photo.thumbnail}
                        />
                      </ReactLazyLoad>
                    </div>
                  ))}
              </Slider>
            )}
          </a>
        </Link>
        {/* <div className="space__favorite">
          {space.is_favorite ? (
            <span
              className="space__favorite--favorite"
              onClick={() => this.favoriteToggle(space)}
            >
              <i className="fas fa-heart" />
            </span>
          ) : (
            <span onClick={() => this.favoriteToggle(space)}>
              <i className="fas fa-heart" />
            </span>
          )}
        </div> */}
        {space.promotion && space.promotion.length > 0 && (
          <div className="space__discount">
            Hoàn {space.promotion && space.promotion[0]?.cashback_value}
            {this.getCashBackType(
              space.promotion && space.promotion[0]?.cashback_type,
            )}
          </div>
        )}
        <CardBody className="space__info">
          <div className="space__type">
            {space.space_service_type_meta &&
              space.space_service_type_meta.name}
          </div>
          <Link
            href={AppUtils.routerSpaceDetailHref(serviceType, space.id)}
            as={AppUtils.routerSpaceDetailAsWithDistrict(serviceType, space)}
          >
            <a onClick={(e) => dragging && e.preventDefault()}>
              <CardTitle
                title={space.name}
                className="space__name has-right-icon"
              >
                <h5 className="mb--6">{space.name}</h5>
              </CardTitle>
            </a>
          </Link>
          <div className="space__pricing">
            <span className="space__pricing-real">{space.point} Point</span>
          </div>
          <div className="space__address mb--6">
            <span>{space.space_meta && space.space_meta.shorten_address}</span>
          </div>

          <div className="space__info--bottom align-item-center">
            {serviceType === SpaceServiceType.DEDICATED_SPACE && (
              <div className="d-flex align-items-end space__attendee">
                <div style={{ position: 'relative', bottom: '2px' }}>
                  <ProfileIcon width="14" height="14" className="mr-2" />
                </div>
                <div>{space.capacity}</div>
              </div>
            )}
            {space.rating > 0 && (
              <div className="space__rating is-flex">
                <StarRatings
                  starDimension="14px"
                  starSpacing="2px"
                  starEmptyColor="#e4e4e4"
                  starHoverColor="#ffca5b"
                  starRatedColor="#fbc02d"
                  rating={space.rating}
                  svgIconViewBox="0 0 1000 1000"
                  svgIconPath="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z"
                />
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
