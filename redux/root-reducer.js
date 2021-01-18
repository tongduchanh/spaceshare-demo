/**
 * @author Nam NH
 * This file combines all reducers and create redux store
 */

import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

const rootReducer = combineReducers({
  modal,
  auths: require('./_auths-redux').reducer,
  errors: require('./_errors-redux').reducer,
  coworking: require('./_flexible-desk-redux').reducer,
  profile: require('./_profile-redux').reducer,
  common: require('./_common-redux').reducer,
  location: require('./_location-redux').reducer,
  favorite: require('./_coworking-favorite-redux').reducer,
  plan: require('./_plan-redux').reducer,
  subscription: require('./_subscription-redux').reducer,
  review: require('./_review-redux').reducer,
  myReview: require('./_my-review-redux').reducer,
  booking: require('./_booking-redux').reducer,
  activated: require('./_activated-redux').reducer,
  availability: require('./_availability-redux').reducer,
  bookingCs: require('./_booking-cs-redux').reducer,
  bookingTrigger: require('./_booking-trigger-redux').reducer,
  payment: require('./_payment-redux').reducer,
  paymentChannel: require('./_payment-channel-redux').reducer,
  blog: require('./_blog-redux').reducer,
  security: require('./_security-redux').reducer,
  space: require('./_space-redux').reducer,
  spaceType: require('./_space-type-redux').reducer,
  spaceBooking: require('./_space-booking-redux').reducer,
  spaceRequest: require('./_space-request-redux').reducer,

  dedicatedDesk: require('./_dedicated-desk-redux').reducer,
  dedicatedDeskBooking: require('./_dedicated-desk-booking-redux').reducer,
  dedicatedDeskRequest: require('./_dedicated-desk-request-redux').reducer,
  dedicatedDeskType: require('./_dedicated-desk-type-redux').reducer,
  dedicatedDeskGroup: require('./_dedicated-desk-group-redux').reducer,

  partner: require('./_partner-redux').reducer,
  activityType: require('./_activity-type-redux').reducer,
  banner: require('./_banner-redux').reducer,
  search: require('./_search-redux').reducer,

  flexibleSubscription:  require('./_flexible-subcription-redux').reducer,
  flexibleActiveState: require('./_flexible-active-state-redux').reducer,
  flexibleBooking: require('./_flexible-booking-redux').reducer,
  flexibleUser: require('./_flexible-get-user-redux').reducer,
  flexibleTransfer: require('./_flexiable-subcription-transfer-redux').reducer,
  spaceServiceAmenity: require('./_space-service-amenity-redux').reducer,
  flexibleDeskList: require('./_flexible-desk-list-redux').reducer,
  flexibleDeskNewest: require('./_flexible-desk-newest-redux').reducer,
  flexibleDeskPopular: require('./_flexible-desk-popular-redux').reducer,
  flexibleDeskCancel: require('./_flexiable-desk-booking-cancel-redux').reducer,

  dedicatedSpace: require('./dedicated-space/_dedicated-space-redux').reducer,
  dedicatedSpaceAvailability: require('./dedicated-space/_dedicated-space-availability-redux').reducer,
  dedicatedSpaceBooking: require('./dedicated-space/_dedicated-space-booking-redux').reducer,
  dedicatedSpacePricing: require('./dedicated-space/_dedicated-space-pricing-redux').reducer,
  dedicatedUserType: require('./dedicated-space/_dedicated-user-type-redux').reducer,
  dedicatedSpaceRelated: require('./dedicated-space/_dedicated-space-related-redux').reducer,
  dedicatedSpaceBookingDetail: require('./dedicated-space/_dedicated-space-booking-detail-redux').reducer,

  question: require('./_question-redux').reducer,
  officeSpace: require('./_office-space-redux').reducer,
  hotDesk: require('./_hot-desk-redux').reducer,
  filterMobile: require('../components/Filter/FilterMobile/FilterMobile.redux').reducer,
  flexibleDeskItem: require('./_flexible-desk-item-redux').reducer,
  point: require('./_point.redux').reducer,
  myService: require('./_my-service-redux').reducer,
  notification: require('./_notification-redux').reducer,
})

export default rootReducer
