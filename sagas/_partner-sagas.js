/**
 * @author HanhTD
 * PartnerSagas
 */

import { call, put } from 'redux-saga/effects'

import { partnerService } from '../services'
import { HttpStatus } from '../constants'
import PartnerActions from '../redux/_partner-redux'

const PartnerSagas = {
  *partnerList({ data }) {
    let response = yield call(partnerService.partnerList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.partnerList = true
      yield put(PartnerActions.partnerSuccess(responsedata))
    } else {
      yield put(PartnerActions.partnerFailure(responsedata, response.status))
    }
  },
}

export default PartnerSagas
