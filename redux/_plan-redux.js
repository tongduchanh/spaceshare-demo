/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPlanDetail: ['data'],
  planDetailSuccess: ['data'],
  getPlanList: ['data'],
  getPlanType: ['data'],
  planSuccess: ['data'],
  planFailure: ['error'],
  setActiveType: ['data']
})

export const PlanTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  detail: {},
  activeType: 0,
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const planDetailSuccess = (state, { data }) => {
  return { ...state, processing: false, detail: data }
}

export const failure = state => {
  return { ...state, processing: false }
}

export const setActiveType = (state, {data}) => {
  return { ...state, activeType: data }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PLAN_DETAIL]: request,
  [Types.PLAN_DETAIL_SUCCESS]: planDetailSuccess,
  [Types.GET_PLAN_LIST]: request,
  [Types.GET_PLAN_TYPE]: request,
  [Types.PLAN_SUCCESS]: success,
  [Types.PLAN_FAILURE]: failure,
  [Types.SET_ACTIVE_TYPE]: setActiveType,
})
