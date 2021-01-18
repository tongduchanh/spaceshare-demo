/**
 * @author VincTuyen
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { flexibleDeskService } from '../services'
import FlexibleDeskListActions from '../redux/_flexible-desk-list-redux'
import { HttpStatus } from '../constants'

const FlexibleDeskListSagas = {

  * getFlexibleDeskRelated({ data, cookies }) {
    let response = yield call(flexibleDeskService.getFlexibleDeskRelated, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleDeskRelated = true
      yield put(FlexibleDeskListActions.flexibleDeskListSuccess(responsedata))
    } else {
      yield put(FlexibleDeskListActions.flexibleDeskListFailure(responsedata, response.status))
    }
  },
}

export default FlexibleDeskListSagas
