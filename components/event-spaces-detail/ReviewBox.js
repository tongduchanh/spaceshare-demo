import React from 'react'
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Button, Input } from 'reactstrap'
import { TextInput, ValidationForm, FileInput } from 'react-bootstrap4-form-validation'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import ReactLoading from 'react-loading'

import ReviewActions from '../../redux/_review-redux'
import MyReviewActions from '../../redux/_my-review-redux'
import { withTranslation } from '../../i18n'

class ReviewBox extends React.Component {
  state = {
    modalReview: false,
    gallery: null,
    rating: 5,
    content: '',
    review: {},
    photos: [],
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modalReview !== state.modalReview) {
      return {
        modalReview: props.modalReview,
      }
    }
    return null
  }

  toggle = () => {
    this.props.toogle()
  }

  handleChangeImage = (e) => {
    const files = e.target.files
    let formData = new FormData()
    if (files[0]){
      formData.append('photo', files[0])
      this.props.postReviewGallery(formData)
    }
  }

  componentDidMount() {
    if (this.props.myReview && this.props.myReview.data) {
      this.setState({
        content: this.props.myReview?.data?.review,
        review: this.props.myReview?.data,
        photos: this.props.myReview?.data?.photos || [],
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviewGallery !== this.props.reviewGallery && this.props.reviewGallery) {
      const response = this.props.reviewGallery.data
      if (this.props.reviewGallery.postReviewGallery) {
        let photos = this.state.photos
        photos.push(response)
        this.setState({ photos })
      }
    }
    if (prevProps.myReview !== this.props.myReview) {
      if (this.props.myReview && this.props.myReview.data) {
        this.setState({
          content: this.props.myReview?.data?.review,
          rating: this.props.myReview?.data?.rating,
          review: this.props.myReview?.data,
          photos: this.props.myReview?.data?.photos || [],
        })
      }
    }
  }

  changeRating = (newRating) => {
    this.setState({ rating: newRating })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleReviewSubmit = (e) => {
    e.preventDefault()
    const data = {
      data: {
        review: this.state.content,
        rating: this.state.rating,
        title: '',
        photos: this.state.photos && this.state.photos.map((el) => el.id),
      },
      space_service_meta_id: this.props.router.query.id,
    }
    this.props.postReviewRequest(data)
  }
  handleDeletePhoto = (photo) => {
    let photos = this.state.photos
    photos = photos.filter((el) => el.id !== photo.id)
    this.setState({
      photos,
    })
  }
  render() {
    const { t } = this.props
    const { rating, content, photos, review } = this.state
    return (
      <React.Fragment>
        <Modal className="modal-center" isOpen={this.state.modalReview} toggle={this.toggle}>
          <div className="close-modal" onClick={this.toggle}>
            <img src="/static/images/icons/close.png" />
          </div>
          <ModalBody className="review-box-body">
            <ValidationForm onSubmit={this.handleReviewSubmit}>
              <div className="review__rating mb--12">
                <div className="text-center review__title">Vui lòng đánh giá</div>
                <div className="review__star">
                  <StarRatings
                    rating={rating}
                    starDimension="24px"
                    starSpacing="4px"
                    starEmptyColor="#e4e4e4"
                    starHoverColor="#ffca5b"
                    starRatedColor="#ffca5b"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
              <FormGroup>
                <TextInput
                  type="text"
                  multiline
                  rows="4"
                  name="content"
                  id="content"
                  placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé"
                  required
                  pattern=".{3,}"
                  errorMessage={{
                    required: t('validate-field-review'),
                    pattern: t('validate-field-3'),
                  }}
                  onChange={this.handleChange}
                  value={content || ''}
                />
              </FormGroup>
              <FormGroup>
                <div className="review__gallery">
                  <div className="file-input">
                    <Input type="file" id="file" name="file" onChange={this.handleChangeImage} />
                  </div>
                  {photos && photos.length > 0 && (
                    <React.Fragment>
                      {photos.map((val, key) => (
                        <div className="review__photo review__photo-box" key={key}>
                          <img src={val.thumbnail} />
                          <div className="btn-delete" onClick={() => this.handleDeletePhoto(val)}>
                            <img src="/static/images/icons/bin.svg" />
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  )}

                  {this.props.processing && (
                    <div className="review__loading">
                      <ReactLoading
                        type={'spin'}
                        color={'#a3a3a3'}
                        height={'30px'}
                        width={'30px'}
                      />
                    </div>
                  )}
                </div>
                <div className="text-md">Bình luận 50 ký tự và 1 hình ảnh để nhận 2 Point, áp dụng cho trường hợp đã check-in tại Coworking Space.</div>
              </FormGroup>
              <div className="text-center">
                <Button color="custom" className="btn-gold font-weight-bold">
                  {t('send-review')}
                </Button>
              </div>
            </ValidationForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

ReviewBox.propTypes = {
  handleReviewSubmit: PropTypes.func,
  changeRating: PropTypes.func,
  postReviewGallery: PropTypes.func,
  t: PropTypes.func,
  handleChange: PropTypes.func,
  postReviewRequest: PropTypes.func,
  toogle: PropTypes.func,

  myReview: PropTypes.object,
  reviewGallery: PropTypes.object,
  content: PropTypes.string,
  rating: PropTypes.number,
  processing: PropTypes.bool,
  router: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    reviewGallery: state.review.reviewGallery,
    processing: state.review.processing,
    myReview: state.myReview.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  postReviewGallery: (data) => dispatch(ReviewActions.postReviewGallery(data)),
  postReviewRequest: (data) => dispatch(MyReviewActions.postReviewRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(ReviewBox)))
