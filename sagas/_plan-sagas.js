/**
 * @author HanhTD
 */

import {call, put} from 'redux-saga/effects'

import {planService} from '../services'
import PlanActions from '../redux/_plan-redux'
import { HttpStatus } from '../constants'

const PlanSagas = {
  * getPlanDetail({ data }) {
    let response = yield call(planService.getPlanDetail, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getPlanDetail = true
      yield put(PlanActions.planDetailSuccess(responsedata))
    } else {
      yield put(PlanActions.planSuccess(responsedata, response.status))
    }
  },

  * getPlanList({ data }) {
    let response = yield call(planService.getPlanList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getPlanList = true
      yield put(PlanActions.planSuccess(responsedata))
    } else {
      yield put(PlanActions.planSuccess(responsedata, response.status))
    }
  },

  * getPlanType({data}) {
    let response = yield call(planService.getPlanType, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getPlanType = true
      yield put(PlanActions.planSuccess(responsedata))
    } else {
      yield put(PlanActions.planSuccess(responsedata, response.status))
    }
  },
}

export default PlanSagas
