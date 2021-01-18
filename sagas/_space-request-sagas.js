/**
 * @author HanhTD
 * SpaceSagas
 */

import { call, put } from 'redux-saga/effects'

import { spaceService } from '../services'
import { HttpStatus } from '../constants'
import SpaceRequestActions from '../redux/_space-request-redux'

const SpaceRequestSagas = {
  *postSpaceRequest({ data }) {
    let response = yield call(spaceService.postSpaceRequest, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postSpaceRequest = true
      yield put(SpaceRequestActions.spaceRequestSuccess(responsedata))
    } else {
      yield put(SpaceRequestActions.spaceRequestFailure(responsedata, response.status))
    }
  },
  *getSpaceRequestList({ data, cookies }) {
    let response = yield call(spaceService.getSpaceRequestList, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceRequestList = true
      yield put(SpaceRequestActions.spaceRequestSuccess(responsedata))
    } else {
      yield put(SpaceRequestActions.spaceRequestFailure(responsedata, response.status))
    }
  },
}

export default SpaceRequestSagas
