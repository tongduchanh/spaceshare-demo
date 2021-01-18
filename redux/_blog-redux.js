/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getPostBySlug: ['slug', 'cookies', 'type_api'],
  getPostByCategory: ['data', 'cookies', 'type_api'],
  getPostList: ['data', 'cookies', 'type_api'],
  blogSuccess: ['data'],
  blogFailure: ['error']
})

export const BlogTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: [],
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
  [Types.GET_POST_BY_SLUG]: request,
  [Types.GET_POST_BY_CATEGORY]: request,
  [Types.GET_POST_LIST]: request,
  [Types.BLOG_SUCCESS]: success,
  [Types.BLOG_FAILURE]: failure
})
