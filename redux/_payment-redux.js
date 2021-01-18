/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  initPayment: ['data'],
  initPaymentSpace: ['data'],
  initPaymentDedicatedDesk: ['data'],
  checkPromotionCode: ['data'],
  validateTransaction: ['data'],
  paymentSuccess: ['data'],
  paymentFailure: ['error']
})

export const PaymentTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.INIT_PAYMENT]: request,
  [Types.INIT_PAYMENT_SPACE]: request,
  [Types.INIT_PAYMENT_DEDICATED_DESK]: request,
  [Types.CHECK_PROMOTION_CODE]: request,
  [Types.VALIDATE_TRANSACTION]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure
})
