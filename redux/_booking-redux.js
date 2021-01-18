/**
 * @author NamNH
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  bookingList: ['data', 'cookies'],
  bookingListAll: ['data', 'cookies'],
  addBooking: ['data'],
  multiAddBooking: ['data'],
  editBooking: ['data'],
  removeBooking: ['id'],
  bookingSuccess: ['data'],
  bookingFailure: ['error']
})

export const BookingTypes = Types
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
  [Types.BOOKING_LIST]: request,
  [Types.BOOKING_LIST_ALL]: request,
  [Types.ADD_BOOKING]: request,
  [Types.EDIT_BOOKING]: request,
  [Types.REMOVE_BOOKING]: request,
  [Types.MULTI_ADD_BOOKING]: request,
  [Types.BOOKING_SUCCESS]: success,
  [Types.BOOKING_FAILURE]: failure
})
