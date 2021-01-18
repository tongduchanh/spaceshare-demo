/**
 * @author HanhTD
 * Space service
 */

import api from '../api'

export default class SpaceService {
  groupedList() {
    return api.get(`/space-manager/v1/space/grouped-list/`)
  }

  getSpaceList(data) {
    let search = new URLSearchParams(data)
    return api.get(`/space-manager/v1/space/?${search.toString()}`)
  }

  getSpaceDetail(data, cookies) {
    return api.get(`/space-manager/v1/space/${data.id}/`, cookies)
  }

  getSpaceByType() {
    return api.get(`/space-manager/v1/activity-type/get-space/`)
  }

  activityTypeList() {
    return api.get(`/space-manager/v1/activity-type/`)
  }

  postSpaceRequest(data) {
    return api.post(`/space-manager/v1/order-request/`, data)
  }

  getSpaceRequestList(data, cookies) {
    return api.get(`/space-manager/v1/order-request/`, cookies)
  }

  postReviewGallery(data) {
    return api.post(`/space-service-review-gallery/v3/`, data)
  }
}
