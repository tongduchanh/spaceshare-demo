/**
 * @author HanhTD
 * Order service
 */

import api from '../api'

export default class DedicatedDeskService {
  dedicatedDeskList(data) {
    let search = new URLSearchParams(data)
    return api.get(`/dedicated-desk-manager/v1/dedicated-desk/?${search.toString()}`)
  }

  dedicatedDeskDetail(data, cookies) {
    return api.get(`/dedicated-desk-manager/v1/dedicated-desk/${data.id}/`, cookies)
  }

  dedicatedDeskRequest(data) {
    return api.post(`/dedicated-desk-manager/v1/dedicated-desk-request/`, data)
  }

  postDedicatedDeskRequest(data) {
    return api.post(`/dedicated-desk-manager/v1/dedicated-desk-request/`, data)
  }

  getDedicatedDeskRequestList(data, cookies) {
    return api.get(`/dedicated-desk-manager/v1/dedicated-desk-request/`, cookies )
  }

  dedicatedDeskTypeList() {
    return api.get(`/dedicated-desk-manager/v1/dedicated-desk-type/`)
  }

  dedicatedDeskGroupList() {
    return api.get(`/dedicated-desk-manager/v1/dedicated-desk-type/get-dedicated-desk/`)
  }
}
