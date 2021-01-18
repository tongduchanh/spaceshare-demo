import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    flexibleActiveState:  ['data'],
    flexibleActiveStateSuccess: ['data'],
    flexibleActiveStateFailure: ['error', 'status']
})

export const FlexibleActiveStateTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLEXIBLE_ACTIVE_STATE]: request,
  [Types.FLEXIBLE_ACTIVE_STATE_SUCCESS]: success,
  [Types.FLEXIBLE_ACTIVE_STATE_FAILURE]: failure
})
