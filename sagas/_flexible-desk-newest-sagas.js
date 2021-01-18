/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'
import { flexibleDeskNewestService } from '../services'
import FlexibleDeskNewestActions from '../redux/_flexible-desk-newest-redux'
import { HttpStatus } from '../constants'

const FlexibleDeskNewestSagas = {
  * getFlexibleDeskNewest({ data, cookies }) {
    let response = yield call(flexibleDeskNewestService.getFlexibleDeskNewest, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleDeskNewest = true
      yield put(FlexibleDeskNewestActions.flexibleDeskNewestSuccess(responsedata))
    } else {
      yield put(FlexibleDeskNewestActions.flexibleDeskNewestFailure(responsedata, response.status))
    }
  },
}

export default FlexibleDeskNewestSagas
