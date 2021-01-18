/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  changePassRequest: ['data'],
  sendVerifyEmail: [],
  verifyEmail: ['data'],
  verifyPhoneNumber: ['data'],
  securitySuccess: ['data'],
  securityFailure: ['error'],
})

export const SecurityTypes = Types
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

export const failure = state => {
  return { ...state, processing: false}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_PASS_REQUEST]: request,
  [Types.SEND_VERIFY_EMAIL]: request,
  [Types.VERIFY_EMAIL]: request,
  [Types.VERIFY_PHONE_NUMBER]: request,
  [Types.SECURITY_SUCCESS]: success,
  [Types.SECURITY_FAILURE]: failure
})
