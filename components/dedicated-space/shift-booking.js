import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Button, Input, CustomInput, Form} from 'reactstrap'
import classnames from 'classnames'
import {AppUtils} from '../../utils'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {formatDate, parseDate} from 'react-day-picker/moment'
import ReactLoading from 'react-loading'
import { timeToInt, timeFromInt } from 'time-number';

import DedicatedSpaceAvailabilityActions from '../../redux/dedicated-space/_dedicated-space-availability-redux'
import DedicatedSpacePricingActions from '../../redux/dedicated-space/_dedicated-space-pricing-redux'

import { withTranslation } from '../../i18n'
import {PricingType} from '../../constants'
import PricingCalculate from './pricing-calculate'

class ShiftBooking extends React.Component {
  state = {
    start_date: null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    availability: [],
    start_time: null,
    end_time: null,
    start_times: [],
    attendee: 1,
    pricing: {},
    dropdownStartTime: false,
    dropdownEndTime: false,
    pricingError: {},
    shifts: [],
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
      if (this.props.availability && this.props.availability.timeShift) {
        this.setState({
          start_times: this.props.availability && this.props.availability.data
        })
      }
    }
    // Get giá tiền
    if (prevProps.pricing !== this.props.pricing) {
      if (this.props.pricing && this.props.pricing.calculateShift) {
        this.setState({
          pricing: this.props.pricing.data,
          pricingError: null,
          isError: false
        })
      }
    }
    // Lấy data lỗi khi tính giá tiền
    if (prevProps.pricingError !== this.props.pricingError) {
      if (this.props.pricingError && this.props.pricingError.calculateShiftError) {
        this.setState({
          pricingError: this.props.pricingError,
          pricing: null,
          isError: true
        })
      }
    }
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

  // Thay đổi ngày đặt lịch
  dateChange = (date, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      start_date: date,
      date: AppUtils.dateFormat(date),
      shifts: []
    }, () => this.calculatePricing())
    if (document.getElementById('form-shifts')) {
      document.getElementById('form-shifts').reset()
    }
    const data = {
      checking_type: 0,
      date: AppUtils.dateFormat(date),
      start_time: null,
      rate_type: PricingType.SHIFT_RATE,
      id: this.props.space.id
    }
    this.props.hourAvailability(data)
  }

  //Chọn buổi
  handleCheck = (e, val) => {
    if (!val.is_available) {
      return
    }
    const value = e.target.value
    const checked = e.target.checked
    let shifts = this.state.shifts
    if (checked === false) {
      shifts = shifts.filter(item => item != value)
    } else {
      shifts.push(parseInt(value))
    }
    this.setState({
      shifts: shifts
    }, () => this.calculatePricing())
  }

  //Thay đổi input
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.calculatePricing())
  }

  //Tính giá tiền
  calculatePricing = () => {
    const {start_date, date, attendee, shifts, start_times} = this.state
    if (start_date && shifts && shifts.length > 0 && attendee) {
      let shift_selected = start_times.filter(el => shifts.includes(el.id))
      let arr_start_time = shift_selected.map(el => timeToInt(el.start_time))
      let arr_end_time = shift_selected.map(el => timeToInt(el.end_time))
      let start_time = timeFromInt(Math.min(...arr_start_time))
      let end_time = timeFromInt(Math.max(...arr_end_time))
      const data = {
        start_time: `${date} ${start_time}:00`,
        end_time: `${date} ${end_time}:00`,
        attendee: attendee,
        rate_type: PricingType.SHIFT_RATE,
        space_service_meta: this.props.space.id,
        shifts: shifts
      }
      this.props.dedicatedSpacePricingCalculate(data)
    }
  }

  booked = () => {
    const {start_date, attendee, shifts, start_times, isError} = this.state
    const {space} = this.props
    if (start_date && shifts && shifts.length > 0 && attendee && !isError) {
      let shift_selected = start_times.filter(el => shifts.includes(el.id))
      let arr_start_time = shift_selected.map(el => timeToInt(el.start_time))
      let arr_end_time = shift_selected.map(el => timeToInt(el.end_time))
      let start_time = `${timeFromInt(Math.min(...arr_start_time))}:00`
      let end_time = `${timeFromInt(Math.max(...arr_end_time))}:00`
      let start = AppUtils.dateFormat(start_date)
      let end = AppUtils.dateFormat(start_date)
      let shift = shifts.join(',')
      this.props.router.push(`/checkout?id=${space.id}&start_date=${start}&end_date=${end}&attendee=${attendee}&tmp=00:00:00&start_time=${start_time}&end_time=${end_time}&shifts=${shift}&rate_type=${PricingType.SHIFT_RATE}`).then(() => window.scrollTo(0, 0))
    } else {
      if (!this.state.start_date) {
        this.myRef.current.showDayPicker();
      }
    }
  }

  renderTime = (start_time, end_time) => {
    return (
      <div className="d-flex justify-content-around">
        <div className="text-capitalize">
          {this.props.t('from')} {start_time}
        </div>
        -
        <div className="text-capitalize">
        {this.props.t('to')} {end_time}
        </div>
      </div>
    )
  }

  render() {
    const {space, t} = this.props
    const {start_date, partially_book, is_fully_booked, pricing, pricingError, start_times} = this.state
    const modifiers = {
      partially_book: partially_book,
      disabled: is_fully_booked
    }
    
    let shifts_rate = []
    shifts_rate = space && space.service_pricing && space.service_pricing.shift_rate
    return (
      <div className="booking-space">
        <div className="booking__basic-rate text-center">
          <div className="text-center">
            {shifts_rate && shifts_rate.length > 0 && (
              <div>
                <span className="mr-2">
                  {t('from')} {` `}
                </span>
                <span className="rate">
                 {AppUtils.number_format(Math.min(...shifts_rate.map(el => el.rate)))}
                </span>
                <span className="ml-2 per-hour text-lowercase">đ/{t('shift')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="booking__info">
          <div className="booking__filter-item mb--12">
            <div className="title title--small mb-1">
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
          <Form id="form-shifts">
            {start_times && start_times.length > 0 && (
              <div className="booking__filter-item mb--12">
                <div className="title title--small mb-1">
                  {t('select-time')}
                </div>
                
                  {start_times.map((val, key) => (
                    <div className="inline-checkbox" key={key} >
                      <CustomInput
                        type="checkbox"
                        name="shifts"
                        value={val.id}
                        className={
                          classnames('hidden-check', {
                          })
                        }
                        id={val.id} 
                        label={this.renderTime(val.start_time, val.end_time)} 
                        onChange={(e) => this.handleCheck(e, val)}
                        disabled={!val.is_available}
                      />
                    </div>
                  ))}
              </div>
            )}
          </Form>

          <div className="booking__filter-item mb--12">
            <div className="title title--small mb-1">
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
              <PricingCalculate pricing={pricing} rate_type={PricingType.SHIFT_RATE} />
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

ShiftBooking.propTypes = {
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
)(withTranslation('common')(withRouter(ShiftBooking)))
