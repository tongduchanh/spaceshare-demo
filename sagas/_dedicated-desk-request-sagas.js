/**
 * @author HanhTD
 * Dedicated desk request sagas
 */

import { call, put } from 'redux-saga/effects'
import { HttpStatus } from '../constants'
import { dedicatedDeskService } from '../services'
import DedicatedDeskRequestActions from '../redux/_dedicated-desk-request-redux'

const DedicatedDeskRequestSagas = {
  *postDedicatedDeskRequest({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskRequest, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postDedicatedDeskRequest = true
      yield put(DedicatedDeskRequestActions.dedicatedDeskRequestSuccess(responsedata))
    } else {
      yield put(DedicatedDeskRequestActions.dedicatedDeskRequestFailure(responsedata, response.status))
    }
  },

  *getDedicatedDeskRequestList({ data, cookies }) {
    let response = yield call(dedicatedDeskService.getDedicatedDeskRequestList, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getDedicatedDeskRequestList = true
      yield put(DedicatedDeskRequestActions.dedicatedDeskRequestSuccess(responsedata))
    } else {
      yield put(DedicatedDeskRequestActions.dedicatedDeskRequestFailure(responsedata, response.status))
    }
  },
}

export default DedicatedDeskRequestSagas
