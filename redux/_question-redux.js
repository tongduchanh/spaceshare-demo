/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  category: ['data'],
  questions: ['data'],
  question: ['data'],
  categorySuccess: ['data'],
  questionsSuccess: ['data'],
  questionSuccess: ['data'],
  questionFailure: ['error', 'status']
})

export const QuestionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  category: {},
  questions: {},
  question: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const categorySuccess = (state, { data }) => {
  return { ...state, processing: false, category: data }
}

export const questionsSuccess = (state, { data }) => {
  return { ...state, processing: false, questions: data }
}

export const questionSuccess = (state, { data }) => {
  return { ...state, processing: false, question: data }
}

export const failure = state => {
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY]: request,
  [Types.QUESTIONS]: request,
  [Types.QUESTION]: request,
  [Types.CATEGORY_SUCCESS]: categorySuccess,
  [Types.QUESTIONS_SUCCESS]: questionsSuccess,
  [Types.QUESTION_SUCCESS]: questionSuccess,
  [Types.QUESTION_FAILURE]: failure
})
