/**
 * @author HanhTD
 */

import {call, put} from 'redux-saga/effects'

import {paymentService} from '../services'
import PaymentChannelActions from '../redux/_payment-channel-redux'
import { HttpStatus } from '../constants'

const PaymentChannelSagas = {
  * listChannel() {
      let response = yield call(paymentService.listChannel)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.listChannel = true
        yield put(PaymentChannelActions.paymentChannelSuccess(responsedata))
      } else {
        yield put(PaymentChannelActions.paymentChannelFailure(responsedata, response.status))
      }
    } 
}

export default PaymentChannelSagas
