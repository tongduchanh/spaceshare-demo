/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getDedicatedDeskRequestList: ['data', 'cookies'],
  postDedicatedDeskRequest: ['data'],
  dedicatedDeskRequestSuccess: ['data'],
  dedicatedDeskRequestFailure: ['error'],
})

export const DedicatedDeskRequestTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DEDICATED_DESK_REQUEST_LIST]: request,
  [Types.POST_DEDICATED_DESK_REQUEST]: request,
  [Types.DEDICATED_DESK_REQUEST_SUCCESS]: success,
  [Types.DEDICATED_DESK_REQUEST_FAILURE]: failure
})
