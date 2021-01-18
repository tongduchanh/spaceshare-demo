/**
 * @author HanhTD
 */

import api from '../api'

export default class BookingService {
  list(data, cookies) {
    return api.get(`/coworking-space-booking/v1/get-self-booking-list/?limit=${data.limit}&offset=${data.offset}&status=${data.status}`, cookies)
  }

  listAll(data, cookies) {
    return api.get(`/coworking-space-booking/v1/get-self-booking-list/?&status=${data.status}`, cookies)
  }

  add(data) {
    return api.post(`/coworking-space-booking/v1/`, data)
  }

  edit(data) {
    return api.patch(`/coworking-space-booking/v2/${data.id}/`, data)
  }

  remove(id) {
    return api.patch(`/coworking-space-booking/v1/${id}/cancel-booking/`)
  }

  multiAdd(data) {
    return api.post(`/coworking-space-booking/v2/`, data)
  }
}
