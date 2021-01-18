import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import { hide, show } from 'redux-modal'
import { Container, Row, Col, Button } from 'reactstrap'
import { Element, scroller } from 'react-scroll'
import { NotificationManager } from 'react-notifications'

import DedicatedSpaceActions from '@/redux/dedicated-space/_dedicated-space-redux'
import ReviewActions from '@/redux/_review-redux'
import MyReviewActions from '@/redux/_my-review-redux'
import DedicatedSpaceRelatedActions from '@/redux/dedicated-space/_dedicated-space-related-redux'

import { AppUtils } from '@/utils'
import Layout from '@/components/layouts/layout'
import { i18n, withTranslation } from '@/i18n'
import { DefaultValue, ModalName, SpaceServiceType } from '@/constants'

import SpaceInfo from '@/components/event-spaces-detail/space-info'
import SpaceAmenities from '@/components/event-spaces-detail/SpaceAmenities'
import SectionDevide from '@/components/event-spaces-detail/SectionDevide'
import Reviews from '@/components/event-spaces-detail/Reviews'
import ReviewBox from '@/components/event-spaces-detail/ReviewBox'
import TimeInfo from '@/components/event-spaces-detail/TimeInfo'
import Booking from '@/components/event-spaces-detail/Booking'
import BookingSpaceModal from '@/components/modal/booking-space-modal'
import Navbar from '@/components/event-spaces-detail/nav-bar'
import SpaceGallerySlider from '@/components/event-spaces-detail/space-gallery-slider'
import SpaceSlider from '@/components/event-spaces-detail/space-slider'
import Section from '@/components/section/section'
import Breadcrumb from '@/components/event-spaces-detail/breadcrumb'
import SpaceDescription from '@/components/event-spaces-detail/space-description'
import PaginationComponent from '@/components/PaginationComponent'

class EventSpaceDetail extends React.Component {
  static async getInitialProps({ store, req, query }) {
    const currentLanguage = req ? req.language : i18n.language
    store.dispatch(
      DedicatedSpaceActions.dedicatedSpaceDetail(
        { id: query.id, lang: currentLanguage, preview: query.preview },
        req ? req.cookies : null,
      ),
    )
    //fetch data my review
    store.dispatch(
      MyReviewActions.getMyReview(
        { coworking_space_id: query.id },
        req ? req.cookies : null,
      ),
    )

    // fetch data review list
    const reviewData = {
      coworking_space: query.id,
      limit: DefaultValue.REVIEW_LIMIT,
      offset: 0,
      lang: currentLanguage,
    }
    store.dispatch(ReviewActions.getReviewCollection(reviewData))

    //fetch data dedicated space related
    store.dispatch(
      DedicatedSpaceRelatedActions.dedicatedSpaceRelated(
        { id: query.id, lang: currentLanguage },
        req ? req.cookies : null,
      ),
    )
    return {
      namespacesRequired: ['common'],
      currentLanguage: currentLanguage,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      space: {},
      id: this.props.router.query.id,
      content: '',
      showAmenityFade: false,
      showDescFade: false,
    }
  }

  checkAmenityHeight = () => {
    if (document.getElementById('space__amenity')) {
      let amenityHeight = document.getElementById('space__amenity').clientHeight
      if (amenityHeight >= 190) {
        this.setState({
          showAmenityFade: true,
        })
      }
    }
  }

  checkDescHight = () => {
    if (document.getElementById('space__description')) {
      let descHeight = document.getElementById('space__description')
        .clientHeight
      if (descHeight >= 140) {
        this.setState({
          showDescFade: true,
        })
      }
    }
  }

  componentDidMount() {
    this.setState({
      content:
        this.props.myReview &&
        this.props.myReview.data &&
        this.props.myReview.data.review,
      rating:
        this.props.myReview &&
        this.props.myReview.data &&
        this.props.myReview.data.rating,
    })
    this.checkAmenityHeight()
    this.checkDescHight()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.myReview !== this.props.myReview && this.props.myReview) {
      this.setState({
        content:
          this.props.myReview &&
          this.props.myReview.data &&
          this.props.myReview.data.review,
        rating:
          this.props.myReview &&
          this.props.myReview.data &&
          this.props.myReview.data.rating,
      })

      if (this.props.myReview.postReviewRequest) {
        NotificationManager.success(this.props.t('review_successfully'))
        this.openReviewPopup()
        this.getReviewCollection()
      }
    }

