import { createReducer, createActions } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getOfficeSpaceList: ['data', 'cookies'],
  officeSpaceListSuccess: ['data'],

  getOfficeSpaceDetail: ['data', 'cookies'],
  clearOfficeSpaceDetail: ['data'],
  officeSpaceDetailSuccess: ['data'],

  getOfficeSpaceRelated: ['data', 'cookies'],
  officeSpaceRelatedSuccess: ['data'],

  postContact:['data'],
  postContactSuccess: ['data'],
  
  officeSpaceFailure: ['error', 'status'],
})

export const OfficeSpaceTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  list: {},
  detail: {},
  related: {},
  contact: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const officeSpaceListSuccess = (state, {data}) => {
  return { ...state, processing: false, list: data}
}

export const officeSpaceDetailSuccess = (state, {data}) => {
  return { ...state, processing: false, detail: data}
}

export const clearOfficeSpaceDetail = (state) => {
  return { ...state, processing: false, detail: null }
}

export const officeSpaceRelatedSuccess = (state, {data}) => {
  return { ...state, processing: false, related: data}
}

export const postContactSuccess = (state, {data}) => {
  return { ...state, processing: false, contact: data}
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_OFFICE_SPACE_LIST]: request,
  [Types.GET_OFFICE_SPACE_DETAIL]: request,
  [Types.GET_OFFICE_SPACE_RELATED]: request,
  [Types.POST_CONTACT]: request,
  [Types.OFFICE_SPACE_LIST_SUCCESS]: officeSpaceListSuccess,
  [Types.OFFICE_SPACE_DETAIL_SUCCESS]: officeSpaceDetailSuccess,
  [Types.OFFICE_SPACE_RELATED_SUCCESS]: officeSpaceRelatedSuccess,
  [Types.POST_CONTACT_SUCCESS]: postContactSuccess,
  [Types.OFFICE_SPACE_FAILURE]: failure,
  [Types.CLEAR_OFFICE_SPACE_DETAIL]: clearOfficeSpaceDetail,
})
