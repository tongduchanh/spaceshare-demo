/**
 * @author HanhTD
 */

import api from '../api'

export default class LocationsService {
  getDistrictList(data) {
    return api.get(`/space-service/v3/available-districts/?lang=${data.lang}&service_type=${data.space_service_type_id}${data.province ? `&province=${data.province}` : ''}`)
  }
  getAvailableProvinces(data) {
    return api.get(`/space-service/v3/available-provinces/?service_type=${data.service_type}`)
  }
  getAvailableDistricts(data) {
    return api.get(`/space-service/v3/available-districts/?service_type=${data.service_type}${data.province ? `&province=${data.province}` : ''}`)
  }
}
