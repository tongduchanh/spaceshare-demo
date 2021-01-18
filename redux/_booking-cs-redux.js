/**
 * @author NamNH
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getBookingCsList: ['data'],
  bookingCsSuccess: ['data'],
  bookingCsFailure: ['error']
})

export const BookingCsTypes = Types
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
  [Types.GET_BOOKING_CS_LIST]: request,
  [Types.BOOKING_CS_SUCCESS]: success,
  [Types.BOOKING_CS_FAILURE]: failure
})
