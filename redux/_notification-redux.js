import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getNotificationList: ['data'],
  getNotificationListSuccess: ['data'],
  getNotificationListFailure: ['error'],

  getUnreadNotificationCount: [],
  getUnreadNotificationCountSuccess: ['data'],
  getUnreadNotificationCountFailure: ['error'],

  markAllNotificationAsRead: [],
  markAllNotificationAsReadSuccess: ['data'],
  markAllNotificationAsReadFailure: ['error'],

  markNotificationAsRead: ['data'],
  markNotificationAsReadSuccess: ['data'],
  markNotificationAsReadFailure: ['error'],

  registerPushNotification: ['data'],
  registerPushNotificationSuccess: ['data'],
  registerPushNotificationFailure: ['error'],
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  getListProcessing: false,
  markAsReadProcessing: false,
  markAllAsReadProcessing: false,
  getUnreadProcessing: false,
  registerPushNotificationProcessing: false,
  data: {},
  countData: {},
  error: null,
}

/* ------------- Reducers ------------- */
export const getNotificationListRequest = (state) => {
  return { ...state, getListProcessing: true, markAsReadProcessing: false, markAllAsReadProcessing: false }
}

export const getNotificationListSuccess = (state, { data }) => {
  return { ...state, getListProcessing: false, data, error: null }
}

export const getNotificationListFailure = (state, { error }) => {
  return { ...state, getListProcessing: false, error }
}

// Get Unread notification count
export const getUnreadNotificationCountRequest = (state) => {
  return { ...state, getUnreadProcessing: true }
}

export const getUnreadNotificationCountSuccess = (state, { data }) => {
  return { ...state, getListProcessing: false, countData: data, error: null }
}

export const getUnreadNotificationCountFailure = (state, { error }) => {
  return { ...state, getListProcessing: false, error }
}

// Mark all notification as read
export const markAllNotificationAsReadRequest = (state) => {
  return { ...state, getListProcessing: false, markAllAsReadProcessing: true, markAsReadProcessing: false }
}

export const markAllNotificationAsReadSuccess = (state) => {
  return { ...state, markAllAsReadProcessing: false, error: null }
}

export const markAllNotificationAsReadFailure = (state, { error }) => {
  return { ...state, markAllAsReadProcessing: false, error }
}

// Mark notification as read
export const markNotificationAsReadRequest = (state) => {
  return { ...state, getListProcessing: false, markAllAsReadProcessing: false, markAsReadProcessing: true }
}

export const markNotificationAsReadSuccess = (state) => {
  return { ...state, markAsReadProcessing: false, error: null }
}

export const markNotificationAsReadFailure = (state, { error }) => {
  return { ...state, markAsReadProcessing: false, error }
}

// Register push notification
export const registerPushNotificationRequest = (state) => {
  return { ...state, registerPushNotificationProcessing: true }
}

export const registerPushNotificationSuccess = (state) => {
  return { ...state, registerPushNotificationProcessing: false, error: null }
}

export const registerPushNotificationFailure = (state, { error }) => {
  return { ...state, registerPushNotificationProcessing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATION_LIST]: getNotificationListRequest,
  [Types.GET_NOTIFICATION_LIST_SUCCESS]: getNotificationListSuccess,
  [Types.GET_NOTIFICATION_LIST_FAILURE]: getNotificationListFailure,

  [Types.GET_UNREAD_NOTIFICATION_COUNT]: getUnreadNotificationCountRequest,
  [Types.GET_UNREAD_NOTIFICATION_COUNT_SUCCESS]: getUnreadNotificationCountSuccess,
  [Types.GET_UNREAD_NOTIFICATION_COUNT_FAILURE]: getUnreadNotificationCountFailure,

  [Types.MARK_ALL_NOTIFICATION_AS_READ]: markAllNotificationAsReadRequest,
  [Types.MARK_ALL_NOTIFICATION_AS_READ_SUCCESS]: markAllNotificationAsReadSuccess,
  [Types.MARK_ALL_NOTIFICATION_AS_READ_FAILURE]: markAllNotificationAsReadFailure,

  [Types.MARK_NOTIFICATION_AS_READ]: markNotificationAsReadRequest,
  [Types.MARK_NOTIFICATION_AS_READ_SUCCESS]: markNotificationAsReadSuccess,
  [Types.MARK_NOTIFICATION_AS_READ_FAILURE]: markNotificationAsReadFailure,

  [Types.REGISTER_PUSH_NOTIFICATION]: registerPushNotificationRequest,
  [Types.REGISTER_PUSH_NOTIFICATION_SUCCESS]: registerPushNotificationSuccess,
  [Types.REGISTER_PUSH_NOTIFICATION_FAILURE]: registerPushNotificationFailure,
})
