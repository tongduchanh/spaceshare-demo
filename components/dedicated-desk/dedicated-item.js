import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'

import ImageLoader from '../content-loader/image-loader'
import ReactLazyLoad from '../LazyLoad'
import { withTranslation } from '../../i18n'

import { AppUtils } from '../../utils'

const dummy = '/static/images/dummy.png'

function DedicatedItem(props) {
  const { space, t, category, dedicatedDeskMeta } = props
  return (
    <Card className="space__item">
      <Link href={`/hot-desk-detail?id=${space.id}`} as={`/hot-desk/${space.id}`}>
        <a className="space__img">
          <ReactLazyLoad placeholder={<ImageLoader />} offset={200}>
            <CardImg
              className="fade-in"
              alt={`space-${space}`}
              top
              src={space.thumbnail || dummy}
            />
          </ReactLazyLoad>
          {dedicatedDeskMeta.id == 1 && (
            <>
              {space.dedicated_desk_discount && (
                <div className="position-absolute space__promotion">-{space.dedicated_desk_discount}%</div>
              )}
            </>
          )}
          {dedicatedDeskMeta.id == 2 && (
            <>
              {space.office_discount && (
                <div className="position-absolute space__promotion">-{space.office_discount}%</div>
              )}
            </>
          )}
        </a>
      </Link>
      <CardBody className="space__info">
        <div className="space__type">{category}</div>
        <Link href={`/hot-desk-detail?id=${space.id}`} as={`/hot-desk/${space.id}`}>
          <a>
            <CardTitle
              title={space.coworking_space && space.coworking_space.title}
              className="space__name has-right-icon"
            >
              <h5 className="mb--6 font-weight-normal">
                {space.coworking_space && space.coworking_space.title}
              </h5>
            </CardTitle>
          </a>
        </Link>
        <div className="space__address mb--6">
          <span>{space.coworking_space && space.coworking_space.shortened_address}</span>
        </div>
        <div className="space__pricing mb2">
          {dedicatedDeskMeta.id == 1 && (
            <>
              {space.dedicated_desk_discount_pricing ? (
                <React.Fragment>
                  <span className="font-weight-bold">
                    {AppUtils.number_format(space.dedicated_desk_discount_pricing)}đ
                  </span>
                  <span className="space__pricing-original">
                    {AppUtils.number_format(space.dedicated_desk_display_pricing)}đ
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {space.dedicated_desk_display_pricing && (
                    <span className="font-weight-bold">
                      {AppUtils.number_format(space.dedicated_desk_display_pricing)}đ
                    </span>
                  )}
                </React.Fragment>
              )}
            </>
          )}
          {dedicatedDeskMeta.id == 2 && (
            <>
              {space.office_discount_pricing ? (
                <React.Fragment>
                  <span className="font-weight-bold">
                    {AppUtils.number_format(space.office_discount_pricing)}đ
                  </span>
                  <span className="space__pricing-original">
                    {AppUtils.number_format(space.office_display_pricing)}đ
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {space.office_display_pricing && (
                    <span className="font-weight-bold">
                      {AppUtils.number_format(space.office_display_pricing)}đ
                    </span>
                  )}
                </React.Fragment>
              )}
            </>
          )}
        </div>
        <div className="space--bottom">
          <Link href={`/hot-desk-detail?id=${space.id}`} as={`/hot-desk/${space.id}`}>
            <button>Xem chi tiết</button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

DedicatedItem.propTypes = {
  space: PropTypes.object,
  dragging: PropTypes.bool,
  mapView: PropTypes.bool,
  index: PropTypes.number,
  favoriteToggle: PropTypes.func,
  t: PropTypes.func,
  windowWidth: PropTypes.number,
  serviceType: PropTypes.number,
  hidePrice: PropTypes.bool,
  category: PropTypes.string,
  dedicatedDeskMeta: PropTypes.object,
}

export default withTranslation('common')(withRouter(DedicatedItem))
