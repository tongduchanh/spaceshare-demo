/**
 * @author NamNH
 * TodoSagas
 */

import { call, put } from 'redux-saga/effects'

import { coworkingFavoriteService } from '../services'
import CoworkingFavoriteActions from '../redux/_coworking-favorite-redux'
import { HttpStatus } from '../constants'

const CoworkingFavoriteSagas = {
  * getCoworkingFavorite({ data, cookies }) {
    let response = yield call(coworkingFavoriteService.getCoworkingFavorite, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getCoworkingFavorite = true
      yield put(CoworkingFavoriteActions.coworkingFavoriteSuccess(responsedata))
    } else {
      yield put(CoworkingFavoriteActions.coworkingFavoriteFailure(responsedata, response.status))
    }
  },

  * togetherFavorite({ data }) {
    const { dataFavourite, callback } = data
    let response = yield call(coworkingFavoriteService.togetherFavorite, dataFavourite)
    let responsedata = yield response.json()
    callback(response.ok)
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.removeFavorite = true
      yield put(CoworkingFavoriteActions.coworkingFavoriteSuccess(responsedata))
    } else {
      yield put(CoworkingFavoriteActions.coworkingFavoriteFailure(responsedata, response.status))
    }
  },
}

export default CoworkingFavoriteSagas
