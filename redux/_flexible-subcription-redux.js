import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  flexibleSubcriptionList: ['data', 'cookies'],
  flexibleSubcriptionBooking: ['data'],
  flexibleSubcriptionBookingSuccess: ['data'],
  flexibleSubcriptionBookingError: ['error'],
  flexibleSubcriptionSuccess: ['data'],
  flexibleSubcriptionFailure: ['error', 'status']
})

export const FlexibleSubcriptionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  subscriptionBooking: {},
  subscriptionBookingError: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const flexibleSubcriptionBookingSuccess = (state, { data }) => {
  return { ...state, processing: false, subscriptionBooking: data, subscriptionBookingError: null }
}
export const flexibleSubcriptionBookingError = (state, { error }) => {
  return { ...state, processing: false, subscriptionBookingError: error }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLEXIBLE_SUBCRIPTION_LIST]: request,
  [Types.FLEXIBLE_SUBCRIPTION_BOOKING]: request,
  [Types.FLEXIBLE_SUBCRIPTION_BOOKING_SUCCESS]: flexibleSubcriptionBookingSuccess,
  [Types.FLEXIBLE_SUBCRIPTION_BOOKING_ERROR]: flexibleSubcriptionBookingError,
  [Types.FLEXIBLE_SUBCRIPTION_SUCCESS]: success,
  [Types.FLEXIBLE_SUBCRIPTION_FAILURE]: failure
})
