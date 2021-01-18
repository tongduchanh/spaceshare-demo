import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedSpaceList: ['data', 'cookies'],
  dedicatedSpaceDetail: ['data', 'cookies'],
  dedicatedSpaceSuccess: ['data'],
  dedicatedSpaceDetailSuccess: ['data'],
  dedicatedSpaceFailure: ['error', 'status'],
  clearDedicatedSpaceDetail: [],
})

export const DedicatedSpaceTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  dedicatedSpaceDetail: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const dedicatedSpaceDetailSuccess = (state, { data }) => {
  return { ...state, processing: false, dedicatedSpaceDetail: data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const clearDedicatedSpaceDetail = (state) => {
  return { ...state, dedicatedSpaceDetail: {} }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEDICATED_SPACE_LIST]: request,
    [Types.DEDICATED_SPACE_DETAIL]: request,
    [Types.DEDICATED_SPACE_SUCCESS]: success,
    [Types.DEDICATED_SPACE_DETAIL_SUCCESS]: dedicatedSpaceDetailSuccess,
    [Types.DEDICATED_SPACE_FAILURE]: failure,
    [Types.CLEAR_DEDICATED_SPACE_DETAIL]: clearDedicatedSpaceDetail
})
