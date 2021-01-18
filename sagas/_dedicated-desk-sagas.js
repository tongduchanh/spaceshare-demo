/**
 * @author HanhTD
 * Dedicated desk sagas
 */

import { call, put } from 'redux-saga/effects'

import { dedicatedDeskService } from '../services'
import { HttpStatus } from '../constants'
import DedicatedDeskActions from '../redux/_dedicated-desk-redux'

const DedicatedDeskSagas = {
  *dedicatedDeskList({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskList = true
      yield put(DedicatedDeskActions.dedicatedDeskSuccess(responsedata))
    } else {
      yield put(DedicatedDeskActions.dedicatedDeskFailure(responsedata, response.status))
    }
  },

  *dedicatedDeskDetail({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskDetail = true
      yield put(DedicatedDeskActions.dedicatedDeskDetailSuccess(responsedata))
    } else {
      yield put(DedicatedDeskActions.dedicatedDeskFailure(responsedata, response.status))
    }
  },

  *dedicatedDeskRequest({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskRequest, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskRequest = true
      yield put(DedicatedDeskActions.dedicatedDeskSuccess(responsedata))
    } else {
      yield put(DedicatedDeskActions.dedicatedDeskFailure(responsedata, response.status))
    }
  },

  *dedicatedDeskGroupList({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskGroupList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskGroupList = true
      yield put(DedicatedDeskActions.dedicatedDeskSuccess(responsedata))
    } else {
      yield put(DedicatedDeskActions.dedicatedDeskFailure(responsedata, response.status))
    }
  },
  
}

export default DedicatedDeskSagas
