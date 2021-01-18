import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedSpaceBookingDetail: ['data'],
  dedicatedSpaceBookingDetailSuccess: ['data'],
  dedicatedSpaceBookingDetailFailure: ['error', 'status'],
})

export const DedicatedSpaceBookingDetailTypes = Types
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

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEDICATED_SPACE_BOOKING_DETAIL]: request,
  [Types.DEDICATED_SPACE_BOOKING_DETAIL_SUCCESS]: success,
  [Types.DEDICATED_SPACE_BOOKING_DETAIL_FAILURE]: failure,
})
