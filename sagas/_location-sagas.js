/**
 * @author HanhTD
 * LocationSagas
 */

import { put, call } from 'redux-saga/effects'

import { locationService } from '../services'
import LocationActions from '../redux/_location-redux'
import { HttpStatus } from '../constants'

const LocationSagas = {
  *getDistrictList({ data }) {
    let response = yield call(locationService.getDistrictList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getDistrictList = true
      yield put(LocationActions.locationSuccess(responsedata))
    } else {
      yield put(LocationActions.locationFailure(responsedata, response.status))
    }
  },
  *getAvailableProvinces({ data }) {
    let response = yield call(locationService.getAvailableProvinces, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getAvailableProvinces = true
      yield put(LocationActions.availableProvincesSuccess(responsedata))
    } else {
      yield put(LocationActions.locationFailure(responsedata, response.status))
    }
  },
  *getAvailableDistricts({ data }) {
    let response = yield call(locationService.getAvailableDistricts, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getAvailableDistricts = true
      yield put(LocationActions.availableDistrictsSuccess(responsedata))
    } else {
      yield put(LocationActions.locationFailure(responsedata, response.status))
    }
  },
}

export default LocationSagas
