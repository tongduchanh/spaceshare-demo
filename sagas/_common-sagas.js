import { call, put } from 'redux-saga/effects'

import { commonService } from '../services'
import CommonActions from '../redux/_common-redux'
import { HttpStatus } from '../constants'

const CommonSagas = {
  *getBannerCollection() {
    let response = yield call(commonService.getBannerCollection)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getBannerCollection = true
      yield put(CommonActions.commonSuccess(responsedata))
    } else {
      yield put(CommonActions.commonFailure(responsedata, response.status))
    }
  },
  *listService() {
    let response = yield call(commonService.listService)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.listService = true
      yield put(CommonActions.commonSuccess(responsedata))
    } else {
      yield put(CommonActions.commonFailure(responsedata, response.status))
    }
  },
  *getProvince() {
    let response = yield call(commonService.getProvince)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getProvince = true
      yield put(CommonActions.getProvinceSuccess(responsedata))
    } else {
      yield put(CommonActions.commonFailure(responsedata, response.status))
    }
  },
  *getDistrict({data}) {
    let response = yield call(commonService.getDistrict, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getDistrict = true
      yield put(CommonActions.getDistrictSuccess(responsedata))
    } else {
      yield put(CommonActions.commonFailure(responsedata, response.status))
    }
  },
}

export default CommonSagas
