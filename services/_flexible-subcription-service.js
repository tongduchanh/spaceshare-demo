import api from '../api'

export default class FlexibleSubscriptionService {
  getSubscriptionList(data, cookies) {
    if (data.status == 'All') {
      delete data.status
    }
    const search = new URLSearchParams(data)
    return api.get(
      `/flexible-desk-subscription/v3/?${search.toString()}`,
      cookies,
    )
  }

  getSubscriptionBooking() {
    return api.get('/flexible-desk-subscription/v3/to-booking/')
  }
}
