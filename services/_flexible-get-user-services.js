import api from '../api'

export default class FlexibleGetUserService {
    getUserFlexiable(data) {
        const search = new URLSearchParams(data)
        return api.get(`/profile-manager/v3/get-user-info/?${search.toString()}`)
    }
}
