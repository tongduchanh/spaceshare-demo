/**
 * @author HanhTD
 * Common Services
 */

import api from '../api'

export default class CommonService {
  getBannerList(data) {
    return api.get(`/common/v3/banners/?lang=${data.lang}`)
  }

  listService() {
    return api.get(`/coworking-space-info/v2/service/`)
  }

  suggestionRequest(data) {
    return api.get(`/search/v4/suggestion/?service_type=${data.service_type }&query=${data.query}`)
  }

  questionCategory() {
    return api.get(`/common/v3/question-category/`)
  }

  questionList(data) {
    let search = new URLSearchParams(data)
    return api.get(`/common/v3/question/?${search.toString()}`)
  }

  questionDetail(data) {
    return api.get(`/common/v3/question/${data.id}/?lang=${data.lang}`)
  }

  getProvince() {
    return api.get(`/profile-manager/v3/user-profile/get-provinces/`)
  }

  getDistrict(data) {
    return api.get(`/profile-manager/v3/user-profile/get-districts/?province_id=${data.province_id}`)
  }
}
