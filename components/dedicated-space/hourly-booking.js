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

class HourlyBooking extends React.Component {
  state = {
    start_date: null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    availability: [],
    start_times: [],
    end_times: [],
    start_time: null,
    end_time: null,
    attendee: 1,
    pricing: {},
    dropdownStartTime: false,
    dropdownEndTime: false,
    pricingError: {},
    isError: false,
    partially_book: [],
    is_fully_booked: [{
      before: new Date()
    }]
  }
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.availability !== this.props.availability) {
      // Get date data
      if (this.props.availability && this.props.availability.monthAvailability) {
        const availability = this.props.availability && this.props.availability.data
        this.setState({
          availability: availability
        })
        let {partially_book, is_fully_booked} = this.state
      
        availability.map(val => {
          if (val.is_fully_booked || !val.is_open) {
            is_fully_booked.push(new Date(val.date))
          } else if (val.is_partially_booked) {
            partially_book.push(new Date(val.date))
          }
        })
        this.setState({partially_book, is_fully_booked})
      }

      //Get start time data
      if (this.props.availability && this.props.availability.startTimeHourly) {
        this.setState({
          start_times: this.props.availability && this.props.availability.data
        }, () => {
          let {start_times, start_time} = this.state
          let checkTime = []
          checkTime = start_times.filter(el => el.time == start_time && el.is_available)
          if (checkTime.length === 0) {
            this.setState({
              start_time: null,
              end_time: null
            })
          }
        })
      }
      //Get end time data
      if (this.props.availability && this.props.availability.endTimeHourly) {
        this.setState({
          end_times: this.props.availability && this.props.availability.data
        }, () => {
          let {end_times, end_time} = this.state
          let checkTime = []
          checkTime = end_times.filter(el => el.time == end_time && el.is_available)
          if (checkTime.length === 0) {
            this.setState({
              end_time: null
            })
          }
        })
      }
    }

    // Get giá tiền
    if (prevProps.pricing !== this.props.pricing) {
      if (this.props.pricing && this.props.pricing.calculateHourly) {
        this.setState({
          pricing: this.props.pricing.data,
          pricingError: null,
          isError: false
        })
      }
    }

    // Lấy data lỗi khi tính giá tiền
    if (prevProps.pricingError !== this.props.pricingError) {
      if (this.props.pricingError && this.props.pricingError.calculateHourlyError) {
        this.setState({
          pricingError: this.props.pricingError,
          pricing: null,
          isError: true
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
    const {start_time, end_time, date, attendee} = this.state
    if (start_time && end_time && date && attendee > 0) {
      const data = {
        start_time: `${date} ${start_time}`,
        end_time: `${date} ${end_time}`,
        attendee: attendee,
        rate_type: PricingType.HOURLY_RATE,
        space_service_meta: this.props.space.id,
      }
      this.props.dedicatedSpacePricingCalculate(data)
    }
  }

  // Thay đổi ngày đặt lịch
  dateChange = (date, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      start_date: date,
      date: moment(date).format('DD-MM-YYYY')
    }, () => {
      this.calculatePricing()
    })
    const data = {
      checking_type: 0,
      date: AppUtils.dateFormat(date),
      start_time: null,
      rate_type: PricingType.HOURLY_RATE,
      id: this.props.space.id
    }
    this.props.hourAvailability(data)
    if (!this.state.start_time) {
      this.toggleStartTime()
    }
    //  else if (!this.state.end_time) {
    //   this.toggleEndTime()
    // }
  }

  // Thay đổi giờ bắt đầu
  handleChangeStartTime = time => {
    this.setState({
      start_time: time.time,
      start_time_element: time
    }, () => {
      this.calculatePricing()
    })
    const data = {
      checking_type: 1,
      date: AppUtils.dateFormat(this.state.start_date),
      start_time: time.time,
      rate_type: PricingType.HOURLY_RATE,
      id: this.props.space.id
    }
    this.props.hourAvailability(data)
    if (!this.state.start_date) {
      this.myRef.current.showDayPicker();
    } else if (!this.state.end_time) {
      this.toggleEndTime()
    }
  }

  // Thay đổi giờ kết thúc
  handleChangeEndTime = time => {
    this.setState({
      end_time: time.time,
      end_time_element: time
    }, () => {
      this.calculatePricing()
    })
  }

  booked = () => {
    const {start_date, start_time, end_time, attendee, isError} = this.state
    const {space} = this.props
    if (start_date && start_time && end_time && attendee && !isError ) {
      let start = AppUtils.dateFormat(start_date)
      let end = AppUtils.dateFormat(start_date)
      Router.push(`/checkout?id=${space.id}&start_date=${start}&end_date=${end}&attendee=${attendee}&tmp=00:00:00&start_time=${start_time}&end_time=${end_time}&rate_type=${PricingType.HOURLY_RATE}`).then(() => window.scrollTo(0, 0))
    } else {
      if (!this.state.start_date) {
        this.myRef.current.showDayPicker();
      } else if (!this.state.start_time) {
        this.toggleStartTime()
      } else if (!this.state.end_time) {
        this.toggleEndTime()
      }
    }
  }

  render() {
    const {space, t} = this.props
    const {start_date, start_times, end_times, partially_book, is_fully_booked, pricing, pricingError} = this.state
    const modifiers = {
      partially_book: partially_book,
      disabled: is_fully_booked
    }
    return (
      <div className="booking-space">
        <div className="booking__basic-rate text-center">
          <div className="text-center">
            <div className="rate">
              {AppUtils.number_format(space.service_pricing && space.service_pricing.hourly_rate && space.service_pricing.hourly_rate.basic_rate.rate)} VNĐ
                <span className="ml-2 per-hour">/ {t('hour')}</span>
            </div>
              <div>{t('minimum')} {space.service_pricing && space.service_pricing.hourly_rate && space.service_pricing.hourly_rate.basic_rate.min_unit} {t('hour')}</div>
          </div>
        </div>

        <div className="booking__info">
          <div className="booking__filter-item mb--12">
            <div className="title title--small">
              {t('select-date')}
            </div>
            
            <div className="booking__calender position-relative">
              {this.props.processing && (
                <div className="processing-cal">
                  <ReactLoading type={'spin'} color={'#a3a3a3'} height={'30px'} width={'30px'} />
                </div>

              )}
              <DayPickerInput
                ref={this.myRef}
                onDayPickerShow={this.onDayPickerShow}
                modifiers={modifiers}
                selectedDays={start_date}
                placeholder={t('select-date')}
                keepFocus={false}
                readOnly
                classNames={{container: 'booking__calender-input', overlay: 'booking__calender-overlay'}}
                format="D/M/YYYY"
                formatDate={formatDate}
                parseDate={parseDate} 
                dayPickerProps={{
                  modifiers: modifiers,
                  selectedDays: start_date,
                  onDayClick: this.dateChange,
                  onMonthChange: date => this.onMonthChange(date),
                  fromMonth: new Date()
                }}
                inputProps={{ readOnly: true }}
              />
            </div>
          </div>
        
          <div className="booking__filter-item mb--12">
            <div className="title title--small">
              {t('select-time')}
            </div>
            <div className="d-flex">
              <div className="flex-auto">
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
              <div className="mr-2" />
              <div className="flex-auto">
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
                  disabled={!this.state.start_time}
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
                <PricingCalculate pricing={pricing} rate_type={PricingType.HOURLY_RATE} />
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

HourlyBooking.propTypes = {
  t: PropTypes.func,
  monthAvailability: PropTypes.func,
  hourAvailability: PropTypes.func,
  dedicatedSpacePricingCalculate: PropTypes.func,

  space: PropTypes.object,
  router: PropTypes.object,
  availability: PropTypes.object,
  pricing: PropTypes.object,
  pricingError: PropTypes.object,
  pricingProcessing: PropTypes.bool,
  processing: PropTypes.bool,
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
)(withTranslation('common')(withRouter(HourlyBooking)))
