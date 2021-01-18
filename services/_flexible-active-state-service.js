import api from '../api'

export default class FlexibleActiveStateService {
    flexiableActiveState(data) {
        const acitvateDate = { 'activated_date': data.activated_date }
        return api.post(`/flexible-desk-subscription/v3/${data.id}/activate/`, acitvateDate)
    }
}
