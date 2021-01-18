/**
 * @author HanhTD
 * Dedicated desk type sagas
 */

import { call, put } from 'redux-saga/effects'

import { dedicatedDeskService } from '../services'
import { HttpStatus } from '../constants'
import DedicatedDeskGroupActions from '../redux/_dedicated-desk-group-redux'

const DedicatedDeskGroupSagas = {
  *dedicatedDeskGroup({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskGroupList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskGroup = true
      yield put(DedicatedDeskGroupActions.dedicatedDeskGroupSuccess(responsedata))
    } else {
      yield put(DedicatedDeskGroupActions.dedicatedDeskGroupFailure(responsedata, response.status))
    }
  },
}

export default DedicatedDeskGroupSagas
