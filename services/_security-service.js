/**
 * @author NamNH
 */

import api from '../api'

export default class SecurityService {
    changePass(data) {
        return api.post(`/authentication/v1/change-password/`, data)
    }

    sendVerifyEmail() {
        return api.post(`/profile-manager/v1/resend-verify-link/`)
    }

    verifyEmail(data) {
        return api.post(`/profile-manager/v2/email-verify/`, data)
    }

    verifyPhoneNumber(data) {
        return api.post(`/profile-manager/v1/verify-phone-number/`, data)
    }
}
