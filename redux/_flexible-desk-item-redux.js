/**
 * @author HanhTD
 * Flexible desk item redux
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setActiveBookingTab: ['data'],
  checkBooking: ['data'],
  checkBookingSuccess: ['data'],
  checkBookingError: ['error'],
  bookingWithPoint: ['data'],
  bookingWithPointSuccess: ['data'],
  bookingError: ['error'],
  flexibleDeskItemFailure: ['error', 'status'],
  clearFlexibleDeskItem: [],
})

export const FlexibleDeskItemTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: {},
  activeBookingTab: '1',
  checkBooking: {},
  bookingPoint: {},
  bookingError: null,
  checkBookingError: null,
}

/* ------------- Reducers ------------- */
export const request = (state) => {
  return { ...state, processing: true }
}

export const checkBookingSuccess = (state, { data }) => {
  return { ...state, processing: false, checkBooking: data, bookingError: null, checkBookingError: null  }
}

export const bookingWithPointSuccess = (state, { data }) => {
  return { ...state, processing: false, bookingPoint: data, bookingError: null }
}

export const setActiveBookingTab = (state, { data }) => {
  return { ...state, activeBookingTab: data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const checkBookingError = (state, { error }) => {
  return { ...state, processing: false, checkBookingError: error, }
}

export const bookingError = (state, { error }) => {
  return {
    ...state,
    processing: false,
    bookingError: error,
    bookingPoint: {},
    checkBooking: {}
  }
}

export const clearFlexibleDeskItem = (state) => {
  return { ...state, bookingError: null, checkBooking: {}, bookingPoint: {} }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ACTIVE_BOOKING_TAB]: setActiveBookingTab,
  [Types.CHECK_BOOKING]: request,
  [Types.CHECK_BOOKING_SUCCESS]: checkBookingSuccess,
  [Types.BOOKING_WITH_POINT]: request,
  [Types.BOOKING_WITH_POINT_SUCCESS]: bookingWithPointSuccess,
  [Types.FLEXIBLE_DESK_ITEM_FAILURE]: failure,
  [Types.BOOKING_ERROR]: bookingError,
  [Types.CHECK_BOOKING_ERROR]: checkBookingError,
  [Types.CLEAR_FLEXIBLE_DESK_ITEM]: clearFlexibleDeskItem,
})
