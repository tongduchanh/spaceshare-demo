/**
 * @author HanhTD
 */
import api from '../api'
export default class OfficeSpaceService {
  getOfficeSpaceList(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/office-space-service/v3/?${search.toString()}`, cookies)
  }

  getOfficeSpaceDetail(data, cookies) {
    return api.get(`/office-space-service/v3/${data.id}/?${data.lang ? `lang=${data.lang}` : ``}${data.preview ? `&preview=${data.preview}` : ''}`, cookies)
  }

  getOfficeSpaceRelated(data, cookies) {
    return api.get(`/office-space-service/v3/${data.id}/related-dedicated/?${data.lang ? `lang=${data.lang}` : ``}`, cookies)
  }
  postContact(data) {
    return api.post(`/space-service-contact/v3/`, data)
  }
}
