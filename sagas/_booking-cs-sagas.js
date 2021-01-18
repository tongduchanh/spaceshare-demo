/**
 * @author NamNH
 * Booking coworking
 */

import { call, put } from 'redux-saga/effects'

import { bookingCsService } from '../services'
import BookingCsActions from '../redux/_booking-cs-redux'
import { HttpStatus } from '../constants'

const BookingCsSagas = {
  * list({ data }) {
      let response = yield call(bookingCsService.list, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.list = true
        yield put(BookingCsActions.bookingCsSuccess(responsedata))
      } else {
        yield put(BookingCsActions.bookingCsFailure(responsedata, response.status))
      }
  }
}

export default BookingCsSagas
