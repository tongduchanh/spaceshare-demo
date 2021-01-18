import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  flexibleGetUser: ['data'],
  flexibleGetUserSuccess: ['data'],
  flexibleGetUserFailure: ['error', 'status']
})

export const FlexibleGetUserTypes = Types
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
  return { ...state, processing: false, error}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLEXIBLE_GET_USER]: request,
  [Types.FLEXIBLE_GET_USER_SUCCESS]: success,
  [Types.FLEXIBLE_GET_USER_FAILURE]: failure
})
