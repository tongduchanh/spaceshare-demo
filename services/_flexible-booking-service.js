/**
 * @author HanhTD
 */

import api from '../api'

export default class FlexibleBookingService {
  getFlexibleBookingList(data, cookies, type_api) {
    const search = new URLSearchParams(data)
    return api.get(`/flexible-desk-booking/v4/?${search.toString()}`, cookies, type_api)
  }

  postFlexibleBooking(data) {
    return api.post(`/flexible-desk-booking/v4/?lang=${data.lang}`, data)
  }

  checkBooking(data) {
    const search = new URLSearchParams(data)
    return api.get(`/flexible-desk-booking/v4/check-booking/?${search.toString()}`)
  }

  bookingWithPoint(data) {
    return api.post(`/flexible-desk-booking/v4/booking-with-point/`, data)
  }
}
