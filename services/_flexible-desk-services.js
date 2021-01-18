/**
 * @author HanhTD
 */
import api from '../api'
export default class CoworkingService {
  postReviewRequest(data) {
    return api.post(`/coworking-space-review/v1/`, data)
  }

  getMyReview(data, cookies) {
    return api.get(`/coworking-space-review/v1/my_review/?coworking_space=${data.coworking_space_id}`, cookies)
  }

  updateReview(data) {
    return api.patch(`/coworking-space-review/v1/${data.id}/`, data)
  }

  getFlexibleDeskList(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/flexible-desk/v4/?${search.toString()}`, cookies)
  }

  getFlexibleDeskDetail(data, cookies) {
    return api.get(`/flexible-desk/v4/${data.id}/?${data.lang ? `lang=${data.lang}` : ``}${data.preview ? `&preview=${data.preview}` : ''}`, cookies)
  }

  getReviewCollection(data) {
    return api.get(`/space-service-review/v3/?limit=${data.limit}&offset=${data.offset}&space_service_meta_id=${data.coworking_space}&lang=${data.lang}`)
  }

  getMyReviewv3(data) {
    return api.get(`/space-service-review/v3/my-review/?space_service_meta_id=${data.coworking_space_id}&lang=vi`)
  }

  postReviewRequestv3(data) {
    return api.post(`/space-service-review/v3/review/?space_service_meta_id=${data.space_service_meta_id}`, data.data)
  }

  getFlexibleDeskRelated(data, cookies) {
    return api.get(`/flexible-desk/v4/${data.id}/related-desk/`, cookies)
  }

  getSpacePolicy(data) {
    return api.get(`/space-service/v3/${data.space_meta_id}/policy/`)
  }
}
