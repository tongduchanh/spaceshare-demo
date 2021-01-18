/**
 * @author HanhTD
 */

import api from '../api'

export default class PaymentService {
  initPayment(data) {
    return api.post(`/flexible-desk-subscription/v3/`, data)
  }

  initPaymentSpace(data) {
    return api.post(`/space-booking/v1/space-booking/${data.id}/init-payment/`, data)
  }

  initPaymentDedicatedDesk(data) {
    return api.post(`/dedicated-desk-booking/v1/dedicated-desk-booking/${data.id}/init-payment/`, data)
  }

  checkPromotionCode(data) {
    return api.post(`/flexible-desk-subscription/v3/check-promotion/`, data)
  }

  listChannel() {
    return api.get(`/payment/v3/channels/`)
  }

  validateTransaction(data) {
    return api.get(`/payment/v3/vnpay/validate-transaction/?${data.query_data}`)
  }

  buyPoint(data) {
    return api.post(`/flexible-desk-buy-point/v4/`, data)
  }

  checkPointPromotion(data) {
    return api.post(`/flexible-desk-buy-point/v4/check-promotion/`, data)
  }

  checkSubscription(data) {
    return api.get(`/flexible-desk-buy-point/v4/check-subscription/?subscription_id=${data.subscription_id}`)
  }

  confirmSubscription(data) {
    return api.post(`/flexible-desk-buy-point/v4/confirm-subscription/`, data)
  }
}
