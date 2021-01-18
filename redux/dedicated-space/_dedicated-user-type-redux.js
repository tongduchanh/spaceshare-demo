import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedUserType: ['data'],
  dedicatedUserTypeSuccess: ['data'],
  dedicatedUserTypeFailure: ['error', 'status'],
})

export const DedicatedUserTypeTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, dataError: null }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const error = (state, { dataError }) => {
  return { ...state, processing: false, dataError, data: null}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEDICATED_USER_TYPE]: request,
    [Types.DEDICATED_USER_TYPE_SUCCESS]: success,
    [Types.DEDICATED_USER_TYPE_FAILURE]: failure,
})
