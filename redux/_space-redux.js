/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getSpaceList: ['data'],
  getSpaceDetail: ['data'],
  groupedList: ['data'],
  spaceSuccess: ['data'],
  spaceDetailSuccess: ['data'],
  spaceFailure: ['error'],
})

export const SpacesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  spaceDetail: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const spaceDetailSuccess = (state, { data }) => {
  return { ...state, processing: false, spaceDetail: data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SPACE_LIST]: request,
  [Types.GET_SPACE_DETAIL]: request,
  [Types.GROUPED_LIST]: request,
  [Types.SPACE_SUCCESS]: success,
  [Types.SPACE_DETAIL_SUCCESS]: spaceDetailSuccess,
  [Types.SPACE_FAILURE]: failure
})
