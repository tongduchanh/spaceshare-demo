import { createReducer, createActions } from 'reduxsauce'
import {HotDeskType} from '../constants'
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getHotDeskList: ['data', 'cookies'],
  hotDeskListSuccess: ['data'],

  getHotDeskDetail: ['data', 'cookies'],
  clearHotDeskDetail: ['data'],
  hotDeskDetailSuccess: ['data'],

  getHotDeskRelated: ['data', 'cookies'],
  hotDeskRelatedSuccess: ['data'],

  postContact:['data'],
  postContactSuccess: ['data'],
  
  hotDeskFailure: ['error', 'status'],

  setPriceTab: ['data'],
})

export const HotDeskTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  list: {},
  detail: {},
  related: {},
  contact: {},
  priceActiveTab: HotDeskType.FIXED_DESK
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const hotDeskListSuccess = (state, {data}) => {
  return { ...state, processing: false, list: data}
}

export const hotDeskDetailSuccess = (state, {data}) => {
  return { ...state, processing: false, detail: data}
}

export const clearHotDeskDetail = (state) => {
  return { ...state, processing: false, detail: null }
}

export const hotDeskRelatedSuccess = (state, {data}) => {
  return { ...state, processing: false, related: data}
}

export const postContactSuccess = (state, {data}) => {
  return { ...state, processing: false, contact: data}
}

export const failure = (state) => {
  return { ...state, processing: false }
}
export const setPriceTab = (state, {data}) => {
  return {...state, priceActiveTab: data}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_HOT_DESK_LIST]: request,
  [Types.GET_HOT_DESK_DETAIL]: request,
  [Types.GET_HOT_DESK_RELATED]: request,
  [Types.POST_CONTACT]: request,
  [Types.HOT_DESK_LIST_SUCCESS]: hotDeskListSuccess,
  [Types.HOT_DESK_DETAIL_SUCCESS]: hotDeskDetailSuccess,
  [Types.HOT_DESK_RELATED_SUCCESS]: hotDeskRelatedSuccess,
  [Types.POST_CONTACT_SUCCESS]: postContactSuccess,
  [Types.HOT_DESK_FAILURE]: failure,
  [Types.CLEAR_HOT_DESK_DETAIL]: clearHotDeskDetail,
  [Types.SET_PRICE_TAB]: setPriceTab,
})
