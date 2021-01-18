/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedBookingService } from '../../services'
import dedicatedSpaceBookingDetailActions from '../../redux/dedicated-space/_dedicated-space-booking-detail-redux'
import { HttpStatus } from '../../constants'

const DedicatedSpaceBookingDetailSagas = {
  * dedicatedSpaceBookingDetail({ data }) {
    let response = yield call(dedicatedBookingService.dedicatedBookingDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.dedicatedSpaceBookingDetail = true
      yield put(dedicatedSpaceBookingDetailActions.dedicatedSpaceBookingDetailSuccess(responsedata))
    } else {
      yield put(dedicatedSpaceBookingDetailActions.dedicatedSpaceBookingDetailFailure(responsedata, response.status))
    }
  },
}

export default DedicatedSpaceBookingDetailSagas
