/**
 * @author HanhTD
 * Dedicated desk type sagas
 */

import { call, put } from 'redux-saga/effects'

import { dedicatedDeskService } from '../services'
import { HttpStatus } from '../constants'
import DedicatedDeskTypeActions from '../redux/_dedicated-desk-type-redux'

const DedicatedDeskTypeSagas = {
  *dedicatedDeskTypeList({ data }) {
    let response = yield call(dedicatedDeskService.dedicatedDeskTypeList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedDeskTypeList = true
      yield put(DedicatedDeskTypeActions.dedicatedDeskTypeSuccess(responsedata))
    } else {
      yield put(DedicatedDeskTypeActions.dedicatedDeskTypeFailure(responsedata, response.status))
    }
  },
}

export default DedicatedDeskTypeSagas
