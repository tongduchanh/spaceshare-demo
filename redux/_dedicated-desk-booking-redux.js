/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedDeskBookingList: ['data', 'cookies'],
  dedicatedDeskBookingDetail: ['data', 'cookies'],
  dedicatedDeskBookingSuccess: ['data'],
  dedicatedDeskBookingFailure: ['error'],
})

export const DedicatedDeskBookingTypes = Types
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
  [Types.DEDICATED_DESK_BOOKING_LIST]: request,
  [Types.DEDICATED_DESK_BOOKING_DETAIL]: request,
  [Types.DEDICATED_DESK_BOOKING_SUCCESS]: success,
  [Types.DEDICATED_DESK_BOOKING_FAILURE]: failure
})
