/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getBannerCollection: ['data'],
  listService: ['data'],
  commonSuccess: ['data'],
  commonFailure: ['error', 'status'],
  getProvince: ['data'],
  getProvinceSuccess: ['data'],
  getDistrict: ['data'],
  getDistrictSuccess: ['data']
})

export const CommonTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  province: {},
  district: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const getProvinceSuccess = (state, { data }) => {
  return { ...state, processing: false, province: data }
}

export const getDistrictSuccess = (state, { data }) => {
  return { ...state, processing: false, district: data }
}

export const failure = state => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BANNER_COLLECTION]: request,
  [Types.LIST_SERVICE]: request,
  [Types.COMMON_SUCCESS]: success,
  [Types.COMMON_FAILURE]: failure,
  [Types.GET_PROVINCE]: request,
  [Types.GET_PROVINCE_SUCCESS]: getProvinceSuccess,
  [Types.GET_DISTRICT]: request,
  [Types.GET_DISTRICT_SUCCESS]: getDistrictSuccess,
})
