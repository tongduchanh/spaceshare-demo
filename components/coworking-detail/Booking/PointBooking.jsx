import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import moment from 'moment'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import classnames from 'classnames'

import { WeekDay } from '@/constants'
import InputNumber from '@/components/common/input-number'
import FlexibleDeskItemActions from '@/redux/_flexible-desk-item-redux'

import { withTranslation } from '@/i18n'

function PointBooking(props) {
  const [coworking, setCoworking] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [codeValue, setCodeValue] = useState('')
  const [applyCode, setApplyCode] = useState('')
  const [bookingDate, setBookingDate] = useState(moment(new Date()))
  const bookingPoint = props.bookingPoint.data

  const firstSetQuantity = useRef(true)
  const firstSetBookingDate = useRef(true)
  const firstSetCode = useRef(true)

  const { t } = props
  const weekDays = () => {
    let days = []
    let daysRequired = 7

    for (let i = 0; i < daysRequired; i++) {
      days.push(moment().add(i, 'days'))
    }
    return days
  }
  const renderDayName = (day) => {
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

  const increment = () => {
    setQuantity(quantity + 1)
  }
  const decrement = () => {
    setQuantity(quantity - 1)
  }

  const checkBooking = () => {
    const payload = {
      seats: quantity,
      space_service_meta: props.coworking?.data?.id,
      date: bookingDate.format('DD-MM-YYYY'),
      code: applyCode,
    }
    props.checkBooking(payload)
  }

  const handleApplyCode = () => {
    setApplyCode(codeValue)
  }

  const handleChangeCode = (e) => {
    setCodeValue(e.target.value)
  }

  useEffect(() => {
    setCoworking(props.coworking?.data)
  }, [props.coworking])

  useEffect(() => {
    if (firstSetQuantity.current) {
      firstSetQuantity.current = false
      return
    }
    checkBooking()
  }, [quantity])

  useEffect(() => {
    if (firstSetBookingDate.current) {
      firstSetBookingDate.current = false
      return
    }
    checkBooking()
  }, [bookingDate])

  useEffect(() => {
    if (firstSetCode.current) {
      firstSetCode.current = false
      return
    }
    checkBooking()
  }, [applyCode])

  useEffect(() => {
    checkBooking()
  }, [])

  return (
    <div className="pointBooking">
      <div className="pointBooking__point">
        <span className="pointBooking__point-value">{coworking.point}</span>
        <span className="pointBooking__point-prefix">Point/ lượt</span>
      </div>
      <div className="pointBooking__week-title">
        <div className="pointBooking__item-name">Ngày đặt lịch</div>
        <div className="pointBooking__item-content">
          <div>Tháng {moment(new Date()).format('M/YYYY')}</div>
        </div>
      </div>
      <div className="weekPicker__week">
        {weekDays().map((day, key) => (
          <div className="weekPicker__day" key={key}>
            <div className="weekPicker__day-name">
              {renderDayName(day.day())}
            </div>
            <div
              className={classnames('weekPicker__day-number', {
                'weekPicker__day-number-active':
                  bookingDate.format('DD-MM-YYYY') == day.format('DD-MM-YYYY'),
              })}
              onClick={() => setBookingDate(day)}
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
            max={6}
            increment={increment}
            decrement={decrement}
          />
        </div>
      </div>

      <div className="pointBooking__item pointBooking__item-promotion">
        <div className="pointBooking__item-promotion-top">
          <div className="pointBooking__item-name">Mã giảm giá</div>
          <div className="pointBooking__item-apply-code">
            <InputGroup>
              <Input
                onChange={handleChangeCode}
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="btn-main"
                  color="custom"
                  onClick={handleApplyCode}
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
              <div className="pointBooking__item-discount-item" key={key}>
                <div className="pointBooking__item-discount-code">
                  {val.code}
                </div>
                <div className="pointBooking__item-discount-description">
                  <div className="pointBooking__item-discount-name">
                    {val.description}
                  </div>
                  <div className="pointBooking__item-discount-date">
                    {val.end_date}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="pointBooking__hr">
        <hr />
      </div>
      {bookingPoint && (
        <div className="pointBooking__result">
          <div className="pointBooking__result-item">
            <div className="pointBooking__result-label">Số point bị trừ</div>
            <div className="pointBooking__result-value">
              {bookingPoint.point_total} P
            </div>
          </div>

          <div className="pointBooking__result-item">
            <div className="pointBooking__result-label">Số point được hoàn</div>
            <div className="pointBooking__result-value">{bookingPoint.point_cashback} P</div>
          </div>
        </div>
      )}
      <Button color="custom" className="btn-full btn-gold btn-gold--white fw-7">
        {t('book-now')}
      </Button>
    </div>
  )
}

PointBooking.propTypes = {
  t: PropTypes.func,
  checkBooking: PropTypes.func,
  coworking: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    coworking: state.coworking.flexibleDeskDetail,
    flexibleSubscription: state.flexibleSubscription.data,
    bookingPoint: state.flexibleDeskItem.checkBooking,
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkBooking: (data) => dispatch(FlexibleDeskItemActions.checkBooking(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(PointBooking)))
