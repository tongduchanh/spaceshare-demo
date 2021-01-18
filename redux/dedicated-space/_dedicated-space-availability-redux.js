import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  monthAvailability: ['data'],
  hourAvailability: ['data'],
  dedicatedSpaceAvailabilitySuccess: ['data'],
  dedicatedSpaceAvailabilityFailure: ['error', 'status'],
  dedicatedSpaceAvailabilityError: ['dataError', 'status'],
})

export const DedicatedSpaceAvailabilityTypes = Types
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
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const error = (state, { dataError }) => {
  return { ...state, processing: false, dataError, data: null}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.MONTH_AVAILABILITY]: request,
    [Types.HOUR_AVAILABILITY]: request,
    [Types.DEDICATED_SPACE_AVAILABILITY_SUCCESS]: success,
    [Types.DEDICATED_SPACE_AVAILABILITY_FAILURE]: failure,
    [Types.DEDICATED_SPACE_AVAILABILITY_ERROR]: error
})
