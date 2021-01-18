/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService } from '../../services'
import dedicatedSpaceAvailabilityActions from '../../redux/dedicated-space/_dedicated-space-availability-redux'
import { HttpStatus, PricingType } from '../../constants'

const DedicatedSpaceAvailabilitySagas = {
  * monthAvailability({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.monthAvailability, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.monthAvailability = true
        yield put(dedicatedSpaceAvailabilityActions.dedicatedSpaceAvailabilitySuccess(responsedata))
      } else {
        yield put(dedicatedSpaceAvailabilityActions.dedicatedSpaceAvailabilityError(responsedata, response.status))
      }
  },
  * hourAvailability({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.hourAvailability, data, cookies)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        if (data.rate_type == PricingType.DAILY_RATE && data.checking_type == 0) {
          responsedata.startTimeDaily = true
        } else if (data.rate_type == PricingType.DAILY_RATE && data.checking_type == 1) {
          responsedata.endTimeDaily = true
        } else if (data.rate_type == PricingType.HOURLY_RATE && data.checking_type == 0) {
          responsedata.startTimeHourly = true
        } else if (data.rate_type == PricingType.HOURLY_RATE && data.checking_type == 1) {
          responsedata.endTimeHourly = true
        } else if (data.rate_type == PricingType.SHIFT_RATE && data.checking_type == 0) {
          responsedata.timeShift = true
        }
        yield put(dedicatedSpaceAvailabilityActions.dedicatedSpaceAvailabilitySuccess(responsedata))
      } else {
        yield put(dedicatedSpaceAvailabilityActions.dedicatedSpaceAvailabilityError(responsedata, response.status))
      }
  },
}

export default DedicatedSpaceAvailabilitySagas
