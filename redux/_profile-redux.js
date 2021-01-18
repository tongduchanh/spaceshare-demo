import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  profileRequest: ['cookies'],
  editProfileRequest: ['data'],
  updatePhoneNumber: ['data'],
  editEmail: ['data'],
  logoutRequest: [],
  profileSuccess: ['data'],
  profileFailure: ['error', 'status'],

  getReward: ['data'],
  getRewardSuccess: ['data'],

  checkPhoneNumber: ['data'],
  checkPhoneNumberSuccess: ['data'],

  postInputCode: ['data'],
  postInputCodeSuccess:['data'],

  getReferralCode:['data'],
  getReferralCodeSuccess:['data'],

  postReferralCode:['data'],
  postReferralCodeSuccess:['data'],
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  checkPhoneNumberData: {},
  reward: {},
  inputCode: {},
  referralCode: {},
  enterReferralCode: {}
}

/* ------------- Reducers ------------- */
export const staticRequest = state => {
  return { ...state }
}

export const logoutRequest = state => {
  return { ...state, data: {} }
}

export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const checkPhoneNumberSuccess = (state, { data }) => {
  return { ...state, processing: false, checkPhoneNumberData: data }
}

export const getRewardSuccess = (state, { data }) => {
  return { ...state, processing: false, reward: data, error: null }
}

export const postInputCodeSuccess = (state, { data }) => {
  return { ...state, processing: false, inputCode: data }
}

export const getReferralCodeSuccess = (state, { data }) => {
  return { ...state, processing: false, referralCode: data }
}
export const postReferralCodeSuccess = (state, { data }) => {
  return { ...state, processing: false, enterReferralCode: data }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: staticRequest,
  [Types.EDIT_PROFILE_REQUEST]: request,
  [Types.UPDATE_PHONE_NUMBER]: request,
  [Types.EDIT_EMAIL]: request,
  [Types.LOGOUT_REQUEST]: request,
  [Types.EDIT_EMAIL]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.CHECK_PHONE_NUMBER]: request,
  [Types.CHECK_PHONE_NUMBER_SUCCESS]: checkPhoneNumberSuccess,
  [Types.GET_REWARD]: request,
  [Types.GET_REWARD_SUCCESS]: getRewardSuccess,
  [Types.POST_INPUT_CODE]: request,
  [Types.POST_INPUT_CODE_SUCCESS]: postInputCodeSuccess,

  [Types.GET_REFERRAL_CODE]: request,
  [Types.GET_REFERRAL_CODE_SUCCESS]: getReferralCodeSuccess,

  [Types.POST_REFERRAL_CODE]: request,
  [Types.POST_REFERRAL_CODE_SUCCESS]: postReferralCodeSuccess,

})
