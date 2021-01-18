/**
 * @author HanhTD
 * Activated Sagas
 */

import {put, call} from 'redux-saga/effects'

import {subscriptionService} from '../services'
import ActivatedActions from '../redux/_activated-redux'
import { HttpStatus } from '../constants'

const ActivatedSagas = {
    * activatedList() {
        let response = yield call(subscriptionService.activatedList)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
            responsedata.activatedList = true
            yield put(ActivatedActions.activatedSuccess(responsedata))
        } else {
            yield put(ActivatedActions.activatedFailure(responsedata, response.status))
        }
    }
}

export default ActivatedSagas
