/**
 * @author NamNH
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getCoworkingFavoriteList: ['data', 'cookies'],
  togetherFavoriteRequest: ['data'],
  coworkingFavoriteSuccess: ['data'],
  coworkingFavoriteFailure: ['error', 'status']
})

export const CoworkingFavoriteTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const failure = state => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COWORKING_FAVORITE_LIST]: request,
  [Types.TOGETHER_FAVORITE_REQUEST]: request,
  [Types.COWORKING_FAVORITE_SUCCESS]: success,
  [Types.COWORKING_FAVORITE_FAILURE]: failure
})
