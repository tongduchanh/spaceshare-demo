/**
 * @author HanhTD
 */

import {call, put} from 'redux-saga/effects'

import {paymentService} from '../services'
import PaymentActions from '../redux/_payment-redux'
import { HttpStatus } from '../constants'

const PaymentSagas = {
  * initPayment({data}) {
      let response = yield call(paymentService.initPayment, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.initPayment = true
        yield put(PaymentActions.paymentSuccess(responsedata))
      } else {
        yield put(PaymentActions.paymentFailure(responsedata, response.status))
      }
  },

  * checkPromotionCode({data}) {
      let response = yield call(paymentService.checkPromotionCode, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.checkPromotionCode = true
        yield put(PaymentActions.paymentSuccess(responsedata))
      } else {
        responsedata.checkPromotionError = true
        yield put(PaymentActions.paymentFailure(responsedata, response.status))
      }
    },

  * initPaymentSpace({ data }) {
      let response = yield call(paymentService.initPaymentSpace, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.initPaymentSpace = true
        yield put(PaymentActions.paymentSuccess(responsedata))
      } else {
        yield put(PaymentActions.paymentFailure(responsedata, response.status))
      }
    },

  * initPaymentDedicatedDesk({ data }) {
      let response = yield call(paymentService.initPaymentDedicatedDesk, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.initPaymentDedicatedDesk = true
        yield put(PaymentActions.paymentSuccess(responsedata))
      } else {
        yield put(PaymentActions.paymentFailure(responsedata, response.status))
      }
    },

  * validateTransaction({ data }) {
    let response = yield call(paymentService.validateTransaction, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.validateTransaction = true
      yield put(PaymentActions.paymentSuccess(responsedata))
    } else {
      yield put(PaymentActions.paymentFailure(responsedata, response.status))
    }
  },
}

export default PaymentSagas
