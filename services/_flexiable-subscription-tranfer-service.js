import api from '../api'

export default class FlexibleSubscriptionTransferService {
    postTransferToFriends(data) {
        const receiver = { 'receiver': data.receiverId }
        return api.post(`/flexible-desk-subscription/v3/${data.packageId}/transfer/`, receiver)
    }
}
