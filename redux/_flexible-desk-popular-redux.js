import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getFlexibleDeskPopular: ['data', 'cookies'],
  flexibleDeskPopularSuccess: ['data'],
  flexibleDeskPopularFailure: ['error', 'status']
})

export const FlexibleDeskPopularTypes = Types
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
    [Types.GET_FLEXIBLE_DESK_POPULAR]: request,
    [Types.FLEXIBLE_DESK_POPULAR_SUCCESS]: success,
    [Types.FLEXIBLE_DESK_POPULAR_FAILURE]: failure
})
