import { put, call } from 'redux-saga/effects'

import { paymentService } from '@/services'
import PointAction from '@/redux/_point.redux'
import { HttpStatus } from '@/constants'

const PointSagas = {
  *getRealPrice({ data }) {
    let response = yield call(paymentService.checkPointPromotion, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(PointAction.getRealPriceSuccess(responsedata))
    } else {
      responsedata.getRealPriceError = true
      yield put(PointAction.getRealPriceFailure(responsedata, response.status))
      yield put(PointAction.pointFailure(responsedata, response.status))
    }
  },
  *getPromotionCode({ data }) {
    let response = yield call(paymentService.checkPointPromotion, data)
    let responsedata = yield response.json()
    responsedata.getPromotionCode = true
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(PointAction.getPromotionCodeSuccess(responsedata))
    } else {
      responsedata.checkPromotionError = true
      yield put(PointAction.pointFailure(responsedata, response.status))
    }
  },
  *buyPoint({ data }) {
    let response = yield call(paymentService.buyPoint, data)
    let responsedata = yield response.json()
    responsedata.buyPoint = true
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(PointAction.buyPointSuccess(responsedata))
    } else {
      responsedata.checkPromotionError = true
      yield put(PointAction.pointFailure(responsedata, response.status))
    }
  },
}

export default PointSagas
