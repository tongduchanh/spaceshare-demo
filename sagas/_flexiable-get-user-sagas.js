
import { put, call } from 'redux-saga/effects'

import { flexibleGetUserService } from '../services'
import FlexibleGetUserActions from '../redux/_flexible-get-user-redux'
import { HttpStatus } from '../constants'

const FlexibleGetUserSagas = {
  * getUserFlexiable({ data }) {
    let response = yield call(flexibleGetUserService.getUserFlexiable, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getUserFlexiable = true
      yield put(FlexibleGetUserActions.flexibleGetUserSuccess(responsedata))
    } else {
      yield put(FlexibleGetUserActions.flexibleGetUserFailure(responsedata, response.status))
    }
  },
}

export default FlexibleGetUserSagas
