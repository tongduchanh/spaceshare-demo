import { call, put } from 'redux-saga/effects'

import { paymentService } from '../services'
import MyServiceActions from '../redux/_my-service-redux'
import { HttpStatus } from '../constants'

const MyServiceSagas = {
  *checkSubscription({ data }) {
    let response = yield call(paymentService.checkSubscription, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.checkSubscription = true
      yield put(MyServiceActions.checkSubscriptionSuccess(responsedata))
    } else {
      yield put(
        MyServiceActions.myServiceFailure(responsedata, response.status),
      )
    }
  },
  *confirmSubscription({ data }) {
    let response = yield call(paymentService.confirmSubscription, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.confirmSubscription = true
      yield put(MyServiceActions.confirmSubscriptionSuccess(responsedata))
    } else {
      yield put(
        MyServiceActions.myServiceFailure(responsedata, response.status),
      )
    }
  },
}

export default MyServiceSagas
