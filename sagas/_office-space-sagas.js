/**
 * @author HanhTD
 * Office space sagas
 */

import { call, put } from 'redux-saga/effects'
import {officeSpaceService} from '../services'
import { HttpStatus } from '../constants'
import OfficeSpaceActions from '../redux/_office-space-redux'

const OfficeSpaceService = {
  *getOfficeSpaceList({ data }) {
    let response = yield call(officeSpaceService.getOfficeSpaceList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getOfficeSpaceList = true
      yield put(OfficeSpaceActions.officeSpaceListSuccess(responsedata))
    } else {
      yield put(OfficeSpaceActions.officeSpaceFailure(responsedata, response.status))
    }
  },
  *getOfficeSpaceDetail({ data }) {
    let response = yield call(officeSpaceService.getOfficeSpaceDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getOfficeSpaceDetail = true
      yield put(OfficeSpaceActions.officeSpaceDetailSuccess(responsedata))
    } else {
      yield put(OfficeSpaceActions.officeSpaceFailure(responsedata, response.status))
    }
  },
  *getOfficeSpaceRelated({ data }) {
    let response = yield call(officeSpaceService.getOfficeSpaceRelated, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getOfficeSpaceRelated = true
      yield put(OfficeSpaceActions.officeSpaceRelatedSuccess(responsedata))
    } else {
      yield put(OfficeSpaceActions.officeSpaceFailure(responsedata, response.status))
    }
  },
  *postContact({ data }) {
    let response = yield call(officeSpaceService.postContact, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postContact = true
      yield put(OfficeSpaceActions.postContactSuccess(responsedata))
    } else {
      yield put(OfficeSpaceActions.officeSpaceFailure(responsedata, response.status))
    }
  },
}

export default OfficeSpaceService
