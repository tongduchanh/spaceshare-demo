import {call, put} from 'redux-saga/effects'

import {commonService} from '../services'
import BannerActions from '../redux/_banner-redux'
import { HttpStatus } from '../constants'

const BannerSagas = {
  * getBannerList({data}) {
    let response = yield call(commonService.getBannerList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getBannerList = true
      yield put(BannerActions.bannerSuccess(responsedata))
    } else {
      yield put(BannerActions.bannerFailure(responsedata, response.status))
    }
  },
}

export default BannerSagas
