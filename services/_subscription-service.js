/**
 * @author NamNH
 */
import api from '../api'

export default class SecurityService {
    list(data) {
        let search = new URLSearchParams(data)
        return api.get(`/coworking-space-subscription/v1/?${search.toString()}`)
    }

    list2(data) {
        let search = new URLSearchParams(data)
        return api.get(`/coworking-space-subscription/v1/?${search.toString()}`)
    }

    activatedList() {
        return api.get(`/coworking-space-subscription/v1/list_active/?limit=100&offset=0`)
    }

    request(data) {
        return api.post(`/coworking-space-subscription/v1/`, data)
    }

    active(data) {
        return api.patch(`/coworking-space-subscription/v1/${data.id}/active/`, data)
    }
}
