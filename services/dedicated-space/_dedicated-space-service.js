/**
 * @author HanhTD
 * Order service
 */

import api from '../../api'

export default class DedicatedDeskService {
  dedicatedSpaceList(data, cookies) {
    let search = new URLSearchParams(data)
    return api.get(`/dedicated-space/v3/?${search.toString()}`, cookies)
  }

  dedicatedSpaceDetail(data, cookies) {
    return api.get(`/dedicated-space/v3/${data.id}/?lang=${data.lang}&${data.preview && `preview=${data.preview}`}`, cookies)
  }

  monthAvailability(data) {
    return api.get(`/dedicated-space-availability/v3/${data.id}/month/?month=${data.month}&year=${data.year}`)
  }

  dedicatedSpaceBookingCalculate(data) {
    return api.post(`/dedicated-space-booking-calculate-pricing/v3/`, data)
  }

  addDedicatedSpaceBooking(data) {
    return api.post(`/dedicated-space-booking/v3/`, data)
  }

  hourAvailability(data) {
    return api.get(`/dedicated-space-availability/v3/${data.id}/hours/?checking_type=${data.checking_type}&date=${data.date}&start_time=${data.start_time}&rate_type=${data.rate_type}`)
  }

  bookingList(data, cookies) {
    const search = new URLSearchParams(data)
    return api.get(`/dedicated-space-booking/v3/?${search.toString()}`, cookies)
  }

  dedicatedUserType(data) {
    return api.get(`/dedicated-use-type/v3/?lang=${data.lang}`)
  }

  dedicatedSpaceRelated(data) {
    return api.get(`/dedicated-space/v3/${data.id}/related-dedicated/`)
  }
}
