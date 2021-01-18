/**
 * @author HanhTD
 * FlexibleBookingSagas
 */

import { put, call } from 'redux-saga/effects'

import { flexibleBookingService } from '../services'
import FlexibleBookingActions from '../redux/_flexible-booking-redux'
import FlexibleDeskItemActions from '@/redux/_flexible-desk-item-redux'
import { HttpStatus } from '../constants'

const delay = (ms) => new Promise(res => setTimeout(res, ms))
const FlexibleBookingSagas = {
  *getFlexibleBookingList({ data, cookies }) {
    let response = yield call(
      flexibleBookingService.getFlexibleBookingList,
      data,
      cookies,
    )
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleBookingList = true
      yield put(FlexibleBookingActions.flexibleBookingSuccess(responsedata))
    } else {
      yield put(
        FlexibleBookingActions.flexibleBookingFailure(
          responsedata,
          response.status,
        ),
      )
    }
  },
  *postFlexibleBooking({ data }) {
    let response = yield call(flexibleBookingService.postFlexibleBooking, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postFlexibleBooking = true
      yield put(FlexibleBookingActions.flexibleBookingSuccess(responsedata))
    } else {
      yield put(
        FlexibleBookingActions.postFlexibleBookingError(
          responsedata,
          response.status,
        ),
      )
    }
  },
  *checkBooking({ data }) {
    let response = yield call(flexibleBookingService.checkBooking, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.checkBooking = true
      yield delay(500)
      yield put(FlexibleDeskItemActions.checkBookingSuccess(responsedata))
    } else {
      yield delay(500)
      yield put(
        FlexibleDeskItemActions.bookingError(
          responsedata,
          response.status,
        ),
      )
    }
  },
  *bookingWithPoint({ data }) {
    let response = yield call(flexibleBookingService.bookingWithPoint, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.bookingWithPoint = true
      yield put(FlexibleDeskItemActions.bookingWithPointSuccess(responsedata))
    } else {
      yield put(
        FlexibleDeskItemActions.bookingError(
          responsedata,
          response.status,
        ),
      )
    }
  },
}

export default FlexibleBookingSagas
