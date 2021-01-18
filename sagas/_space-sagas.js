/**
 * @author HanhTD
 * SpaceSagas
 */

import { call, put } from 'redux-saga/effects'

import { spaceService } from '../services'
import { HttpStatus } from '../constants'
import SpaceActions from '../redux/_space-redux'

const SpaceSagas = {
  *getSpaceList({ data }) {
    let response = yield call(spaceService.getSpaceList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceList = true
      yield put(SpaceActions.spaceSuccess(responsedata))
    } else {
      yield put(SpaceActions.spaceFailure(responsedata, response.status))
    }
  },

  *getSpaceDetail({ data }) {
    let response = yield call(spaceService.getSpaceDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceDetail = true
      yield put(SpaceActions.spaceDetailSuccess(responsedata))
    } else {
      yield put(SpaceActions.spaceFailure(responsedata, response.status))
    }
  },

  *groupedList({ data }) {
    let response = yield call(spaceService.groupedList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.groupedList = true
      yield put(SpaceActions.spaceSuccess(responsedata))
    } else {
      yield put(SpaceActions.spaceFailure(responsedata, response.status))
    }
  },
}

export default SpaceSagas
