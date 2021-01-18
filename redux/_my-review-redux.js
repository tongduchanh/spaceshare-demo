import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getMyReview: ['data'],
  clearMyReview: [],
  updateReview: ['data'],
  postReviewRequest: ['data'],
  myReviewSuccess: ['data'],
  myReviewFailure: ['error', 'status']
})

export const MyReviewTypes = Types
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

export const clearMyReview = (state) => {
  return { ...state, data: {} }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_MY_REVIEW]: request,
    [Types.UPDATE_REVIEW]: request,
    [Types.POST_REVIEW_REQUEST]: request,
    [Types.MY_REVIEW_SUCCESS]: success,
    [Types.MY_REVIEW_FAILURE]: failure,
    [Types.CLEAR_MY_REVIEW]: clearMyReview,
})
