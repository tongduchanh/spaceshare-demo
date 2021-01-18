/**
 * @author NamNH
 * Booking coworking -- for coworking list on booking modal
 */

import api from '../api'

export default class BookingCsService {
  // eslint-disable-next-line no-unused-vars
  list(data) {
    return api.get(`/coworking-space/v2/`)
  }
}
