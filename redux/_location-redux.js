/**
 * @author HanhTD
 * Locations Redux
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getDistrictList: ['data'],
  getAvailableProvinces: ['data'],
  availableProvincesSuccess: ['data'],
  getAvailableDistricts: ['data'],
  availableDistrictsSuccess: ['data'],
  locationSuccess: ['data'],
  locationFailure: ['error', 'status']
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  provinces: {},
  districts: {}
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

export const availableProvincesSuccess = (state, { data }) => {
  return { ...state, provinces: data }
}
export const availableDistrictsSuccess = (state, { data }) => {
  return { ...state, districts: data }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_DISTRICT_LIST]: request,
  [Types.LOCATION_SUCCESS]: success,
  [Types.GET_AVAILABLE_PROVINCES]: request,
  [Types.AVAILABLE_PROVINCES_SUCCESS]: availableProvincesSuccess,
  [Types.GET_AVAILABLE_DISTRICTS]: request,
  [Types.AVAILABLE_DISTRICTS_SUCCESS]: availableDistrictsSuccess,
  [Types.LOCATION_SUCCESS]: success,
  [Types.LOCATION_FAILURE]: failure
})
