import api from '../api'
export default class NotificationService {
  getNotificationList(data) {
    const search = new URLSearchParams(data)
    return api.get(
      `/notification-manager/v1/notification/?${search.toString()}`,
    )
  }

  getUnreadNotificationCount() {
    return api.get(
      `/notification-manager/v1/notification/total-new-message/`,
    )
  }

  markAllNotificationAsRead() {
    return api.post(
      `/notification-manager/v1/notification/mark-seen-all/`,
    )
  }

  markNotificationAsRead(id) {
    return api.patch(
      `/notification-manager/v1/notification/${id}/`,
      {status: 1}
    )
  }

  registerPushNotification(data) {
    return api.post(
      `/notification-manager/v1/auth/devices/`,
      data
    )
  }
}
