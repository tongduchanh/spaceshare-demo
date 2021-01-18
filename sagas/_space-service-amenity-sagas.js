/**
 * @author HanhTD
 * SpaceSagas
 */

import { call, put } from 'redux-saga/effects'

import { spaceServiceAmenity } from '../services'
import { HttpStatus } from '../constants'
import SpaceServiceAmenityActions from '../redux/_space-service-amenity-redux'

const SpaceServiceAmenitySagas = {
  *getSpaceServiceAmenity({ data }) {
    let response = yield call(spaceServiceAmenity.getSpaceServiceAmenity, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceServiceAmenity = true
      yield put(SpaceServiceAmenityActions.spaceServiceAmenitySuccess(responsedata))
    } else {
      yield put(SpaceServiceAmenityActions.spaceServiceAmenityFailure(responsedata, response.status))
    }
  },

  *editSpaceServiceAmenity({ data }) {
    let response = yield call(spaceServiceAmenity.getSpaceServiceAmenity, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.editSpaceServiceAmenity = true
      yield put(SpaceServiceAmenityActions.spaceServiceAmenitySuccess(responsedata))
    } else {
      yield put(SpaceServiceAmenityActions.spaceServiceAmenityFailure(responsedata, response.status))
    }
  },

  *getAvailableAmenity({ data }) {
    let response = yield call(spaceServiceAmenity.getAvailableAmenity, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getAvailableAmenity = true
      yield put(SpaceServiceAmenityActions.spaceServiceAmenitySuccess(responsedata))
    } else {
      yield put(SpaceServiceAmenityActions.spaceServiceAmenityFailure(responsedata, response.status))
    }
  },
}

export default SpaceServiceAmenitySagas
