import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Button, Input} from 'reactstrap'
import {AppUtils} from '../../utils'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {formatDate, parseDate} from 'react-day-picker/moment'
import TimePicker from '../time-picker'
import ReactLoading from 'react-loading'

import DedicatedSpaceAvailabilityActions from '../../redux/dedicated-space/_dedicated-space-availability-redux'
import DedicatedSpacePricingActions from '../../redux/dedicated-space/_dedicated-space-pricing-redux'

import { withTranslation } from '../../i18n'
import {PricingType} from '../../constants'
import PricingCalculate from './pricing-calculate'

class DailyBooking extends React.Component {
  state = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    availability: [],
    start_times: [],
    end_times: [],
    start_time: null,
    end_time: null,
    start_date: null,
    end_date: null,
    attendee: 1,
    pricing: {},
    dropdownStartTime: false,
    dropdownEndTime: false,
    pricingError: {},
    is_fully_booked: [],
    start_date_disabled: [],
    end_date_disabled: [],
    partially_book: [],
  }

  constructor(props) {
    super(props)
    this.startDateRef = React.createRef();
    this.endDateRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.availability !== this.props.availability) {
      if (this.props.availability && this.props.availability.monthAvailability) {
        const availability = this.props.availability && this.props.availability.data
        this.setState({
          availability: availability
        })
        let {partially_book, start_date_disabled, end_date_disabled} = this.state
        start_date_disabled = []
        end_date_disabled = []
        start_date_disabled.push({
          before: new Date(),
          after: this.state.end_date
        })
        end_date_disabled.push({before: this.state.start_date})
        availability.map(val => {
          if (val.is_fully_booked || !val.is_open || val.is_partially_booked) {
            start_date_disabled.push(new Date(val.date))
            end_date_disabled.push(new Date(val.date))
          }
        })
        this.setState({partially_book, start_date_disabled, end_date_disabled})
      }

      //Get start time data
      if (this.props.availability && this.props.availability.startTimeDaily) {
        this.setState({
          start_times: this.props.availability && this.props.availability.data
        })
      }
      //Get end time data
      if (this.props.availability && this.props.availability.endTimeDaily) {
        this.setState({
          end_times: this.props.availability && this.props.availability.data
        })
      }
    }
    // Get giá tiền
    if (prevProps.pricing !== this.props.pricing) {
      if (this.props.pricing && this.props.pricing.calculateDaily) {
        this.setState({
          pricing: this.props.pricing.data,
          pricingError: null,
          isError: false,
        })
      }
    }
    // Lấy data lỗi khi tính giá tiền
    if (prevProps.pricingError !== this.props.pricingError) {
      if (this.props.pricingError && this.props.pricingError.calculateDailyError) {
        this.setState({
          pricingError: this.props.pricingError,
          pricing: null,
          isError: true,
        })
      }
    }
  }

  //Thay đổi input
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.calculatePricing())
  }

  // Thay đổi tháng, gọi api tính availability theo từng tháng
  onMonthChange = date => {
    this.setState({
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }, () => {
      const data = {
        month: this.state.month,
        year: this.state.year,
        id: this.props.space.id
      }
      this.props.monthAvailability(data)
    })
  }

  // Khi mở dropdown chọn ngày thì gọi api kiểm tra ngày 
  onDayPickerShow = () => {
    const data = {
      month: this.state.month,
      year: this.state.year,
      id: this.props.space.id
    }
    this.props.monthAvailability(data)
  }

  toggleStartTime = () => {
    this.setState({
      dropdownStartTime: !this.state.dropdownStartTime
    })
  }

  toggleEndTime = () => {
    this.setState({
      dropdownEndTime: !this.state.dropdownEndTime
    })
  }

  calculatePricing = () => {
    const {start_date, end_date, start_time, end_time, attendee} = this.state
    if (start_date && end_date && attendee > 0 && start_time && end_time) {
      const data = {
        start_time: `${AppUtils.dateFormat(start_date)} ${start_time}`,
        end_time: `${AppUtils.dateFormat(end_date)} ${end_time}`,
        attendee: attendee,
        rate_type: PricingType.DAILY_RATE,
        space_service_meta: this.props.space.id,
      }
      this.props.dedicatedSpacePricingCalculate(data)
    }
  }
  // Thay đổi ngày bắt đầu
  startDateChange = (date, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      start_date: date,
      end_date_disabled: [...this.state.end_date_disabled, {before: date}]
    }, () => {
      this.calculatePricing()
    })
    const data = {
      checking_type: 0,
      date: AppUtils.dateFormat(date),
      start_time: null,
      rate_type: PricingType.DAILY_RATE,
      id: this.props.space.id
    }
    this.props.hourAvailability(data)
    if (!this.state.start_time) {
      this.toggleStartTime()
    } else if (!this.state.end_date) {
      this.endDateRef.current.showDayPicker();
    }
  }

  // Thay đổi ngày kết thúc
  endDateChange = (date, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      end_date: date,
      start_date_disabled: [...this.state.start_date_disabled, {after: date}]
    }, () => {
      this.calculatePricing()
    })
    if (this.state.start_time) {
      const data = {
        checking_type: 1,
        date: AppUtils.dateFormat(date),
        start_time: this.state.start_time,
        rate_type: PricingType.DAILY_RATE,
        id: this.props.space.id
      }
      this.props.hourAvailability(data)
    }

    if (!this.state.start_date) {
      this.startDateRef.current.showDayPicker();
    } else if (!this.state.start_time) {
      this.toggleStartTime()
    } else if (!this.state.end_time) {
      this.toggleEndTime()
    }
  }

  // Thay đổi giờ bắt đầu
  handleChangeStartTime = val => {
    this.setState({
      start_time: val.time,
      start_time_element: val
    }, () => {
      this.calculatePricing()
    })
    if (!this.state.end_date) {
      this.endDateRef.current.showDayPicker();
    } else if (!this.state.end_time) {
      this.toggleEndTime()
    }
  }

  // Thay đổi giờ kết thúc
  handleChangeEndTime = val => {
    this.setState({
      end_time: val.time,
      end_time_element: val
    }, () => {
      this.calculatePricing()
    })
  }

  booked = () => {
    const {start_date, end_date, start_time, end_time, attendee, isError} = this.state
    if (start_date && end_date && attendee && !isError ) {
      let start = moment(start_date).format('DD-MM-YYYY')
      let end = moment(end_date).format('DD-MM-YYYY')
      const {space} = this.props
      Router.push(`/checkout?id=${space.id}&start_date=${start}&end_date=${end}&attendee=${attendee}&tmp=00:00:00&start_time=${start_time}&end_time=${end_time}&rate_type=${PricingType.DAILY_RATE}`).then(() => window.scrollTo(0, 0))
    } else {
      if (!this.state.start_date) {
        this.startDateRef.current.showDayPicker();
      } else if (!this.state.end_date) {
        this.endDateRef.current.showDayPicker();
      }
    }
  }

  render() {
    const {space, t} = this.props
    const {start_date, end_date, start_times, end_times, partially_book, start_date_disabled, end_date_disabled, pricing, pricingError} = this.state
    const modifiersStartDate = {
      partially_book: partially_book,
      disabled: start_date_disabled
    }
    const modifiersEndDate = {
      partially_book: partially_book,
      disabled: end_date_disabled
    }

    return (
      <div className="booking-space">
        <div className="booking__basic-rate text-center">
          <div className="text-center">
            <div>
              <span className="mr-2">
                {t('from')} {` `}
              </span>
              <span className="rate">
                {AppUtils.number_format(space.service_pricing && space.service_pricing.daily_rate && space.service_pricing.daily_rate.basic_rate && space.service_pricing.daily_rate.basic_rate.rate)}
              </span>
              <span className="ml-2 per-hour text-lowercase">đ/{t('day')}</span>
            </div>
          </div>
        </div>

        <div className="booking__info">
          <div className="position-relative mb--12">
            <div className="d-flex">
              <div className="booking__filter-item flex-auto">
                <div className="title title--small">
                  {t('start-date')}
                </div>
                <DayPickerInput
                  ref={this.startDateRef}
                  onDayPickerShow={this.onDayPickerShow}
                  selectedDays={start_date}
                  placeholder={t('start-date')}
                  keepFocus={false}
                  readOnly
                  classNames={{container: 'booking__calender-input booking__calender-input--absolute', overlay: 'booking__calender-overlay'}}
                  format="D/M/YYYY"
                  formatDate={formatDate}
                  parseDate={parseDate} 
                  dayPickerProps={{
                    modifiers: modifiersStartDate,
                    selectedDays: start_date,
                    onDayClick: this.startDateChange,
                    onMonthChange: date => this.onMonthChange(date),
                    fromMonth: new Date()
                  }}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div className="mr-2" />
              <div className="booking__filter-item flex-auto">
                <div className="title title--small">
                  {t('start-time')}
                </div>
                <TimePicker
                  name="start_time"
                  value={this.state.start_time}
                  time={this.state.start_time_element}
                  handleChange={(val) => this.handleChangeStartTime(val)}
                  format={24}
                  start="06:00"
                  end="23:30"
                  placeholder={t('start-time')}
                  dropdownOpen={this.state.dropdownStartTime}
                  toggleTime={() => this.toggleStartTime()}
                  time_data={start_times}
                  disabled={!this.state.start_date}
                />
              </div>
            </div>
          </div>

          <div className="position-relative mb--12">
            <div className="d-flex">
              <div className="booking__filter-item flex-auto">
                <div className="title title--small">
                  {t('end-date')}
                </div>
                <DayPickerInput
                  ref={this.endDateRef}
                  onDayPickerShow={this.onDayPickerShow}
                  modifiers={modifiersEndDate}
                  selectedDays={end_date}
                  placeholder={t('end-date')}
                  keepFocus={false}
                  readOnly
                  classNames={{container: 'booking__calender-input booking__calender-input--absolute', overlay: 'booking__calender-overlay'}}
                  format="D/M/YYYY"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    modifiers: modifiersEndDate,
                    selectedDays: end_date,
                    onDayClick: this.endDateChange,
                    onMonthChange: date => this.onMonthChange(date),
                    fromMonth: new Date(),
                  }}
                  inputProps={{ readOnly: true }}
                />
              </div>
              <div className="mr-2" />
              <div className="booking__filter-item flex-auto">
                <div className="title title--small">
                  {t('end-time')}
                </div>
                <TimePicker
                  name="start_time"
                  value={this.state.end_time}
                  time={this.state.end_time_element}
                  handleChange={(val) => this.handleChangeEndTime(val)}
                  format={24}
                  start={this.state.start_time || '06:00'}
                  end="22:00"
                  placeholder={t('end-time')}
                  dropdownOpen={this.state.dropdownEndTime}
                  toggleTime={() => this.toggleEndTime()}
                  time_data={end_times}
                  disabled={!this.state.end_date || !this.state.start_time}
                />
              </div>
            </div>
          </div>

          <div className="booking__filter-item mb--12">
            <div className="title title--small">
              {t('guest-amount')}
            </div>
            <div className="d-flex align-items-center">
              <Input 
                className="flex-item-50"
                onChange={this.handleChange}
                name="attendee"
                value={this.state.attendee}
                min="1"
                max={space.service_pricing && space.service_pricing.attendee_pricing && space.service_pricing.attendee_pricing.capacity}
                type="number"
                autoComplete="off"
              />
              <span className="ml-2">{t('maximum')} {space.service_pricing && space.service_pricing.attendee_pricing && space.service_pricing.attendee_pricing.capacity} {t('people')}</span>
            </div>
          </div>

          <div className="booking__filter-item mb--12">
            {this.props.pricingProcessing ? (
              <ReactLoading type={'bubbles'} color={'#fbc02d'} />
            ) : (
              <React.Fragment>
                <PricingCalculate pricing={pricing} rate_type={PricingType.DAILY_RATE} />
              </React.Fragment>
            )}
            
          </div>

          {!this.props.pricingProcessing && pricingError && Object.keys(pricingError).length > 0 && (
            <div className="booking__error">
              <div className="text-danger">
                {pricingError.message}
              </div>
            </div>
          )}

          {space.is_instant_booking ? (
            <Button
              color="custom" 
              className="btn-full btn-gold btn-gold--white fw-7"
              onClick={() => this.booked()}
            >
              {t('book-now')}
            </Button>
          ) : (
            <Button
              color="custom" 
              className="btn-full btn-gold btn-gold--white fw-7"
              onClick={() => this.booked()}
            >
              {t('request-booking')}
            </Button>
          )}
        </div>
      </div>
    )
  }
}

