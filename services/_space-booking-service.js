/**
 * @author HanhTD
 * Space booking service
 */

import api from '../api'

export default class SpaceBookingService {
  getSpaceBookingList(data, cookies) {
    return api.get(`/space-booking/v1/space-booking/?limit=${data.limit}&offset=${data.offset}`, cookies)
  }

  getSpaceBookingDetail(data, cookies) {
    return api.get(`/space-booking/v1/space-booking/${data.id}/`, cookies)
  }
}
