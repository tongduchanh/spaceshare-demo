import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getFlexibleDeskDetail: ['data', 'cookies'],
  getFlexibleDeskList: ['data', 'cookies'],
  flexibleDeskSuccess: ['data'],
  flexibleDeskDetailSuccess: ['data'],
  flexibleDeskFailure: ['error', 'status'],
  clearStore: [],
  getSpacePolicy: ['data'],
  getSpacePolicySuccess: ['data'],
})

export const FlexibleDeskTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  flexibleDeskDetail: {},
  spacePolicy: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const flexibleDeskDetailSuccess = (state, { data }) => {
  return { ...state, processing: false, flexibleDeskDetail: data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const clearStore = (state) => {
  return { ...state, flexibleDeskDetail: {}}
}

export const getSpacePolicySuccess = (state, { data }) => {
  return { ...state, processing: false, spacePolicy: data }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FLEXIBLE_DESK_DETAIL]: request,
    [Types.GET_FLEXIBLE_DESK_LIST]: request,
    [Types.FLEXIBLE_DESK_SUCCESS]: success,
    [Types.FLEXIBLE_DESK_DETAIL_SUCCESS]: flexibleDeskDetailSuccess,
    [Types.FLEXIBLE_DESK_FAILURE]: failure,
    [Types.CLEAR_STORE]: clearStore,
    [Types.GET_SPACE_POLICY]: request,
    [Types.GET_SPACE_POLICY_SUCCESS]: getSpacePolicySuccess,
})
