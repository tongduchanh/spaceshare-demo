import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedSpaceRelated: ['data', 'cookies'],
  dedicatedSpaceRelatedSuccess: ['data'],
  dedicatedSpaceRelatedFailure: ['error', 'status']
})

export const DedicatedSpaceRelatedTypes = Types
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
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEDICATED_SPACE_RELATED]: request,
    [Types.DEDICATED_SPACE_RELATED_SUCCESS]: success,
    [Types.DEDICATED_SPACE_RELATED_FAILURE]: failure
})
