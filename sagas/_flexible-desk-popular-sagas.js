/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'
import { flexibleDeskPopularSerivce } from '../services'
import FlexibleDeskPopularActions from '../redux/_flexible-desk-popular-redux'
import { HttpStatus } from '../constants'

const FlexibleDeskNewestSagas = {
  * getFlexibleDeskPopular({ data, cookies }) {
    let response = yield call(flexibleDeskPopularSerivce.getFlexibleDeskPopular, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getFlexibleDeskPopular = true
      yield put(FlexibleDeskPopularActions.flexibleDeskPopularSuccess(responsedata))
    } else {
      yield put(FlexibleDeskPopularActions.flexibleDeskPopularFailure(responsedata, response.status))
    }
  },
}

export default FlexibleDeskNewestSagas
