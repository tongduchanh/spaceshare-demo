/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService } from '../../services'
import DedicatedSpaceActions from '../../redux/dedicated-space/_dedicated-space-redux'
import { HttpStatus } from '../../constants'

const DedicatedSpaceSagas = {
  * dedicatedSpaceList({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.dedicatedSpaceList, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.dedicatedSpaceList = true
        yield put(DedicatedSpaceActions.dedicatedSpaceSuccess(responsedata))
      } else {
        yield put(DedicatedSpaceActions.dedicatedSpaceFailure(responsedata, response.status))
      }
  },
  * dedicatedSpaceDetail({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.dedicatedSpaceDetail, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.dedicatedSpaceDetail = true
        yield put(DedicatedSpaceActions.dedicatedSpaceDetailSuccess(responsedata))
      } else {
        yield put(DedicatedSpaceActions.dedicatedSpaceFailure(responsedata, response.status))
      }
  },
}

export default DedicatedSpaceSagas
