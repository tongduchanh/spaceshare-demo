/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { flexibleDeskService } from '../services'
import FlexibleDeskActions from '../redux/_flexible-desk-redux'
import { HttpStatus } from '../constants'

const FlexibleDeskSagas = {
  *getFlexibleDeskList({ data, cookies }) {
    let response = yield call(
      flexibleDeskService.getFlexibleDeskList,
      data,
      cookies,
    )
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleDeskList = true
      yield put(FlexibleDeskActions.flexibleDeskSuccess(responsedata))
    } else {
      yield put(
        FlexibleDeskActions.flexibleDeskFailure(responsedata, response.status),
      )
    }
  },
  *getFlexibleDeskDetail({ data, cookies }) {
    let response = yield call(
      flexibleDeskService.getFlexibleDeskDetail,
      data,
      cookies,
    )
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleDeskDetail = true
      yield put(FlexibleDeskActions.flexibleDeskDetailSuccess(responsedata))
    } else {
      yield put(
        FlexibleDeskActions.flexibleDeskFailure(responsedata, response.status),
      )
    }
  },
  *getSpacePolicy({ data }) {
    let response = yield call(flexibleDeskService.getSpacePolicy, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpacePolicy = true
      yield put(FlexibleDeskActions.getSpacePolicySuccess(responsedata))
    } else {
      yield put(
        FlexibleDeskActions.flexibleDeskFailure(responsedata, response.status),
      )
    }
  },
}

export default FlexibleDeskSagas
