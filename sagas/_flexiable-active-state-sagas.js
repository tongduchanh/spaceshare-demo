
import { put, call } from 'redux-saga/effects'

import { flexibleActiveStateService } from '../services'
import FlexibleActiveStateActions from '../redux/_flexible-active-state-redux'
import { HttpStatus } from '../constants'

const FlexibleActiveStateSagas = {
  * flexiableActiveState({ data }) {
    let response = yield call(flexibleActiveStateService.flexiableActiveState, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.flexiableActiveState = true
      yield put(FlexibleActiveStateActions.flexibleActiveStateSuccess(responsedata))
    } else {
      yield put(FlexibleActiveStateActions.flexibleActiveStateFailure(responsedata, response.status))
    }
  },
}

export default FlexibleActiveStateSagas
