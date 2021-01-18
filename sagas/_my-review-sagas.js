/**
 * @author HanhTD
 * My Review Sagas
 */

import { put, call } from 'redux-saga/effects'

import { flexibleDeskService } from '../services'
import MyReviewActions from '../redux/_my-review-redux'
import { HttpStatus } from '../constants'

const MyReviewSagas = {
  * getMyReview({data, cookies}) {
    let response = yield call(flexibleDeskService.getMyReviewv3, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getMyReview = true
      yield put(MyReviewActions.myReviewSuccess(responsedata))
    } else {
      yield put(MyReviewActions.myReviewFailure(responsedata, response.status))
    }
  },
  
  * postReviewRequest({data}) {
    let response = yield call(flexibleDeskService.postReviewRequestv3, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postReviewRequest = true
      yield put(MyReviewActions.myReviewSuccess(responsedata))
    } else {
      yield put(MyReviewActions.myReviewFailure(responsedata, response.status))
    }
  },

  * updateReview({data}) {
    let response = yield call(MyReviewActions.updateReview, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.updateReview = true
      yield put(MyReviewActions.myReviewSuccess(responsedata))
    } else {
      yield put(MyReviewActions.myReviewFailure(responsedata, response.status))
    }
  },
}

export default MyReviewSagas
