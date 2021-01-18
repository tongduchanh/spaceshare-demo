/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  flexibleDeskAvailabilityList: ['data'],
  flexibleAvailabilityBySpace: ['data'],
  availabilitySuccess: ['data'],
  availabilityFailure: ['error', 'status'],
  availabilityError: ['dataError', 'status'],
})

export const AvailabilityTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null,
  dataError: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, dataError: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error}
}

export const error = (state, { dataError }) => {
  return { ...state, processing: false, dataError, data: null}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLEXIBLE_DESK_AVAILABILITY_LIST]: request,
  [Types.FLEXIBLE_AVAILABILITY_BY_SPACE]: request,
  [Types.AVAILABILITY_SUCCESS]: success,
  [Types.AVAILABILITY_FAILURE]: failure,
  [Types.AVAILABILITY_ERROR]: error
})
