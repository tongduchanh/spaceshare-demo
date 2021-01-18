import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { hide, show } from 'redux-modal'
import moment from 'moment'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import {
  Button,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import DayPicker from 'react-day-picker'
import Loader from 'react-loader-spinner'
import classnames from 'classnames'

import CoworkingFavoriteActions from '../../redux/_coworking-favorite-redux'
import FlexibleBookingActions from '../../redux/_flexible-booking-redux'
import AvailabilityActions from '../../redux/_availability-redux'

import { AppUtils } from '../../utils'
import { bindActionCreators } from 'redux'
import { DefaultValue, ModalName } from '../../constants'
import { withTranslation } from '../../i18n'
import LoaderComponent from '../Loader'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import InputNumber from '../common/input-number'
const timeData = DefaultValue.TIME_DATA

class Booking extends Component {
  state = {
    showBookingModal: false,
    activated: [],
    coworking: {},
    profile: {},
    dropdownOpen: false,
    dropdownTime: false,
    subscription: null,
    bookingDate: null,
    bookingTime: null,
    openTime: false,
    isError: false,
    errorMessage: null,
    beforeDate: new Date(),
    flexibleSubscription: [],
    available: [],
    plan_type: '',
    seats: 1,
  }

  goToMyBooking = () => {
    this.props.hide(ModalName.BOOKING_SUCCESS)
    this.props.router.push('/my-booking').then(() => window.scrollTo(0, 0))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flexibleBooking !== this.props.flexibleBooking) {
      if (this.props.flexibleBooking.postFlexibleBooking) {
        this.props.show(ModalName.BOOKING_SUCCESS, {
          okFunction: () => this.goToMyBooking(),
        })
        // NotificationManager.success(this.props.t('booking-success-text'))
      }
    }

    if (prevProps.dataError !== this.props.dataError) {
      if (this.props.dataError && this.props.dataError.status === false) {
        this.setState({
          canBooking: false,
          isError: true,
          errorMessage: this.props.dataError.message,
        })
      }
    }

    if (prevProps.flexibleAvailability !== this.props.flexibleAvailability) {
      if (
        this.props.flexibleAvailability &&
        this.props.flexibleAvailability.flexibleAvailabilityBySpace
      ) {
        this.setState({
          errorMessage: null,
          isError: false,
          canBooking: true,
        })
      }
    }

    if (this.props.favorite !== prevProps.favorite) {
      let is_favorite = this.props.favorite.addFavorite
        ? this.props.favorite.addFavorite
        : false
      const coworking = { ...this.state.coworking, is_favorite: is_favorite }
      this.setState({
        coworking: coworking,
      })
    }
    if (prevProps.bookingError !== this.props.bookingError) {
      if (
        this.props.bookingError.message_code == 1012 ||
        this.props.bookingError.message_code == 1018
      ) {
        this.props.show(ModalName.COMMON, {
          message: this.props.t(this.props.bookingError.message),
          actionMes: this.props.t('verify_account'),
          actionFunction: () => {
            this.showVerificationPopup()
          },
        })
      } else {
        this.props.show(ModalName.COMMON, {
          message: this.props.t(this.props.bookingError.message),
          closeFunction: () => {
            this.props.hide(ModalName.COMMON)
          },
        })
      }
    }
  }

  showVerificationPopup = () => {
    this.props.hide(ModalName.COMMON)
    this.props.show(ModalName.VERIFICATION, {
      closeFunction: () => this.verificationCloseFunction(),
    })
  }

  verificationCloseFunction = () => {
    this.props.hide(ModalName.VERIFICATION)
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.flexibleSubscription &&
      props.flexibleSubscription !== state.flexibleSubscription
    ) {
      return {
        flexibleSubscription: props.flexibleSubscription,
      }
    }

    if (props.coworking !== state.coworking) {
      return {
        coworking: props.coworking,
      }
    }
    return null
  }

  closeFunction = () => {
    Router.push(`/login`)
    this.props.hide(ModalName.COMMON)
  }

  checkVerify = (is_complete_verification) => {
    this.props.hide(ModalName.COMMON)
    if (!is_complete_verification) {
      this.props.show(ModalName.VERIFICATION, {
        closeFunction: () => this.verificationCloseFunction(),
      })
    }
  }

  verificationCloseFunction = () => {
    this.props.hide(ModalName.VERIFICATION)
  }

  buyPackageFunction = () => {
    this.props.hide(ModalName.COMMON)
    Router.push('/package').then(() => window.scrollTo(0, 0))
  }

  activeFunction = () => {
    this.props.hide(ModalName.COMMON)
    Router.push('/my-service').then(() => window.scrollTo(0, 0))
  }

  loginFunction = () => {
    this.props.hide(ModalName.COMMON)
    Router.push('/login').then(() => window.scrollTo(0, 0))
  }

  checkAvailableBySpace = () => {
    const {
      bookingDate,
      bookingTime,
      subscription,
      coworking,
      seats,
      plan_type,
    } = this.state
    const data = {
      id: coworking.id,
      params: {
        subscription: subscription && subscription.id,
        date: `${moment(bookingDate).format('DD-MM-YYYY')} ${bookingTime}`,
        ...(plan_type === 3 && { seats: seats }),
      },
    }
    if (
      !subscription ||
      (subscription &&
        bookingDate &&
        Math.floor(bookingDate.getTime() / DefaultValue.MPD) >
          Math.floor(
            AppUtils.convertStringToDate(subscription.expired_date).getTime() /
              DefaultValue.MPD,
          )) ||
      (subscription &&
        bookingDate &&
        Math.floor(bookingDate.getTime() / DefaultValue.MPD) <
          Math.floor(
            AppUtils.convertStringToDate(
              subscription.activated_date,
            ).getTime() / DefaultValue.MPD,
          ))
    ) {
      this.toggleSubscription()
    } else if (bookingDate && !bookingTime) {
      // chưa chọn giờ thì show vùng chọn
      this.toggleTime()
    }
    if (bookingDate && bookingTime && subscription) {
      this.props.flexibleAvailabilityBySpace(data)
    }
  }

  dateChange = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return
    }
    this.setState(
      {
        bookingDate: day,
      },
      () => {
        let { flexibleSubscription, bookingDate } = this.state
        for (let i in flexibleSubscription) {
          let activated_date = AppUtils.convertStringToDate(
            flexibleSubscription[i].activated_date,
          )
          let expired_date = AppUtils.convertStringToDate(
            flexibleSubscription[i].expired_date,
          )
          if (activated_date && expired_date) {
            if (
              Math.floor(activated_date.getTime() / DefaultValue.MPD) <=
                Math.floor(bookingDate.getTime() / DefaultValue.MPD) &&
              Math.floor(expired_date.getTime() / DefaultValue.MPD) >=
                Math.floor(bookingDate.getTime() / DefaultValue.MPD)
            ) {
              flexibleSubscription[i].disabled = false
            } else {
              flexibleSubscription[i].disabled = true
            }
          }
        }
        this.setState({
          flexibleSubscription,
        })
        this.checkAvailableBySpace()
      },
    )
  }

  //update state khi thay đổi giờ trên modal
  timeChange = (time) => {
    this.setState(
      {
        bookingTime: time.value,
        bookingTimeLabel: time.label,
        dropdownTime: false,
      },
      () => this.checkAvailableBySpace(),
    )
  }

  subscriptionChange = (value) => {
    if (value.disabled) {
      return
    }
    this.setState(
      {
        subscription: value,
        dropdownOpen: false,
        available: [],
        plan_type: value.plan.plan_type,
      },
      () => {
        let { flexibleSubscription, subscription, available } = this.state
        for (let i in flexibleSubscription) {
          if (flexibleSubscription[i].id == subscription.id) {
            let item = AppUtils.convertStringToDate(
              flexibleSubscription[i].activated_date,
            ).getTime()
            while (
              item <=
              AppUtils.convertStringToDate(
                flexibleSubscription[i].expired_date,
              ).getTime()
            ) {
              if (
                Math.floor(item / DefaultValue.MPD) >=
                Math.floor(new Date().getTime() / DefaultValue.MPD)
              ) {
                available.push(new Date(item))
              }
              item += DefaultValue.MPD
            }
          }
        }
        this.setState({ available })
        this.checkAvailableBySpace()
      },
    )
  }

  handleBooking = () => {
    const profile = this.props.profile && this.props.profile.data
    const { plan_type, seats } = this.state
    if (profile) {
      const { bookingTime, subscription, bookingDate, coworking } = this.state
      // Kiểm tra đã nhập giờ chưa. nếu chưa mở popup select time
      if (!bookingTime) {
        this.toggleTime()
      }
      if (!this.state.subscription.id) {
        this.toggleSubscription()
      }
      if (!this.state.bookingDate) {
        this.setState({
          isError: true,
          canBooking: false,
          errorMessage: this.props.t('need-chose-date'),
        })
      }
      if (bookingTime && bookingDate && subscription.id) {
        //Booking
        const data = {
          lang: this.props.currentLanguage,
          subscription: subscription.id,
          date: `${moment(bookingDate).format('DD-MM-YYYY')} ${bookingTime}`,
          space_service_meta: coworking.id,
          ...(plan_type === 3 && { seats: seats }),
        }
        this.props.postFlexibleBooking(data)
      }
    } else {
      this.props.show(ModalName.COMMON, {
        message: this.props.t('1009'),
        actionMes: this.props.t('go-to-login-page'),
        actionFunction: () => this.loginFunction(),
      })
    }
  }

  toggleSubscription = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  toggleTime = () => {
    this.setState({
      dropdownTime: !this.state.dropdownTime,
    })
  }

  increment = () => {
    this.setState(
      (prevState) => {
        return { seats: prevState.seats < 7 ? prevState.seats + 1 : 6 }
      },
      () => this.checkAvailableBySpace(),
    )
  }

  decrement = () => {
    this.setState(
      (prevState) => {
        return {
          seats: prevState.seats > 1 ? prevState.seats - 1 : 1,
        }
      },
      () => this.checkAvailableBySpace(),
    )
  }

  render() {
    moment.locale('en')
    let {
      flexibleSubscription,
      bookingTime,
      bookingDate,
      subscription,
      errorMessage,
      isError,
      beforeDate,
      available,
      seats,
    } = this.state
    let { favoriting, t, coworking } = this.props
    const profile = this.props.profile
    const modifiers = {
      available: available,
    }
    const selectSubscriptionText =
      flexibleSubscription && flexibleSubscription.length > 0
        ? t('select-subscription')
        : t('no-subscription')
    return (
      <div className="booking-sidebar-wrap mt--30">
        {this.props.processingBooking && <LoaderComponent />}
        <div className="booking-sidebar booking-sidebar--top booking">
          <div className="booking__filter-item mb--12">
            <div className="mb--6">{t('select-subscription')}</div>
            <Dropdown
              className="booking__subscription dropdown-full-width"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleSubscription}
            >
              <DropdownToggle
                tag="span"
                onClick={this.toggleSubscription}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
                className="d-flex"
              >
                <Input
                  autoComplete="off"
                  type="text"
                  placeholder={selectSubscriptionText}
                  value={
                    (subscription &&
                      subscription.plan &&
                      subscription.plan.name) ||
                    ''
                  }
                  onClick={this.toggle}
                  className="form-control dropdown__input"
                  readOnly
                />
                <img
                  className="dropdown-arrow"
                  src="/static/images/down-arrow.svg"
                  width="16"
                  height="16"
                />
              </DropdownToggle>
              <DropdownMenu>
                <ul className="list-style-none">
                  {flexibleSubscription &&
                    flexibleSubscription.length > 0 &&
                    flexibleSubscription.map((val, key) => (
                      <li
                        key={key}
                        onClick={() => this.subscriptionChange(val)}
                        className={classnames({
                          disabled: val.disabled,
                        })}
                      >
                        <div>
                          {val.plan && val.plan.name} -{' '}
                          {t('remain-turns', { number: val.remain_turns })}
                        </div>
                        <div style={{ fontSize: '13px' }}>
                          (
                          {`${t('from')} ${val.activated_date} ${t('to')} ${
                            val.expired_date
                          }`}
                          )
                        </div>
                      </li>
                    ))}
                  {!profile.data ? (
                    <li>
                      <span>{t('need-login-to-booking')} </span>
                      <Link href="/login">
                        <a>{t('login-now')}</a>
                      </Link>
                    </li>
                  ) : (
                    <React.Fragment>
                      {flexibleSubscription &&
                        flexibleSubscription.length <= 0 && (
                          <li>
                            <span>
                              {t('need-subscription-to-booking')}
                              {` `}
                            </span>
                            <Link href="/package">
                              <a href="/package">{t('buy-subscription-now')}</a>
                            </Link>
                          </li>
                        )}
                    </React.Fragment>
                  )}
                </ul>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="booking__filter-item mb--12">
            <div className="mb--6">{t('select-date')}</div>

            <div className="booking__calender">
              <DayPicker
                modifiers={modifiers}
                selectedDays={bookingDate}
                onDayClick={this.dateChange}
                disabledDays={[
                  {
                    before: beforeDate,
                  },
                ]}
              />
            </div>
          </div>

          <div className="booking__filter-item mb--12">
            <div className="mb--6">{t('select-time')}</div>
            <Dropdown
              className="booking__subscription dropdown-full-width"
              isOpen={this.state.dropdownTime}
              toggle={this.toggleTime}
            >
              <DropdownToggle
                tag="span"
                onClick={this.toggleTime}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownTime}
                className="d-flex"
              >
                <Input
                  autoComplete="off"
                  type="text"
                  placeholder="Giờ đặt lịch"
                  value={this.state.bookingTimeLabel}
                  onClick={this.toggleTime}
                  className="form-control dropdown__input"
                />
                <img
                  className="dropdown-arrow"
                  src="/static/images/down-arrow.svg"
                  width="16"
                  height="16"
                />
              </DropdownToggle>
              <DropdownMenu className="dropdown-time">
                <ul className="list-style-none">
                  {timeData.map((val, key) => (
                    <li key={key} onClick={() => this.timeChange(val)}>
                      {val.label}
                    </li>
                  ))}
                </ul>
              </DropdownMenu>
            </Dropdown>
          </div>
          {this.state.plan_type === 3 && (
            <div className="booking__filter-item mb--12">
              <div className="mb--6">Số chỗ ngồi</div>
              <InputNumber
                number={seats}
                max={6}
                increment={this.increment}
                decrement={this.decrement}
              />
            </div>
          )}
          {this.props.processingAvailability ? (
            <div className="processing mt--12">
              <Loader type="ThreeDots" color="#fbc02d" height={20} width={50} />
            </div>
          ) : (
            <React.Fragment>
              {errorMessage && isError && (
                <div className="booking__error mt--12">
                  <span className="error-icon mr-2">
                    <img src="/static/images/exclamation.svg" width="24" />
                  </span>

                  {errorMessage}
                </div>
              )}
              {this.state.canBooking && (
                <div className="mt--12">{t('can-booking')}</div>
              )}
            </React.Fragment>
          )}
          <div className="booking__notes mt--12">
            {!profile.data ? (
              <div>
                <span>{t('need-login-to-booking')} </span>
                <Link href="/login">
                  <a>{t('login-now')}</a>
                </Link>
              </div>
            ) : (
              <React.Fragment>
                {flexibleSubscription && flexibleSubscription.length <= 0 && (
                  <div>
                    <span>
                      {t('need-subscription-to-booking')}
                      {` `}
                    </span>
                    <Link href="/my-service">
                      <a href="/my-service">{t('buy-subscription-now')}</a>
                    </Link>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>

          <div className="booking__btn mt--12">
            <Button
              color="custom"
              className="btn-full btn-full--margin btn-gold btn-gold--white fw-7"
              onClick={() => this.handleBooking()}
              disabled={
                this.state.isError ||
                !profile.data ||
                (flexibleSubscription && flexibleSubscription.length <= 0)
              }
            >
              {this.props.processingAvailability ? (
                <Loader type="ThreeDots" color="#fff" height={10} width={35} />
              ) : (
                <span>{t('booking-now')}</span>
              )}
            </Button>
          </div>
        </div>

        <div className="booking-sidebar--bottom">
          <div className="d-flex align-items-center">
            <div className="host-avatar">
              <img
                className="image--circle"
                src={coworking.space_meta && coworking.space_meta.logo}
              />
            </div>
            <div className="host-info ml-3 font-weight-bolder">
              {coworking.space_meta && coworking.space_meta.name}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Booking.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  t: PropTypes.func,
  flexibleAvailabilityBySpace: PropTypes.func,
  postFlexibleBooking: PropTypes.func,

  flexibleSubscription: PropTypes.array,
  flexibleAvailability: PropTypes.object,
  flexibleBooking: PropTypes.object,
  favorite: PropTypes.object,
  coworking: PropTypes.object,
  profile: PropTypes.object,
  dataError: PropTypes.object,
  router: PropTypes.object,

  processingAvailability: PropTypes.bool,
  processingBooking: PropTypes.bool,
  processing: PropTypes.bool,
  favoriting: PropTypes.bool,
  hasPackage: PropTypes.bool,
  bookingProcessing: PropTypes.bool,
  bookingError: PropTypes.object,
  isAuthenticated: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  currentLanguage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    processingAvailability: state.availability.processing,
    processingBooking: state.flexibleBooking.processing,
    favoriting: state.favorite.processing,
    favorite: state.favorite.data,
    profile: state.profile.data,
    flexibleAvailability: state.availability.data,
    flexibleBooking: state.flexibleBooking.data,
    dataError: state.availability.dataError,
    bookingError: state.flexibleBooking.error,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  addFavorite: (data) => dispatch(CoworkingFavoriteActions.addFavorite(data)),
  removeFavorite: (data) =>
    dispatch(CoworkingFavoriteActions.removeFavorite(data)),
  flexibleAvailabilityBySpace: (data) =>
    dispatch(AvailabilityActions.flexibleAvailabilityBySpace(data)),
  postFlexibleBooking: (data) =>
    dispatch(FlexibleBookingActions.postFlexibleBooking(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(Booking)))
