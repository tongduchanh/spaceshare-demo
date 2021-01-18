/**
 * @author HanhTD
 * Space booking sagags
 */

import { call, put } from 'redux-saga/effects'
import { HttpStatus } from '../constants'

import { spaceBookingService } from '../services'
import SpaceBookingActions from '../redux/_space-booking-redux'

const SpaceBookingSagas = {
  *getSpaceBookingList({ data, cookies }) {
    let response = yield call(spaceBookingService.getSpaceBookingList, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceBookingList = true
      yield put(SpaceBookingActions.spaceBookingSuccess(responsedata))
    } else {
      yield put(SpaceBookingActions.spaceBookingFailure(responsedata, response.status))
    }
  },

  *getSpaceBookingDetail({ data, cookies }) {
    let response = yield call(spaceBookingService.getSpaceBookingDetail, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceBookingDetail = true
      yield put(SpaceBookingActions.spaceBookingSuccess(responsedata))
    } else {
      yield put(SpaceBookingActions.spaceBookingFailure(responsedata, response.status))
    }
  },

}

export default SpaceBookingSagas
