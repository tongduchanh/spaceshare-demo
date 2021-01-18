import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedSpaceBookingCalculate: ['data'],
  addDedicatedSpaceBooking: ['data'],
  bookingList: ['data'],
  createCheckoutLink: ['data'],
  dedicatedSpaceBookingSuccess: ['data'],
  dedicatedSpaceBookingFailure: ['error', 'status'],
  dedicatedSpaceBookingError: ['dataError', 'status'],
})

export const DedicatedSpaceBookingTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, dataError: null }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const error = (state, { dataError }) => {
  return { ...state, processing: false, dataError, data: null}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEDICATED_SPACE_BOOKING_CALCULATE]: request,
    [Types.BOOKING_LIST]: request,
    [Types.CREATE_CHECKOUT_LINK]: request,
    [Types.ADD_DEDICATED_SPACE_BOOKING]: request,
    [Types.DEDICATED_SPACE_BOOKING_SUCCESS]: success,
    [Types.DEDICATED_SPACE_BOOKING_FAILURE]: failure,
    [Types.DEDICATED_SPACE_BOOKING_ERROR]: error
})
