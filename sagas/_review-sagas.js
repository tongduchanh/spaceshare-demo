/**
 * @author HanhTD
 * Review Sagas
 */

import { put, call } from 'redux-saga/effects'

import { flexibleDeskService, spaceService } from '../services'
import ReviewActions from '../redux/_review-redux'
import { HttpStatus } from '../constants'

const ReviewSagas = {
  * getReviewCollection({data}) {
    let response = yield call(flexibleDeskService.getReviewCollection, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getReviewCollection = true
      responsedata.reviews = responsedata.data
      yield put(ReviewActions.reviewSuccess(responsedata))
    } else {
      yield put(ReviewActions.reviewFailure(responsedata, response.status))
    }
  },
  * postReviewGallery({data}) {
    let response = yield call(spaceService.postReviewGallery, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postReviewGallery = true
      yield put(ReviewActions.postReviewGallerySuccess(responsedata))
    } else {
      yield put(ReviewActions.reviewFailure(responsedata, response.status))
    }
  },
}

export default ReviewSagas
