const { call, put } = require('redux-saga/effects')
const { HttpStatus } = require('../constants')
const { notificationService } = require('../services')
import NotificationActions from '../redux/_notification-redux'

const NotificationSagas = {
  *getNotificationList({ data }) {
    let response = yield call(notificationService.getNotificationList, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(NotificationActions.getNotificationListSuccess(responsedata))
    } else {
      yield put(NotificationActions.getNotificationListFailure(responsedata))
    }
  },

  *getUnreadNotificationCount() {
    let response = yield call(notificationService.getUnreadNotificationCount)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(NotificationActions.getUnreadNotificationCountSuccess(responsedata))
    } else {
      yield put(NotificationActions.getUnreadNotificationCountFailure(responsedata))
    } 
  },

  *markAllNotificationAsRead() {
    let response = yield call(notificationService.markAllNotificationAsRead)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(NotificationActions.markAllNotificationAsReadSuccess(responsedata))
    } else {
      yield put(NotificationActions.markAllNotificationAsReadFailure(responsedata))
    } 
  },

  *markNotificationAsRead({data}) {
    let response = yield call(notificationService.markNotificationAsRead, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(NotificationActions.markNotificationAsReadSuccess(responsedata))
    } else {
      yield put(NotificationActions.markNotificationAsReadFailure(responsedata))
    } 
  },

  *registerPushNotification({data}) {
    let response = yield call(notificationService.registerPushNotification, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      yield put(NotificationActions.registerPushNotificationSuccess(responsedata))
    } else {
      yield put(NotificationActions.registerPushNotificationFailure(responsedata))
    } 
  },
}

export default NotificationSagas
