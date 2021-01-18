import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    postFlexibleSubscriptionTransferRequest:  ['data'],
    flexibleSubscriptionTransferSuccess: ['data'],
    flexibleSubscriptionTransferFailure: ['error', 'status']
})

export const FlexibleSubscriptionTransferTypes = Types
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
  [Types.POST_FLEXIBLE_SUBSCRIPTION_TRANSFER_REQUEST]: request,
  [Types.FLEXIBLE_SUBSCRIPTION_TRANSFER_SUCCESS]: success,
  [Types.FLEXIBLE_SUBSCRIPTION_TRANSFER_FAILURE]: failure
})
