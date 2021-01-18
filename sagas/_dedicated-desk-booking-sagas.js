/**
 * @author HanhTD
 * FixedSeatSagas
 */

import { call, put } from 'redux-saga/effects'
import { HttpStatus } from '../constants'

import { dedicatedDeskBookingService } from '../services'
import DedicatedDeskBookingActions from '../redux/_dedicated-desk-booking-redux'

const DedicatedDeskBookingSagas = {
  *dedicatedDeskBookingList({ data, cookies }) {
    let response = yield call(dedicatedDeskBookingService.dedicatedDeskBookingList, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskBookingList = true
      yield put(DedicatedDeskBookingActions.dedicatedDeskBookingSuccess(responsedata))
    } else {
      yield put(DedicatedDeskBookingActions.dedicatedDeskBookingFailure(responsedata, response.status))
    }
  },

  *dedicatedDeskBookingDetail({ data, cookies }) {
    let response = yield call(dedicatedDeskBookingService.dedicatedDeskBookingDetail, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskBookingDetail = true
      yield put(DedicatedDeskBookingActions.dedicatedDeskBookingSuccess(responsedata))
    } else {
      yield put(DedicatedDeskBookingActions.dedicatedDeskBookingFailure(responsedata, response.status))
    }
  },
}

export default DedicatedDeskBookingSagas
