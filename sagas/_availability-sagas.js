/**
 * @author HanhTD
 * Availability Sagas
 */

import {put, call} from 'redux-saga/effects'

import {availabilityService} from '../services'
import AvailabilityActions from '../redux/_availability-redux'
import { HttpStatus } from '../constants'

const AvailabilitySagas = {
    * flexibleDeskAvailabilityList({data}) {
        let response = yield call(availabilityService.flexibleDeskAvailabilityList, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.flexibleDeskAvailabilityList = true
          yield put(AvailabilityActions.availabilitySuccess(responsedata))
        } else {
          yield put(AvailabilityActions.availabilityError(responsedata, response.status))
        }
    },
    * flexibleAvailabilityBySpace({data}) {
        let response = yield call(availabilityService.flexibleAvailabilityBySpace, data)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
          responsedata.flexibleAvailabilityBySpace = true
          yield put(AvailabilityActions.availabilitySuccess(responsedata))
        } else {
          yield put(AvailabilityActions.availabilityError(responsedata, response.status))
        }
    },
}

export default AvailabilitySagas
