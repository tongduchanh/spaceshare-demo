/**
 * @author HanhTD
 */

import api from '../api'

export default class PlanService {
  getPlanList(data) {
    return api.get(`/flexible-desk-plan/v3/?plan_type=${data.plan_type}&lang=${data.lang}`)
  }

  getPlanDetail(data) {
    return api.get(`/flexible-desk-plan/v3/${data.id}/?lang=${data.lang}`)
  }

  getPlanType(data) {
    return api.get(`/coworking-space-plan/v2/get-plans-by-type/?type=${data.type}`)
  }
}
