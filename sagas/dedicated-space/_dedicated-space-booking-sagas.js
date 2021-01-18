/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService, dedicatedBookingService } from '../../services'
import dedicatedSpaceBookingActions from '../../redux/dedicated-space/_dedicated-space-booking-redux'
import { HttpStatus, PricingType } from '../../constants'

const DedicatedSpaceBookingSagas = {
  * dedicatedSpaceBookingCalculate({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.dedicatedSpaceBookingCalculate, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        if (data.rate_type === PricingType.HOURLY_RATE) {
          responsedata.calculateHourly = true
        } else if (data.rate_type === PricingType.DAILY_RATE) {
          responsedata.calculateDaily = true
        } else if (data.rate_type === PricingType.SHIFT_RATE) {
          responsedata.calculateShift = true
        }
        yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingSuccess(responsedata))
      } else {
        if (data.rate_type === PricingType.HOURLY_RATE) {
          responsedata.calculateHourlyError = true
        } else if (data.rate_type === PricingType.DAILY_RATE) {
          responsedata.calculateDailyError = true
        } else if (data.rate_type === PricingType.SHIFT_RATE) {
          responsedata.calculateShiftError = true
        }
        yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingError(responsedata, response.status))
      }
  },

  * addDedicatedSpaceBooking({ data }) {
    let response = yield call(dedicatedSpaceService.addDedicatedSpaceBooking, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.addDedicatedSpaceBooking = true
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingSuccess(responsedata))
    } else {
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingFailure(responsedata, response.status))
    }
  },

  * bookingList({ data }) {
    let response = yield call(dedicatedSpaceService.bookingList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.bookingList = true
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingSuccess(responsedata))
    } else {
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingFailure(responsedata, response.status))
    }
  },

  * createCheckoutLink({ data }) {
    let response = yield call(dedicatedBookingService.createCheckoutLink, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.createCheckoutLink = true
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingSuccess(responsedata))
    } else {
      yield put(dedicatedSpaceBookingActions.dedicatedSpaceBookingFailure(responsedata, response.status))
    }
  },
}

export default DedicatedSpaceBookingSagas
