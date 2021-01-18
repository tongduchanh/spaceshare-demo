/**
 * @author HanhTD
 */

import api from '../api'

export default class AvailabilityService {
    flexibleDeskAvailabilityList(data) {
        const search = new URLSearchParams(data)
        return api.get(`/flexible-desk-availability/v3/?${search.toString()}`)
    }
    flexibleAvailabilityBySpace(data) {
        const params = new URLSearchParams(data.params)
        return api.get(`/flexible-desk-availability/v3/${data.id}/?${params.toString()}`)
    }
}
