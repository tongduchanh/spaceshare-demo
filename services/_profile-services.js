/**
 * @author HanhTD
 */

import api from '../api'

export default class ProfileService {
  getProfile(cookies) {
    return api.get(`/profile-manager/v3/user-profile/get-profile/`, cookies)
  }

  editProfile(data) {
    return api.patch(`/profile-manager/v3/user-profile/update-profile/`, data)
  }

  updatePhoneNumber(data) {
    return api.patch(`/profile-manager/v3/user-profile/update-phone-number/`, data)
  }

  logout() {
    return api.post(`/authentication/v2/logout/`)
  }

  checkPhoneNumber(data) {
    return api.get(`/profile-manager/v1/check-phone-number/?phone_number=${data.phone_number}&national_code=${data.national_code}`)
  }

  getReward(data) {
    return api.get(`/space-share-point/v1/?limit=${data.limit}&offset=${data.offset}`)
  }

  postInputCode(data) {
    return api.post(`/space-share-point/v1/input-code/`, data)
  }

  postReferralCode(data) {
    return api.post('/profile-manager/v3/user-profile/enter-referral-code/', data)
  }

  getReferralCode() {
    return api.get('/profile-manager/v3/user-profile/get-referral-code/')
  }
}
