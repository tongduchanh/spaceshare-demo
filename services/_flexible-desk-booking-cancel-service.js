import api from '../api'

export default class FlexibleDeskBookingCancelService {
  flexibleDeskBookingCancel(data) {
    return api.delete(`/flexible-desk-booking/v3/${data}/`)
  }
}