    if (prevProps.space !== this.props.space) {
      this.checkAmenityHeight()
      this.checkDescHight()
    }
  }

  getReviewCollection = () => {
    const reviewData = {
      coworking_space: this.state.id,
      limit: DefaultValue.REVIEW_LIMIT,
      offset: this.state.offset,
      lang: this.props.currentLanguage,
    }
    this.props.getReviewCollection(reviewData)
  }

  toggleBookingModal = () => {
    if (!(this.props.profile && this.props.profile.data)) {
      this.props.show(ModalName.COMMON, {
        message: this.props.t('1009'),
        actionMes: this.props.t('go-to-login-page'),
        actionFunction: () => this.loginFunction(),
      })
    } else {
      this.setState((prevState) => ({
        modalBooking: !prevState.modalBooking,
      }))
    }
  }

  openReviewPopup = () => {
    if (!(this.props.profile && this.props.profile.data)) {
      this.props.show(ModalName.COMMON, {
        message: this.props.t('1009'),
        actionMes: this.props.t('go-to-login-page'),
        actionFunction: () => this.loginFunction(),
      })
    } else {
      this.setState((prevState) => ({
        modalReview: !prevState.modalReview,
      }))
    }
  }

  loginFunction = () => {
    this.props.hide(ModalName.COMMON)
    Router.push('/login').then(() => window.scrollTo(0, 0))
  }

  handleReviewSubmit = (e) => {
    e.preventDefault()
    const data = {
      data: {
        review: this.state.content,
        rating: this.state.rating,
        title: '',
      },
      space_service_meta_id: this.state.id,
    }
    this.props.postReviewRequest(data)
  }

  goToLoginPage = () => {
    Router.push(`/login`).then(() => window.scrollTo(0, 0))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onPageChange = (page) => {
    const reviewData = {
      coworking_space: this.state.id,
      limit: DefaultValue.REVIEW_LIMIT,
      offset: (page - 1) * DefaultValue.REVIEW_LIMIT,
      lang: this.props.currentLanguage,
    }
    this.props.getReviewCollection(reviewData)
    scroller.scrollTo('reviews', {
      duration: 500,
      smooth: true,
      offset: -65,
    })
  }

  changeRating = (newRating) => {
    this.setState({ rating: newRating })
  }

  render() {
    const space = this.props.space && this.props.space.data
    const profile = this.props.profile && this.props.profile.data
    const my_review = this.props.myReview && this.props.myReview.data
    const reviews =
      this.props.review &&
      this.props.review.data &&
      this.props.review.data.results
    const isAuthenticated = AppUtils.isAuthenticated(profile)
    const dedicatedRelated =
      this.props.dedicatedSpaceRelated &&
      this.props.dedicatedSpaceRelated.data &&
      this.props.dedicatedSpaceRelated.data.results
    const { t, currentLanguage } = this.props
    const url = `https://maps.google.com/maps?q=${
      space && space.space_meta && space.space_meta.address
    }&iwloc=J&output=embed&t=m&z=16`
    const breadcrumbList = [
      { name: t('home'), linkHref: '/', linkAs: '/' },
      {
        name: space?.space_service_type_meta?.name,
        linkHref: AppUtils.routerSpaceHref(SpaceServiceType.OFFICE_SPACE),
        linkAs: AppUtils.routerSpaceHref(SpaceServiceType.OFFICE_SPACE),
      },
      {
        name: space?.space_meta?.province?.name,
        linkHref: `/dedicated-space-search?provinces=${space?.space_meta?.province?.id}`,
        linkAs: `/s/event-spaces?provinces=${space?.space_meta?.province?.id}`,
      },
      {
        name: space?.space_meta?.district?.name,
        linkHref: `/dedicated-space-search?provinces=${space?.space_meta?.province?.id}&districts=${space?.space_meta?.district?.id}`,
        linkAs: `/s/event-spaces?provinces=${space?.space_meta?.province?.id}&districts=${space?.space_meta?.district?.id}`,
      },
    ]
    return (
      <Layout {...this.props}>
        <Head>
          <title>{t('title-coworking', { name: space && space.name })}</title>
          <meta property="og:title" content={space && space.name} />
          <meta
            property="og:description"
            content={`${space && space.name} - ${
              space && space.space_meta && space.space_meta.address
            } `}
          />
          <meta
            property="og:url"
            content={`${process.env.REACT_APP_SITE_URL}/dedicated-space/${
              space && space.id
            }`}
          />
          <meta
            property="og:image"
            content={
              space && space.photos && space.photos[0] && space.photos[0].photo
            }
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="800" />
        </Head>
        <Navbar showPolicy />
        {space && (
          <div className="space-detail mb--60">
            <SpaceGallerySlider photos={space.photos} />
            <Container className="container--medium">
              <Row>
                <Col md="8">
                  <Breadcrumb breadcrumbList={breadcrumbList} />
                  <div id="overview">
                    <div className="sp mt--24" />
                    <section className="mb--24">
                      <SpaceInfo
                        currentLanguage={currentLanguage}
                        space={space}
                      />
                    </section>

                    <section>
                      <div className="section-title mb--12">
                        {t('general-introduction')}
                      </div>
                      <div id="space__description">
                        <SpaceDescription
                          space={space}
                          showFade={this.state.showDescFade}
                        />
                      </div>

                      <SectionDevide />
                    </section>
                  </div>

                  <div id="amenities">
                    <section>
                      <div className="section-title mb--12">
                        {t('amenities')}
                      </div>
                      <div id="space__amenity" className="amenities">
                        <SpaceAmenities
                          space={space}
                          showFade={this.state.showAmenityFade}
                        />
                      </div>
                      <SectionDevide />
                    </section>
                  </div>

                  <div id="reviews">
                    <Element name="reviews">
                      <section>
                        <div className="j-space-between align-item-center section-title--mobile">
                          <div className="section-title">{t('reviews')}</div>
                          <Button
                            outline
                            color="gold"
                            onClick={this.openReviewPopup}
                          >
                            {t('write-review')}
                          </Button>
                        </div>

                        <div className="space-review">
                          <div className="your-review">
                            <ReviewBox
                              toogle={this.openReviewPopup}
                              modalReview={this.state.modalReview}
                              content={this.state.content}
                              handleReviewSubmit={(event) =>
                                this.handleReviewSubmit(event)
                              }
                              changeRating={(event) => this.changeRating(event)}
                              handleChange={(event) => this.handleChange(event)}
                              rating={this.state.rating}
                              goToLoginPage={(event) =>
                                this.goToLoginPage(event)
                              }
                              myReview={my_review}
                              coworkingRating={space.rating}
                              totalReview={space.review}
                              isLogin={isAuthenticated}
                            />
                          </div>
                          <div className="review-list mt--24">
                            {reviews && reviews.length === 0 && (
                              <div>
                                <p>
                                  Chưa có nhận xét nào về dịch vụ này, bạn hãy
                                  là người đầu tiên nhận xét.
                                </p>
                                <SectionDevide />
                              </div>
                            )}
                            <Reviews
                              reviews={reviews}
                              totalReview={space.review}
                            />
                          </div>
                        </div>
                        <div className="mb--12">
                          <PaginationComponent
                            count={space.review}
                            perPage={DefaultValue.REVIEW_LIMIT}
                            onPageChange={(page) => this.onPageChange(page)}
                            typePaginate="NO_PARAMS"
                          />
                        </div>
                      </section>
                    </Element>
                  </div>

                  <div id="hours">
                    <section>
                      <div className="section-title mb--12">
                        {t('working-time')}
                      </div>
                      <Row className="space__hours">
                        <Col md="6">
                          <TimeInfo
                            startTime={space.hours && space.hours.mon_open_time}
                            endTime={space.hours && space.hours.mon_close_time}
                            isOpen={space.hours && space.hours.mon_open}
                            date={t('monday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.tue_open_time}
                            endTime={space.hours && space.hours.tue_close_time}
                            isOpen={space.hours && space.hours.tue_open}
                            date={t('tuesday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.wed_open_time}
                            endTime={space.hours && space.hours.wed_close_time}
                            isOpen={space.hours && space.hours.wed_open}
                            date={t('wednesday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.thu_open_time}
                            endTime={space.hours && space.hours.thu_close_time}
                            isOpen={space.hours && space.hours.thu_open}
                            date={t('thursday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.fri_open_time}
                            endTime={space.hours && space.hours.fri_close_time}
                            isOpen={space.hours && space.hours.fri_open}
                            date={t('friday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.sat_open_time}
                            endTime={space.hours && space.hours.sat_close_time}
                            isOpen={space.hours && space.hours.sat_open}
                            date={t('saturday')}
                          />
                          <TimeInfo
                            startTime={space.hours && space.hours.sun_open_time}
                            endTime={space.hours && space.hours.sun_close_time}
                            isOpen={space.hours && space.hours.sun_open}
                            date={t('sunday')}
                          />
                        </Col>
                      </Row>
                    </section>
                    <SectionDevide />
                  </div>

                  <div id="location">
                    <section>
                      <div className="section-title mb--12">
                        {t('location')}
                      </div>
                      <iframe
                        src={url}
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        width="100%"
                        height="300"
                      />
                      <SectionDevide />
                    </section>
                  </div>

                  <div id="policy">
                    <section>
                      <div className="section-title mb--12">
                        {t('rules-policy')}
                      </div>
                      <div>
                        <div className="sub-title mb--12">
                          {t('cancel-policy')}
                        </div>
                        <p>
                          - Miễn phí hủy đặt lịch trong vòng 48h sau khi đặt
                          lịch thành công và trước 5 ngày so với thời gian
                          check-in.
                        </p>
                        <p>
                          - Hủy đặt lịch trước 5 ngày so với thời gian check-in,
                          được hoàn lại 100% tổng số tiền đã trả (trừ phí dịch
                          vụ).
                        </p>
                        <p>
                          - Hủy đặt lịch trước 3 ngày trước thời gian check-in,
                          được hoàn lại 50% (và trừ phí dịch vụ)
                        </p>
                      </div>

                      <div>
                        {space.note && (
                          <section>
                            <div className="sub-title mb--12">{t('note')}</div>
                            <div
                              className="text-html"
                              dangerouslySetInnerHTML={{ __html: space.note }}
                            />
                          </section>
                        )}
                      </div>
                    </section>
                  </div>
                </Col>
                <Col lg="4" md="12" className="display-lg">
                  <Booking space={space} />
                </Col>
              </Row>
            </Container>

            <div className="section-detail">
              <Section
                title={t('similiar-space')}
                containerClass="container--medium"
                render={
                  <SpaceSlider
                    spaces={dedicatedRelated}
                    mainTitle={t('similiar-space')}
                    serviceType={SpaceServiceType.DEDICATED_SPACE}
                  />
                }
              />
            </div>

            <div className="booking--bottom display-md">
              <div className="booking__wrapper">
                <Container className="container--medium booking-content">
                  <div className="booking-content--inner">
                    <div className="space__info align-item-center pc">
                      <div className="space__logo">
                        <img src={space.space_meta && space.space_meta.logo} />
                      </div>
                      <div className="space__name">
                        {space.space_meta && space.space_meta.name}
                      </div>
                    </div>
                    <div className="space__booking align-item-center">
                      <Button
                        color="custom"
                        className="btn-gold fw-7"
                        onClick={this.toggleBookingModal}
                      >
                        {t('booking-now')}
                      </Button>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
            <BookingSpaceModal
              toggle={this.toggleBookingModal}
              isOpen={this.state.modalBooking}
              booking={<Booking space={space} />}
            />
          </div>
        )}
      </Layout>
    )
  }
}

EventSpaceDetail.propTypes = {
  getSpaceDetail: PropTypes.func,
  profileRequest: PropTypes.func,
  t: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  postReviewRequest: PropTypes.func,
  getReviewCollection: PropTypes.func,
  clearDedicatedSpaceDetail: PropTypes.func,

  space: PropTypes.object,
  profile: PropTypes.object,
  myReview: PropTypes.object,
  review: PropTypes.object,
  router: PropTypes.object,
  dedicatedSpaceRelated: PropTypes.object,
  currentLanguage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    processing: state.dedicatedSpace.processing,
    space: state.dedicatedSpace.dedicatedSpaceDetail,
    profile: state.profile.data,
    review: state.review.data,
    myReview: state.myReview.data,
    dedicatedSpaceRelated: state.dedicatedSpaceRelated.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  postReviewRequest: (data) =>
    dispatch(MyReviewActions.postReviewRequest(data)),
  getReviewCollection: (data) =>
    dispatch(ReviewActions.getReviewCollection(data)),
  clearDedicatedSpaceDetail: () =>
    dispatch(DedicatedSpaceActions.clearDedicatedSpaceDetail()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(EventSpaceDetail)))
