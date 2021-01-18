/**
 * @author HanhTD
 * Activity Type Sagas
 */

import {put, call} from 'redux-saga/effects'

import {spaceService} from '../services'
import ActivityTypeActions from '../redux/_activity-type-redux'
import { HttpStatus } from '../constants'

const ActivityTypeSagas = {
    * activityTypeList() {
        let response = yield call(spaceService.activityTypeList)
        let responsedata = yield response.json()
        if (response.status < HttpStatus.BAD_REQUEST) {
            responsedata.activityTypeList = true
            yield put(ActivityTypeActions.activityTypeSuccess(responsedata))
        } else {
            yield put(ActivityTypeActions.activityTypeFailure(responsedata, response.status))
        }
    }
}

export default ActivityTypeSagas
