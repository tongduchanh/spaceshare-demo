/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedDeskList: ['data'],
  dedicatedDeskGroupList: ['data'],
  dedicatedDeskDetail: ['data'],
  dedicatedDeskRequest: ['data'],
  dedicatedDeskSuccess: ['data'],
  dedicatedDeskDetailSuccess: ['data'],
  dedicatedDeskFailure: ['error'],
  clearDedicatedDeskDetail: [],
})

export const DedicatedDeskTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  dedicatedDeskDetail: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const dedicatedDeskDetailSuccess = (state, { data }) => {
  return { ...state, processing: false, dedicatedDeskDetail: data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const clearDedicatedDeskDetail = (state) => {
  return { ...state, dedicatedDeskDetail: {} }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEDICATED_DESK_LIST]: request,
  [Types.DEDICATED_DESK_GROUP_LIST]: request,
  [Types.DEDICATED_DESK_DETAIL]: request,
  [Types.DEDICATED_DESK_REQUEST]: request,
  [Types.DEDICATED_DESK_SUCCESS]: success,
  [Types.DEDICATED_DESK_DETAIL_SUCCESS]: dedicatedDeskDetailSuccess,
  [Types.DEDICATED_DESK_FAILURE]: failure,
  [Types.CLEAR_DEDICATED_DESK_DETAIL]: clearDedicatedDeskDetail,
})
