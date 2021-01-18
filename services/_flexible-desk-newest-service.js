/**
 * @author Hiepdt
 */
import api from '../api'
export default class FlexibleDeskNewest {
  getFlexibleDeskNewest(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/flexible-desk/v4/?${search.toString()}`, cookies)
  }
}
