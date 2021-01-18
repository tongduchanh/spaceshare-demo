import React from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import { withTranslation } from '../../i18n'
import SectionDevide from './SectionDevide'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery'
const DefaultAvatar = '/static/images/user.svg'

class Reviews extends React.Component {
  render() {
    const { reviews } = this.props
    return (
      <React.Fragment>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((val, key) => (
            <div className="review__item" key={key}>
              <div className="review__info">
                <div className="review__avatar">
                  <img
                    src={
                      val.user && val.user.profile_image ? val.user.profile_image : DefaultAvatar
                    }
                  />
                </div>
                <div className="review__user">
                  <div className="review__user-info">
                    <span className="review__user-name">
                      {(val.user && val.user.full_name) || (val.user && val.user.email)}
                    </span>
                    <span className="review__rating">
                      <StarRatings
                        rating={val.rating}
                        starDimension="16px"
                        starSpacing="2px"
                        starEmptyColor="#e4e4e4"
                        starHoverColor="#ffca5b"
                        starRatedColor="#ffca5b"
                        numberOfStars={5}
                        name="rating"
                      />
                    </span>
                  </div>
                  <div className="review__date">{val.updated_at}</div>
                </div>
              </div>

              <div className="review__content mt--12">
                <p style={{wordBreak: 'break-word'}}>{val.review}</p>
              </div>
              <LightgalleryProvider
                lightgallerySettings={{
                  download: false,
                }}
              >
                {val.photos && val.photos.length > 0 && (
                  <div className="review__gallery mt--12">
                    {val.photos.map((val, key) => (
                      <div className="review__photo" key={key}>
                        <LightgalleryItem src={val.photo}>
                          <img src={val.thumbnail} />
                        </LightgalleryItem>
                      </div>
                    ))}
                  </div>
                )}
              </LightgalleryProvider>
              <SectionDevide />
            </div>
          ))}
      </React.Fragment>
    )
  }
}
Reviews.propTypes = {
  reviews: PropTypes.array,
  loadNextReviewPage: PropTypes.func,
  t: PropTypes.func,
  totalReview: PropTypes.number,
}

export default withTranslation('common')(Reviews)
