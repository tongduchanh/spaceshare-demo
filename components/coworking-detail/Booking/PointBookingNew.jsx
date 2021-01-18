import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import moment from 'moment'
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  Tooltip,
} from 'reactstrap'
import classnames from 'classnames'
import { hide, show } from 'redux-modal'
import { bindActionCreators } from 'redux'

import { BeatLoader } from 'react-spinners'

import { WeekDay } from '@/constants'
import { ModalName } from '@/constants'
import InputNumber from '@/components/common/input-number'
import PopupPolicy from '@/components/coworking-detail/Popup/PopupPolicy'

import FlexibleDeskItemActions from '@/redux/_flexible-desk-item-redux'
import ProfileActions from '@/redux/_profile-redux'

import { withTranslation } from '@/i18n'

class PointBooking extends React.Component {
  state = {
    quantity: 1,
    code: '',
    applyCode: '',
    bookingDate: moment(new Date()),
    modalWarning: false,
    tooltipOpen: false,
    modalPolicy: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.booking !== this.props.booking) {
      if (this.props.booking.bookingWithPoint) {
        this.props.show(ModalName.BOOKING_SUCCESS, {
          okFunction: () => this.goToMyBooking(),
        })
        this.checkBooking()
        this.props.profileRequest({})
        this.setState({
          modalWarning: false,
          modalPolicy: false
        })
      }
    }
  }

  goToMyBooking = () => {
    this.props.hide(ModalName.BOOKING_SUCCESS)
    this.props.router.push('/my-booking').then(() => window.scrollTo(0, 0))
  }
  weekDays = () => {
    let days = []
    let daysRequired = 7

    for (let i = 0; i < daysRequired; i++) {
      days.push(moment().add(i, 'days'))
    }
    return days
  }
  renderDayName = (day) => {
    var weekday = new Array(7)
    weekday[WeekDay.SUNDAY] = 'CN'
    weekday[WeekDay.MONDAY] = 'T2'
    weekday[WeekDay.TUESDAY] = 'T3'
    weekday[WeekDay.WEDNESDAY] = 'T4'
    weekday[WeekDay.THURSDAY] = 'T5'
    weekday[WeekDay.FRIDAY] = 'T6'
    weekday[WeekDay.SATURDAY] = 'T7'
    return weekday[day]
  }

  increment = () => {
    this.setState(
      {
        quantity: this.state.quantity + 1,
      },
      () => this.checkBooking(),
    )
  }

  decrement = () => {
    this.setState(
      {
        quantity: this.state.quantity - 1,
      },
      () => this.checkBooking(),
    )
  }

  setBookingDate = (day) => {
    this.setState(
      {
        bookingDate: day,
      },
      () => this.checkBooking(),
    )
  }

  handleApplyCode = () => {
    this.setState(
      {
        applyCode: this.state.code,
      },
      () => this.checkBooking(),
    )
  }
  setCodeValue = (code) => {
    this.setState(
      {
        code: code,
        applyCode: code,
      },
      () => this.checkBooking(),
    )
  }
  handleChangeCode = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (this.props.bookingError && this.state.code == '') {
          this.setState({ applyCode: '' }, () => this.checkBooking())
        }
      },
    )
  }

  checkBooking = () => {
    const { quantity, bookingDate, applyCode } = this.state
    const payload = {
      seats: quantity,
      space_service_meta: this.props.router.query.id,
      date: bookingDate.format('DD-MM-YYYY'),
      code: applyCode,
    }
    this.props.checkBooking(payload)
  }

  handleBooking = () => {
    const { quantity, bookingDate, applyCode } = this.state
    const payload = {
      space_service_meta: this.props.coworking?.data?.id,
      seats: quantity,
      date: bookingDate.format('DD-MM-YYYY'),
      code: applyCode,
      app: false,
    }
    if (
      bookingDate.format('DD-MM-YYYY') ==
      moment(new Date()).format('DD-MM-YYYY')
    ) {
      if (
        new Date(moment(new Date()).format('YYYY-MM-DD 12:00')).getTime() <
        new Date().getTime()
      ) {
        this.toggleModalWarning()
        return
      }
    }

    //Check show policy
    const bookingPoint = this.props.bookingPoint?.data
    if (bookingPoint.is_show_policy) {
      this.toggleModalPolicy()
      return
    }
    this.props.bookingWithPoint(payload)
  }

  bookingNow = () => {
    //Check show policy
    const bookingPoint = this.props.bookingPoint?.data
    if (bookingPoint.is_show_policy) {
      this.toggleModalPolicy()
      this.toggleModalWarning()
      return
    }
    const { quantity, bookingDate, applyCode } = this.state
    const payload = {
      space_service_meta: this.props.coworking?.data?.id,
      seats: quantity,
      date: bookingDate.format('DD-MM-YYYY'),
      code: applyCode,
      app: false,
    }
    this.props.bookingWithPoint(payload)
  }

  bookingWithPolicy = (disable_show_policy) => {
    const { quantity, bookingDate, applyCode } = this.state
    const payload = {
      space_service_meta: this.props.coworking?.data?.id,
      seats: quantity,
      date: bookingDate.format('DD-MM-YYYY'),
      code: applyCode,
      app: false,
      disable_show_policy: disable_show_policy
    }
    this.props.bookingWithPoint(payload)
  }
  toggleModalWarning = () => {
    this.setState({
      modalWarning: !this.state.modalWarning,
    })
  }

  toggleModalPolicy = () => {
    this.setState({
      modalPolicy: !this.state.modalPolicy,
    })
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

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    })
  }
  render() {
    const coworking = this.props.coworking?.data
    const bookingPoint = this.props.bookingPoint?.data
    const { quantity, code, bookingDate, modalWarning, modalPolicy } = this.state
    const errorMessage = this.props.bookingError?.message
    const messageCode = this.props.bookingError?.message_code
    const { t } = this.props
    const { tooltipOpen } = this.state
    return (
      <div className="pointBooking">
        <PopupPolicy 
          isOpen={modalPolicy}
          toggle={this.toggleModalPolicy}
          onSubmit={this.bookingWithPolicy}
          processing={this.props.processing}
        />
        <Modal
          isOpen={modalWarning}
          toggle={this.toggleModalWarning}
          className="ss-modal modal-center"
        >
          <div className="modalHeader modalHeader__center">
            <div
              className="modalHeader__close"
              onClick={this.toggleModalWarning}
            >
              <span aria-hidden="true">×</span>
            </div>
          </div>
          <div className="modalBody modalBody__code">
            <div className="text-center modalBody__title mb2">Thông báo</div>
            <p>
              Bạn có thực sự muốn đặt lịch cho ngày hôm nay. Bạn sẽ không được
              phép hủy lịch cho đặt lịch này?
            </p>
          </div>

          <div className="modalFooter">
            <div className="text-center">
              <Button
                color="custom"
                className="btn-primary"
                onClick={this.bookingNow}
                disabled={this.props.processing}
              >
                Đặt lịch ngay
              </Button>
            </div>
          </div>
        </Modal>
        <div className="pointBooking__point">
          <span className="pointBooking__point-value">{coworking.point}</span>
          <span className="pointBooking__point-prefix">Point/ lượt</span>
        </div>
        <div className="pointBooking__item pointBooking__week-title">
          <div className="pointBooking__item-name">Ngày đặt lịch</div>
          <div className="pointBooking__item-content">
            <div>Tháng {moment(new Date()).format('M/YYYY')}</div>
          </div>
        </div>
        <div className="weekPicker__week">
          {this.weekDays().map((day, key) => (
            <div className="weekPicker__day" key={key}>
              <div className="weekPicker__day-name">
                {this.renderDayName(day.day())}
              </div>
              <div
                className={classnames('weekPicker__day-number', {
                  'weekPicker__day-number-active':
                    bookingDate.format('DD-MM-YYYY') ==
                    day.format('DD-MM-YYYY'),
                })}
                onClick={() => this.setBookingDate(day)}
              >
                {day.format('DD')}
              </div>
            </div>
          ))}
        </div>

        <div className="pointBooking__item pointBooking__item-quantity">
          <div className="pointBooking__item-name">Số lượng</div>
          <div className="pointBooking__item-content">
            <InputNumber
              number={quantity}
              max={5}
              increment={this.increment}
              decrement={this.decrement}
            />
          </div>
        </div>

        <div className="pointBooking__item pointBooking__item-promotion">
          <div className="pointBooking__item-promotion-top">
            <div className="pointBooking__item-name">Mã khuyến mại</div>
            <div className="pointBooking__item-apply-code">
              <InputGroup>
                <Input
                  onChange={this.handleChangeCode}
                  name="code"
                  value={code}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    className="btn-main"
                    color="custom"
                    onClick={this.handleApplyCode}
                    disabled={code === ''}
                  >
                    {t('apply')}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <div className="pointBooking__item-discount-list">
            {coworking &&
              coworking.promotions &&
              coworking.promotions.map((val, key) => (
                <div
                  className="pointBooking__item-discount-item"
                  key={key}
                  onClick={() => this.setCodeValue(val.code)}
                  title="Áp dụng mã giảm giá"
                >
                  <div className="pointBooking__item-discount-code">
                    {val.cashback_value}{' '}
                    {this.getCashBackType(val.cashback_type)}
                  </div>
                  <div className="pointBooking__item-discount-description">
                    <div className="pointBooking__item-discount-name">
                      {val.title}
                    </div>
                    <div className="pointBooking__item-discount-date">
                      HSD: {val.end_date}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pointBooking__hr">
          <hr />
        </div>
        <div className="pointBooking__bottom">
          <div className="pointBooking__result">
            {this.props.processing && (
              <div className="loading-result">
                <BeatLoader size={12} color={'#ff6f61'} loading />
              </div>
            )}
            {bookingPoint && (
              <React.Fragment>
                <div className="pointBooking__result-item">
                  <div className="pointBooking__result-label">
                    Số point hiện tại
                  </div>
                  <div className="pointBooking__result-value">
                    {bookingPoint.user_point} P
                  </div>
                </div>
                <div className="pointBooking__result-item">
                  <div className="pointBooking__result-label">
                    Số point bị trừ
                  </div>
                  <div className="pointBooking__result-value">
                    - {bookingPoint.point_total} P
                  </div>
                </div>
                <div className="pointBooking__result-item">
                  <div className="pointBooking__result-label">
                    Số point còn lại
                  </div>
                  <div className="pointBooking__result-value">
                    {bookingPoint.point_after_booking} P
                  </div>
                </div>
                {bookingPoint.point_cashback > 0 && (
                  <div className="pointBooking__result-item">
                    <div className="pointBooking__result-label">
                      Số point được hoàn
                      <span
                        className="ml-2 code-desc"
                        style={{ cursor: 'pointer' }}
                        // title="Point sẽ được hoàn sau khi bạn check-in"
                        id="point-cash-back"
                      >
                        <i className="fas fa-question-circle" />
                      </span>
                    </div>
                    <Tooltip
                      placement="top"
                      id="discount-des"
                      isOpen={tooltipOpen}
                      autohide={false}
                      target="point-cash-back"
                      toggle={this.toggleTooltip}
                    >
                      Point sẽ được hoàn sau khi bạn check-in
                    </Tooltip>
                    <div className="pointBooking__result-value">
                      + {bookingPoint.point_cashback} P
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}
            <div className="pointBooking__error-msg mb1">
              {errorMessage}
              {messageCode == 5017 && (
                <span>
                  .{` `}
                  <Link href="/point">
                    <a>Nạp point ngay.</a>
                  </Link>
                </span>
              )}
            </div>
          </div>

          <Button
            color="custom"
            className="btn-full btn-gold btn-gold--white fw-7"
            onClick={this.handleBooking}
            disabled={this.props.bookingError || !this.props.profile?.data}
          >
            {t('book-now')}
          </Button>
          <div className="pointBooking__note">
            *Bạn chỉ được phép hủy lịch trước 12h ngày{' '}
            {bookingDate.format('DD-MM-YYYY')}
          </div>
        </div>
      </div>
    )
  }
}

PointBooking.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  t: PropTypes.func,
  checkBooking: PropTypes.func,
  bookingWithPoint: PropTypes.func,
  profileRequest: PropTypes.func,

  coworking: PropTypes.object,
  bookingPoint: PropTypes.object,
  router: PropTypes.object,
  profile: PropTypes.object,
  bookingError: PropTypes.any,
  processing: PropTypes.bool,
  booking: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    coworking: state.coworking.flexibleDeskDetail,
    flexibleSubscription: state.flexibleSubscription.data,
    bookingPoint: state.flexibleDeskItem.checkBooking,
    booking: state.flexibleDeskItem.bookingPoint,
    processing: state.flexibleDeskItem.processing,
    bookingError: state.flexibleDeskItem.bookingError,
    profile: state.profile.data,
    checkBookingError: state.flexibleDeskItem.checkBookingError,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  checkBooking: (data) => dispatch(FlexibleDeskItemActions.checkBooking(data)),
  bookingWithPoint: (data) =>
    dispatch(FlexibleDeskItemActions.bookingWithPoint(data)),
  profileRequest: (data) => dispatch(ProfileActions.profileRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(PointBooking)))
