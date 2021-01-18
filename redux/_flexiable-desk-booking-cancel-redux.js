import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    flexibleDeskBookingCancel:  ['data'],
    flexibleDeskBookingCancelSuccess: ['data'],
    flexibleDeskBookingCancelFailure: ['error', 'status']
})

export const FlexibleDeskBookingCancelTypes = Types
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

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLEXIBLE_DESK_BOOKING_CANCEL]: request,
  [Types.FLEXIBLE_DESK_BOOKING_CANCEL_SUCCESS]: success,
  [Types.FLEXIBLE_DESK_BOOKING_CANCEL_FAILURE]: failure
})
