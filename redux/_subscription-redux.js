/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  subscriptionList: ['data'],
  subscriptionListUsing: ['data'],
  subscriptionListUsed: ['data'],
  subscriptionRequest: ['data'],
  subscriptionActive: ['data'],
  subscriptionSuccess: ['data'],
  subscriptionFailure: ['error']
})

export const SubscriptionTypes = Types
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
  return { ...state, processing: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBSCRIPTION_LIST]: request,
  [Types.SUBSCRIPTION_LIST_USING]: request,
  [Types.SUBSCRIPTION_LIST_USED]: request,
  [Types.SUBSCRIPTION_REQUEST]: request,
  [Types.SUBSCRIPTION_ACTIVE]: request,
  [Types.SUBSCRIPTION_SUCCESS]: success,
  [Types.SUBSCRIPTION_FAILURE]: failure
})
