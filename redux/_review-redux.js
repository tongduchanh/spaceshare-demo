import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getReviewCollection: ['data'],
  clearReviewList: ['data'],
  postReviewGallery: ['data'],
  postReviewGallerySuccess: ['data'],
  reviewSuccess: ['data'],
  reviewFailure: ['error', 'status'],
})

export const ReviewTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  reviewGallery: {},
}

/* ------------- Reducers ------------- */
export const request = (state) => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const postReviewGallerySuccess = (state, { data }) => {
  return { ...state, reviewGallery: data, processing: false }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const clearReviewList = (state) => {
  return { ...state, data: {} }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REVIEW_COLLECTION]: request,
  [Types.REVIEW_SUCCESS]: success,
  [Types.REVIEW_FAILURE]: failure,
  [Types.POST_REVIEW_GALLERY]: request,
  [Types.POST_REVIEW_GALLERY_SUCCESS]: postReviewGallerySuccess,
  [Types.REVIEW_FAILURE]: failure,
  [Types.CLEAR_REVIEW_LIST]: clearReviewList,
})
