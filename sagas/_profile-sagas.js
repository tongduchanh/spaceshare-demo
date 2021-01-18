/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { profileService } from '../services'
import ProfileActions from '../redux/_profile-redux'
import { HttpStatus } from '../constants'

const ProfileSagas = {
  *getProfile({ cookies }) {
    let response = yield call(profileService.getProfile, cookies)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getProfile = true
      yield put(ProfileActions.profileSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },

  *editProfile({ data }) {
    let response = yield call(profileService.editProfile, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.editProfile = true
      yield put(
        ProfileActions.profileSuccess(responsedata, responsedata.status),
      )
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },

  *editEmail({ data }) {
    let response = yield call(profileService.editProfile, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.editEmail = true
      yield put(ProfileActions.profileSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },

  *logout() {
    let response = yield call(profileService.logout)
    let responsedata = null
    try {
      responsedata = yield response.json()
    } catch {
      responsedata = {}
    }
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.logout = true
      window.location.href = '/'
      yield put(ProfileActions.profileSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },

  *updatePhoneNumber({ data }) {
    let response = yield call(profileService.updatePhoneNumber, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.updatePhoneNumber = true
      yield put(ProfileActions.profileSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },

  *checkPhoneNumber({ data }) {
    let response = yield call(profileService.checkPhoneNumber, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.checkPhoneNumber = true
      yield put(ProfileActions.checkPhoneNumberSuccess(responsedata))
    } else {
      responsedata.checkPhoneNumber = true
      yield put(ProfileActions.checkPhoneNumberSuccess(responsedata))
    }
  },
  *getReward({ data }) {
    let response = yield call(profileService.getReward, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getReward = true
      yield put(ProfileActions.getRewardSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },
  *postInputCode({ data }) {
    let response = yield call(profileService.postInputCode, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postInputCode = true
      yield put(ProfileActions.postInputCodeSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },
  *getReferralCode({ data }) {
    let response = yield call(profileService.getReferralCode, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getReferralCode = true
      yield put(ProfileActions.getReferralCodeSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },
  *postReferralCode({ data }) {
    let response = yield call(profileService.postReferralCode, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.postReferralCode = true
      yield put(ProfileActions.postReferralCodeSuccess(responsedata))
    } else {
      yield put(ProfileActions.profileFailure(responsedata, response.status))
    }
  },
}

export default ProfileSagas
