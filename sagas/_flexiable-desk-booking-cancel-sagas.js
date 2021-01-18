
import { put, call } from 'redux-saga/effects'

import { flexibleDeskBookingCancelService } from '../services'
import FlexibleDeskBookingCancelActions from '../redux/_flexiable-desk-booking-cancel-redux'
import { HttpStatus } from '../constants'

const FlexibleDeskBookingCancelSagas = {
  * flexiableDeskBookingCancel({ data }) {
    let response = yield call(flexibleDeskBookingCancelService.flexibleDeskBookingCancel, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.flexiableDeskBookingCancel = true
      yield put(FlexibleDeskBookingCancelActions.flexibleDeskBookingCancelSuccess(responsedata))
    } else {
      yield put(FlexibleDeskBookingCancelActions.flexibleDeskBookingCancelFailure(responsedata, response.status))
    }
  },
}

export default FlexibleDeskBookingCancelSagas
