/**
 * @author HanhTD
 * Hot desk sagas
 */

import { call, put } from 'redux-saga/effects'
import {hotDeskService} from '../services'
import { HttpStatus } from '../constants'
import HotDeskActions from '../redux/_hot-desk-redux'

const HotDeskSagas = {
  *getHotDeskList({ data }) {
    let response = yield call(hotDeskService.getHotDeskList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getHotDeskList = true
      yield put(HotDeskActions.hotDeskListSuccess(responsedata))
    } else {
      yield put(HotDeskActions.hotDeskFailure(responsedata, response.status))
    }
  },
  *getHotDeskDetail({ data }) {
    let response = yield call(hotDeskService.getHotDeskDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getHotDeskDetail = true
      yield put(HotDeskActions.hotDeskDetailSuccess(responsedata))
    } else {
      yield put(HotDeskActions.hotDeskFailure(responsedata, response.status))
    }
  },
  *getHotDeskRelated({ data }) {
    let response = yield call(hotDeskService.getHotDeskRelated, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getHotDeskRelated = true
      yield put(HotDeskActions.hotDeskRelatedSuccess(responsedata))
    } else {
      yield put(HotDeskActions.hotDeskFailure(responsedata, response.status))
    }
  },
  *postContact({ data }) {
    let response = yield call(hotDeskService.postContact, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postContact = true
      yield put(HotDeskActions.postContactSuccess(responsedata))
    } else {
      yield put(HotDeskActions.hotDeskFailure(responsedata, response.status))
    }
  },
}

export default HotDeskSagas
