/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService } from '../../services'
import DedicatedUserTypeActions from '../../redux/dedicated-space/_dedicated-user-type-redux'
import { HttpStatus } from '../../constants'

const DedicatedUserTypeSagas = {
  * dedicatedUserType({ data }) {
    let response = yield call(dedicatedSpaceService.dedicatedUserType, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedUserType = true
      yield put(DedicatedUserTypeActions.dedicatedUserTypeSuccess(responsedata))
    } else {
      yield put(DedicatedUserTypeActions.dedicatedUserTypeFailure(responsedata, response.status))
    }
},
}

export default DedicatedUserTypeSagas
