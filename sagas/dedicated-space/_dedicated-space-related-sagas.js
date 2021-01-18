/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService } from '../../services'
import DedicatedSpaceRelatedActions from '../../redux/dedicated-space/_dedicated-space-related-redux'
import { HttpStatus } from '../../constants'

const DedicatedSpaceRelatedSagas = {
  * dedicatedSpaceRelated({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.dedicatedSpaceList, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.dedicatedSpaceRelated = true
        yield put(DedicatedSpaceRelatedActions.dedicatedSpaceRelatedSuccess(responsedata))
      } else {
        yield put(DedicatedSpaceRelatedActions.dedicatedSpaceRelatedFailure(responsedata, response.status))
      }
  },
}

export default DedicatedSpaceRelatedSagas
