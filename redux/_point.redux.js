/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getRealPrice: ['data'],
  getRealPriceSuccess: ['data'],
  getRealPriceFailure: ['error'],
  getPromotionCode: ['data'],
  getPromotionCodeSuccess: ['data'],
  buyPoint: ['data'],
  buyPointSuccess: ['data'],
  pointSuccess: ['data'],
  pointFailure: ['error']
})

export const PointTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  error: null,
  realPrice: {},
  realPriceError: null,
  buyPoint: {}
}

/* ------------- Reducers ------------- */
export const request = state => { 
  return { ...state, processing: true }
}
export const getRealPriceSuccess = (state, { data }) => {
  return { ...state, processing: false, realPrice: data}
}
export const getRealPriceFailure = (state, { error }) => {
  return { ...state, processing: false, realPriceError: error}
}
export const getPromotionCodeSuccess = (state, { data }) => {
  return { ...state, processing: false, realPrice: data}
}
export const buyPointSuccess = (state, { data }) => {
  return { ...state, processing: false, buyPoint: data}
}
export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REAL_PRICE]: request,
  [Types.GET_REAL_PRICE_SUCCESS]: getRealPriceSuccess,
  [Types.GET_REAL_PRICE_FAILURE]: getRealPriceFailure,
  [Types.GET_PROMOTION_CODE]: request,
  [Types.GET_PROMOTION_CODE_SUCCESS]: getPromotionCodeSuccess,
  [Types.BUY_POINT]: request,
  [Types.BUY_POINT_SUCCESS]: buyPointSuccess,
  [Types.POINT_SUCCESS]: success,
  [Types.POINT_FAILURE]: failure
})
