/**
 * @author HanhTD
 */
import api from '../api'
export default class HotDeskService {
  getHotDeskList(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/hot-desk/v3/?${search.toString()}`, cookies)
  }

  getHotDeskDetail(data, cookies) {
    return api.get(`/hot-desk/v3/${data.id}/?${data.lang ? `lang=${data.lang}` : ``}${data.preview ? `&preview=${data.preview}` : ''}`, cookies)
  }

  getHotDeskRelated(data, cookies) {
    return api.get(`/hot-desk/v3/${data.id}/related-dedicated/?${data.lang ? `lang=${data.lang}` : ``}`, cookies)
  }
  postContact(data) {
    return api.post(`/space-service-contact/v3/`, data)
  }
}
