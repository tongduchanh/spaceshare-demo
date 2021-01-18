/**
 * @author HanhTD
 * SecuritySagas
 */

import {call, put} from 'redux-saga/effects'

import {securityService} from '../services'
import SecurityActions from '../redux/_security-redux'
import { HttpStatus } from '../constants'

const SecuritySagas = {
  * changePass({data}) {
      let response = yield call(securityService.changePass, data)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.changePass = true
        yield put(SecurityActions.securitySuccess(responsedata))
      } else {
        yield put(SecurityActions.securityFailure(responsedata, response.status))
      }
  },

  * sendVerifyEmail() {
    let response = yield call(securityService.sendVerifyEmail)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.sendVerifyEmail = true
      yield put(SecurityActions.securitySuccess(responsedata))
    } else {
      yield put(SecurityActions.securityFailure(responsedata, response.status))
    }
  },

  * verifyEmail({data}) {
    let response = yield call(securityService.verifyEmail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.verifyEmail = true
      yield put(SecurityActions.securitySuccess(responsedata))
    } else {
      responsedata.verifyEmailError = true
      yield put(SecurityActions.securityFailure(responsedata, response.status))
    }
  },

  * verifyPhoneNumber({data}) {
    let response = yield call(securityService.verifyPhoneNumber, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.verifyPhoneNumber = true
      yield put(SecurityActions.securitySuccess(responsedata))
    } else {
      yield put(SecurityActions.securityFailure(responsedata, response.status))
    }
  }
}

export default SecuritySagas
