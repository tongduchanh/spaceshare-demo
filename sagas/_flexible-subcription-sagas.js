import { put, call } from 'redux-saga/effects'

import { flexibleSubcriptionService } from '../services'
import FlexSubscriptionActions from '../redux/_flexible-subcription-redux'
import { HttpStatus } from '../constants'

const FlexibleSubcriptionServiceSagas = {
  *getSubscriptionlist({ data, cookies }) {
    let response = yield call(
      flexibleSubcriptionService.getSubscriptionList,
      data,
      cookies,
    )
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSubscriptionlist = true
      yield put(
        FlexSubscriptionActions.flexibleSubcriptionSuccess(responsedata),
      )
    } else {
      yield put(
        FlexSubscriptionActions.flexibleSubcriptionFailure(
          responsedata,
          response.status,
        ),
      )
    }
  },
  *getSubscriptionBooking({ data }) {
    let response = yield call(
      flexibleSubcriptionService.getSubscriptionBooking,
      data,
    )
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSubscriptionBooking = true
      yield put(
        FlexSubscriptionActions.flexibleSubcriptionBookingSuccess(responsedata),
      )
    } else {
      yield put(
        FlexSubscriptionActions.flexibleSubcriptionBookingError(responsedata),
      )
    }
  },
}

export default FlexibleSubcriptionServiceSagas
