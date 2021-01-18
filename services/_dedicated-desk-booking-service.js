/**
 * @author HanhTD
 * DedicatedDeskBookingService
 */

import api from '../api'

export default class DedicatedDeskBookingService {
  dedicatedDeskBookingList(data, cookies) {
    return api.get(`/dedicated-desk-booking/v1/dedicated-desk-booking/?limit=${data.limit}&offset=${data.offset}`, cookies)
  }

  dedicatedDeskBookingDetail(data, cookies) {
    return api.get(`/dedicated-desk-booking/v1/dedicated-desk-booking/${data.id}/`, cookies)
  }
}
