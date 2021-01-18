/**
 * @author HanhTD
 * SearchSagas
 */

import { call, put } from 'redux-saga/effects'

import { commonService } from '../services'
import { HttpStatus } from '../constants'
import SearchActions from '../redux/_search-redux'

const SearchSagas = {
  *suggestionRequest({ data, cookies }) {
    let response = yield call(commonService.suggestionRequest, data, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.suggestionRequest = true
      yield put(SearchActions.searchSuccess(responsedata))
    } else {
      yield put(SearchActions.searchFailure(responsedata, response.status))
    }
  },
}

export default SearchSagas
