import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  failure: ['error', 'status'],
  error: ['dataError', 'status']
})

export const ErrorsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  error: null,
  status: null,
  dataError: null
}

/* ------------- Reducers ------------- */
export const raise = (state, { error, status }) => {
  return { ...state, error, status }
}

export const error = (state, { dataError, status }) => {
  return { ...state, dataError, status }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FAILURE]: raise,
  [Types.ERROR]: error
})
