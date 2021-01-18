import api from '../api'

export default class AuthsService {
  socialAuthFb(data) {
    return api.post(`/authentication/v2/social-auth/login/jwt/${data.provider}/`, data)
  }

  socialAuthGoogle(data) {
    return api.post(`/authentication/v3/social-auth/login/jwt/google-oauth2/`, data)
  }

  register(data) {
    return api.post(`/authentication/v2/register/`, data)
  }

  login(data) {
    return api.post(`/authentication/v1/login/`, data)
  }

  forgotPassword(data) {
    return api.post(`/authentication/v1/reset-password/`, data)
  }

  resetPassword(data) {
    return api.post(`/authentication/v1/confirm-reset-password/`, data)
  }

  becomeHost(data) {
    return api.post(`/cooperation-request/v1/`, data)
  }

  refreshToken(data) {
    return api.post(`/authentication/v1/refresh-token/`, data)
  }
}
