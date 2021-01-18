/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getSpaceServiceAmenity: ['data'],
  editSpaceServiceAmenity: ['data'],
  getAvailableAmenity: ['data'],
  spaceServiceAmenitySuccess: ['data'],
  spaceServiceAmenityFailure: ['data']
})

export const SpacesServiceTypes = Types
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
  [Types.GET_SPACE_SERVICE_AMENITY]: request,
  [Types.EDIT_SPACE_SERVICE_AMENITY]: request,
  [Types.GET_AVAILABLE_AMENITY]: request,
  [Types.SPACE_SERVICE_AMENITY_SUCCESS]: success,
  [Types.SPACE_SERVICE_AMENITY_FAILURE]: failure,
})
