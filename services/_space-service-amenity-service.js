/**
 * @author HanhTD
 * DedicatedDeskBookingService
 */

import api from '../api'

export default class SpaceServiceAmenityService {
  getSpaceServiceAmenity() {
    return api.get(`/space-service-amenity/v3/`)
  }

  editSpaceServiceAmenity(data) {
    return api.patch(`/space-service-amenity/v3/`, data)
  }

  getAvailableAmenity(data) {
    return api.get(`/space-service-amenity/v3/available-amenities/?${data.lang}&service_type=${data.space_service_type}`)
  }
}
