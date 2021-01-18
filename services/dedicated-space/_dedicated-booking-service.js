/**
 * @author HanhTD
 * Dedicated Booking Detail Service
 */

import api from '../../api'

export default class DedicatedBookingService {
  dedicatedBookingDetail(data, cookies) {
    return api.get(`/dedicated-space-booking/v3/${data.id}/`, cookies)
  }

  createCheckoutLink(data) {
    return api.post(`/dedicated-space-booking/v3/create-check-out-link/`, data)
  }
}
