/**
 * @author Hiepdt
 */
import api from '../api'
export default class FlexibleDeskPopular {
  getFlexibleDeskPopular(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/flexible-desk/v4/?${search.toString()}`, cookies)
  }
}