DailyBooking.propTypes = {
  t: PropTypes.func,
  monthAvailability: PropTypes.func,
  hourAvailability:  PropTypes.func,
  dedicatedSpacePricingCalculate: PropTypes.func,

  space: PropTypes.object,
  router: PropTypes.object,
  availability: PropTypes.object,
  pricing: PropTypes.object,
  pricingError: PropTypes.object,
  processing: PropTypes.bool,
  pricingProcessing: PropTypes.bool
}

const mapStateToProps = state => {
  return {
    availability: state.dedicatedSpaceAvailability.data,
    pricing: state.dedicatedSpacePricing.data,
    pricingError: state.dedicatedSpacePricing.dataError,
    pricingProcessing: state.dedicatedSpacePricing.processing,
    processing: state.dedicatedSpaceAvailability.processing,
  }
}

const mapDispatchToProps = dispatch => ({
  monthAvailability: data => dispatch(DedicatedSpaceAvailabilityActions.monthAvailability(data)),
  hourAvailability: data => dispatch(DedicatedSpaceAvailabilityActions.hourAvailability(data)),
  dedicatedSpacePricingCalculate: data => dispatch(DedicatedSpacePricingActions.dedicatedSpacePricingCalculate(data)),
  dedicatedSpacePricingError: dataError => dispatch(DedicatedSpacePricingActions.dedicatedSpacePricingError(dataError)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(DailyBooking)))
