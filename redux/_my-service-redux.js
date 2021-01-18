import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  checkSubscription:['data'],
  checkSubscriptionSuccess:['data'],

  confirmSubscription:['data'],
  confirmSubscriptionSuccess:['data'],

  setPopupCheckSubs: ['data'],

  myServiceFailure: ['error', 'status'],

})

export const MyServiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  checkSubscriptionState: {},
  confirmSubscriptionState: {},
  openPopupCheckSubs: false
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

export const checkSubscriptionSuccess = (state, { data }) => {
  return { ...state, processing: false, checkSubscriptionState: data }
}

export const confirmSubscriptionSuccess = (state, { data }) => {
  return { ...state, processing: false, confirmSubscriptionState: data }
}

export const setPopupCheckSubs = (state, { data }) => {
  return { ...state, processing: false, openPopupCheckSubs: data }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECK_SUBSCRIPTION]: request,
  [Types.CHECK_SUBSCRIPTION_SUCCESS]: checkSubscriptionSuccess,
  [Types.CONFIRM_SUBSCRIPTION]: request,
  [Types.CONFIRM_SUBSCRIPTION_SUCCESS]: confirmSubscriptionSuccess,
  [Types.SET_POPUP_CHECK_SUBS]: setPopupCheckSubs,
  [Types.MY_SERVICE_FAILURE]: failure,
})
