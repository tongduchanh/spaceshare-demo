/**
 * @author NamNH
 * Booking Sagas
 */

import {put, call} from 'redux-saga/effects'

import {bookingService} from '../services'
import BookingActions from '../redux/_booking-redux'
import { HttpStatus } from '../constants'

const BookingSagas = {
  * list({data, cookies}) {
      let response = yield call(bookingService.list, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.list = true
        yield put(BookingActions.bookingSuccess(responsedata))
      } else {
        yield put(BookingActions.bookingFailure(responsedata, response.status))
      }
    },

  * listAll({data, cookies}) {
      let response = yield call(bookingService.listAll, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.listAll = true
        yield put(BookingActions.bookingSuccess(responsedata))
      } else {
        yield put(BookingActions.bookingFailure(responsedata, response.status))
      }
    },

  * add({data}) {
      let response = yield call(bookingService.add, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.add = true
        yield put(BookingActions.bookingSuccess(responsedata))
      } else {
        yield put(BookingActions.bookingFailure(responsedata, response.status))
      }
    },

  * multiAdd({data}) {
      let response = yield call(bookingService.multiAdd, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.multiAdd = true
        yield put(BookingActions.bookingSuccess(responsedata))
      } else {
        yield put(BookingActions.bookingFailure(responsedata, response.status))
      }
    },

  * edit({data}) {
      let response = yield call(bookingService.edit, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.edit = true
        yield put(BookingActions.bookingSuccess(responsedata))
      } else {
        yield put(BookingActions.bookingFailure(responsedata, response.status))
      }
    },

  * remove({id}) {
    let response = yield call(bookingService.remove, id)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.remove = true
      yield put(BookingActions.bookingSuccess(responsedata))
    } else {
      yield put(BookingActions.bookingFailure(responsedata, response.status))
    }
  },
}

export default BookingSagas
