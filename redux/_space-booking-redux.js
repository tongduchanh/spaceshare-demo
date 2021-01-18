/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getSpaceBookingList: ['data', 'cookies'],
  getSpaceBookingDetail: ['data', 'cookies'],
  spaceBookingSuccess: ['data'],
  spaceBookingFailure: ['error'],
})

export const SpaceBookingTypes = Types
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
  [Types.GET_SPACE_BOOKING_LIST]: request,
  [Types.GET_SPACE_BOOKING_DETAIL]: request,
  [Types.SPACE_BOOKING_SUCCESS]: success,
  [Types.SPACE_BOOKING_FAILURE]: failure
})
