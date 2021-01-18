/**
 * @author HanhTD
 * TodoSagas
 */

import {put, call} from 'redux-saga/effects'

import {subscriptionService} from '../services'
import SubscriptionActions from '../redux/_subscription-redux'
import { HttpStatus } from '../constants'

const SubscriptionSagas = {
    * list({data}) {
        let response = yield call(subscriptionService.list, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.list = true
          responsedata.status = data.status
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    },
    * listUsing({data}) {
        let response = yield call(subscriptionService.list2, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.listUsing = true
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    },
    * listUsed({data}) {
        let response = yield call(subscriptionService.list2, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.listUsed = true
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    },
    * activatedList() {
        let response = yield call(subscriptionService.activatedList)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.activatedList = true
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    },
    * request({data}) {
        let response = yield call(subscriptionService.request, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.request = true
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    },
    * active({data}) {
        let response = yield call(subscriptionService.active, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.active = true
          yield put(SubscriptionActions.subscriptionSuccess(responsedata))
        } else {
          yield put(SubscriptionActions.subscriptionFailure(responsedata, response.status))
        }
    }
}

export default SubscriptionSagas
