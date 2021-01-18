/**
 * @author HanhTD
 * Coworking Sagas
 */

import { put, call } from 'redux-saga/effects'

import { dedicatedSpaceService } from '../../services'
import dedicatedSpacePricingActions from '../../redux/dedicated-space/_dedicated-space-pricing-redux'
import { HttpStatus, PricingType } from '../../constants'

const DedicatedSpaceBookingSagas = {
  * dedicatedSpacePricingCalculate({ data, cookies }) {
      let response = yield call(dedicatedSpaceService.dedicatedSpaceBookingCalculate, data, cookies)
      let responsedata = yield response.json()
      responsedata.dedicatedSpacePricingCalculate = true
      if (response.status < HttpStatus.BAD_REQUEST) {
        if (data.rate_type === PricingType.HOURLY_RATE) {
          responsedata.calculateHourly = true
        } else if (data.rate_type === PricingType.DAILY_RATE) {
          responsedata.calculateDaily = true
        } else if (data.rate_type === PricingType.SHIFT_RATE) {
          responsedata.calculateShift = true
        }
        yield put(dedicatedSpacePricingActions.dedicatedSpacePricingSuccess(responsedata))
      } else {
        responsedata.calculatePricingError = true
        if (data.rate_type === PricingType.HOURLY_RATE) {
          responsedata.calculateHourlyError = true
        } else if (data.rate_type === PricingType.DAILY_RATE) {
          responsedata.calculateDailyError = true
        } else if (data.rate_type === PricingType.SHIFT_RATE) {
          responsedata.calculateShiftError = true
        }
        yield put(dedicatedSpacePricingActions.dedicatedSpacePricingError(responsedata, response.status))
      }
  },
}

export default DedicatedSpaceBookingSagas
