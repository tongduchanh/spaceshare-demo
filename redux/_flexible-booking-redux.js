/**
 * @author HanhTD
 * Locations Redux
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getFlexibleBookingList: ['data', 'cookies'],
  postFlexibleBooking: ['data'],
  postFlexibleBookingError: ['error'],
  flexibleBookingSuccess: ['data'],
  flexibleBookingFailure: ['error', 'status']
})

export const FlexibleBookingTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const bookingError = (state, {error}) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FLEXIBLE_BOOKING_LIST]: request,
  [Types.POST_FLEXIBLE_BOOKING]: request,
  [Types.POST_FLEXIBLE_BOOKING_ERROR]: bookingError,
  [Types.FLEXIBLE_BOOKING_SUCCESS]: success,
  [Types.FLEXIBLE_BOOKING_FAILURE]: failure
})
