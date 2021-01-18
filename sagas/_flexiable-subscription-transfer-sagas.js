
import { put, call } from 'redux-saga/effects'

import { flexibleSubscriptionTransferService } from '../services'
import FlexibleSubscriptionTransferActions from '../redux/_flexiable-subcription-transfer-redux'
import { HttpStatus } from '../constants'

const FlexibleSubscriptionTransferSagas = {
  * postTransferToFriends({ data }) {
    let response = yield call(flexibleSubscriptionTransferService.postTransferToFriends, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postTransferToFriends = true
      yield put(FlexibleSubscriptionTransferActions.flexibleSubscriptionTransferSuccess(responsedata))
    } else {
      yield put(FlexibleSubscriptionTransferActions.flexibleSubscriptionTransferFailure(responsedata, response.status))
    }
  },
}

export default FlexibleSubscriptionTransferSagas
