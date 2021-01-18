import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withTranslation } from '../../i18n'

const SpaceAmenities = (props) => {
  const [showMore, setShowMore] = useState(false)

  const handleShowMore = () => setShowMore(!showMore)

  const {space, t, showFade} = props
  let arrAmenity = []
  if(space.amenity) {
    const amenity = space.amenity
      amenity.map((val) => {
      val.amenities.map((v) => {
        arrAmenity = [...arrAmenity, v]
      })
    })
  }
  return (
    <React.Fragment>
      <div className={classnames('space__content-wrap is-relative', {
        'mini' : !showMore
        })}
      >
        <div className="space__amenity">
          {space.amenity && space.amenity.map((val, key) => (
            <React.Fragment key={key}>
              <div className="sub-title mt--12">
                {val.category}
              </div>
              <ul className="list-style-none amenities__list">
                {val.amenities && val.amenities.map((v, k) => (
                  <li key={k} className="amenities__list-item">
                    <span className="amenities__icon">
                      <img src={v.icon} />
                    </span>
                    <span className="amenities__name">
                      {v.name}
                    </span>
                    {!v.is_free && (
                      <span className="amenities__fee">
                        <img src="/static/images/coin.svg" width="16" />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
        {showFade && (
          <div className="space-fade-bottom">
            <div className="faded" />
            <div className="button-box">
              {showMore ? (
                <a className="show-more" onClick={handleShowMore}>
                  {t('see-less')}
                </a>
              ) : (
                <a className="show-more" onClick={handleShowMore}>
                  {t('see-more')}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

SpaceAmenities.propTypes = {
  t: PropTypes.func,
  space: PropTypes.object,
  showFade: PropTypes.bool
}

export default withTranslation('common')(SpaceAmenities)
