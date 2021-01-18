/**
 * @author NamNH
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { AuthsTypes } from '../redux/_auths-redux'
import { FlexibleDeskTypes } from '../redux/_flexible-desk-redux'
import { FlexibleDeskListTypes } from '../redux/_flexible-desk-list-redux'
import { ProfileTypes } from '../redux/_profile-redux'
import { LocationTypes } from '../redux/_location-redux'
import {CoworkingFavoriteTypes} from '../redux/_coworking-favorite-redux'
import {PlanTypes} from '../redux/_plan-redux'
import {SubscriptionTypes} from '../redux/_subscription-redux'
import {ReviewTypes} from '../redux/_review-redux'
import {MyReviewTypes} from '../redux/_my-review-redux'
import {BookingTypes} from '../redux/_booking-redux'
import {ActivatedTypes} from '../redux/_activated-redux'
import {AvailabilityTypes} from '../redux/_availability-redux'
import {PaymentTypes} from '../redux/_payment-redux'
import {PaymentChannelTypes} from '../redux/_payment-channel-redux'
import {BlogTypes} from '../redux/_blog-redux'
import {SecurityTypes} from '../redux/_security-redux'
import {FlexibleBookingTypes} from '../redux/_flexible-booking-redux'
import { SpacesTypes } from '../redux/_space-redux'
import { SpaceRequestTypes } from '../redux/_space-request-redux'
import { SpaceBookingTypes } from '../redux/_space-booking-redux'
import { DedicatedDeskTypes } from '../redux/_dedicated-desk-redux'
import { DedicatedDeskRequestTypes } from '../redux/_dedicated-desk-request-redux'
import { DedicatedDeskTypeTypes } from '../redux/_dedicated-desk-type-redux'
import { DedicatedDeskBookingTypes } from '../redux/_dedicated-desk-booking-redux'
import { DedicatedDeskGroupTypes } from '../redux/_dedicated-desk-group-redux'
import { PartnerTypes } from '../redux/_partner-redux'
import { ActivityTypeTypes } from '../redux/_activity-type-redux'
import { BannerTypes } from '../redux/_banner-redux'
import { SearchTypes } from '../redux/_search-redux'
import { FlexibleSubcriptionTypes } from '../redux/_flexible-subcription-redux'
import { FlexibleActiveStateTypes } from '../redux/_flexible-active-state-redux'
import { FlexibleGetUserTypes } from '../redux/_flexible-get-user-redux'
import { FlexibleSubscriptionTransferTypes } from '../redux/_flexiable-subcription-transfer-redux'
import { FlexibleDeskBookingCancelTypes } from '../redux/_flexiable-desk-booking-cancel-redux'
import { FlexibleDeskPopularTypes } from '../redux/_flexible-desk-popular-redux'
import { FlexibleDeskNewestTypes } from '../redux/_flexible-desk-newest-redux'
import { SpaceTypeTypes } from '../redux/_space-type-redux'
import { SpacesServiceTypes} from '../redux/_space-service-amenity-redux'
import { QuestionTypes} from '../redux/_question-redux'
// Dedicated space
import { DedicatedSpaceTypes } from '../redux/dedicated-space/_dedicated-space-redux'
import { DedicatedSpaceAvailabilityTypes } from '../redux/dedicated-space/_dedicated-space-availability-redux'
import { DedicatedSpaceBookingTypes } from '../redux/dedicated-space/_dedicated-space-booking-redux'
import { DedicatedSpaceBookingDetailTypes } from '../redux/dedicated-space/_dedicated-space-booking-detail-redux'
import { DedicatedSpacePricingTypes } from '../redux/dedicated-space/_dedicated-space-pricing-redux'
import { DedicatedUserTypeTypes } from '../redux/dedicated-space/_dedicated-user-type-redux'
import { DedicatedSpaceRelatedTypes } from '../redux/dedicated-space/_dedicated-space-related-redux'
//Office space
import { OfficeSpaceTypes } from '../redux/_office-space-redux'
//Hot desk
import { HotDeskTypes } from '../redux/_hot-desk-redux'
import { PointTypes } from '../redux/_point.redux'
import {FlexibleDeskItemTypes} from '../redux/_flexible-desk-item-redux'
import {MyServiceTypes} from '../redux/_my-service-redux'
import {CommonTypes} from '../redux/_common-redux'

/* ------------- Sagas ------------- */
import ErrorsSagas from './_errors-sagas'
import AuthsSagas from './_auths-sagas'
import FlexibleDeskSagas from './_flexible-desk-sagas'
import FlexibleDeskListSagas from './_flexible-desk-list-sagas'
import ProfileSagas from './_profile-sagas'
import LocationSagas from './_location-sagas'
import CoworkingFavoriteSagas from './_coworking-favorite-sagas'
import PlanSagas from './_plan-sagas'
import SubscriptionSagas from './_subscription-sagas'
import ReviewSagas from './_review-sagas'
import MyReviewSagas from './_my-review-sagas'
import BookingSagas from './_booking-sagas'
import ActivatedSagas from './_activated-sagas'
import AvailabilitySagas from './_availability-sagas'
import PaymentSagas from './_payment-sagas'
import PaymentChannelSagas from './_payment-channel-sagas'
import BlogSagas from './_blog-sagas'
import SecuritySagas from './_security-sagas'

import SpaceSagas from './_space-sagas'
import SpaceRequestSagas from './_space-request-sagas'
import SpaceBookingSagas from './_space-booking-sagas'

//Dedicated desk
import DedicatedDeskSagas from './_dedicated-desk-sagas'
import DedicatedDeskRequestSagas from './_dedicated-desk-request-sagas'
import DedicatedDeskBookingSagas from './_dedicated-desk-booking-sagas'
import DedicatedDeskTypeSagas from './_dedicated-desk-type-sagas'
import DedicatedDeskGroupSagas from './_dedicated-desk-group-sagas'

import PartnerSagas from './_partner-sagas'
import ActivityTypeSagas from './_activity-type-sagas'
import BannerSagas from './_banner-sagas'
import SearchSagas from './_search-sagas'
//Flexible desk
import FlexibleBookingSagas from './_flexible-booking-sagas'
import FlexibleSubcriptionSagas from './_flexible-subcription-sagas'
import FlexibleActiveStateSagas from './_flexiable-active-state-sagas'
import FlexibleGetUserSagas from './_flexiable-get-user-sagas'
import FlexibleSubscriptionTransferSagas from './_flexiable-subscription-transfer-sagas'
import SpaceTypeSagas from './_space-type-sagas'
import SpaceServiceAmenitySagas from './_space-service-amenity-sagas'
import FlexibleDeskBookingCancelSagas from './_flexiable-desk-booking-cancel-sagas'
import FlexibleDeskPopularSagas from './_flexible-desk-popular-sagas'
import FlexibleDeskNewestSagas from './_flexible-desk-newest-sagas'
//Dedicated space
import DedicatedSpaceSagas from './dedicated-space/_dedicated-space-sagas'
import DedicatedSpaceAvailabilitySagas from './dedicated-space/_dedicated-space-availability-sagas'
import DedicatedSpaceBookingSagas from './dedicated-space/_dedicated-space-booking-sagas'
import DedicatedSpaceBookingDetailSagas from './dedicated-space/_dedicated-space-booking-detail-sagas'
import DedicatedSpacePricingSagas from './dedicated-space/_dedicated-space-pricing-sagas'
import DedicatedUserTypeSagas from './dedicated-space/_dedicated-user-type-sagas'
import DedicatedSpaceRelatedSagas from './dedicated-space/_dedicated-space-related-sagas'

import QuestionSagas from './_question-sagas'
import OfficeSpaceSagas from './_office-space-sagas'
import HotDeskSagas from './_hot-desk-sagas'
import PointSagas from './_point.sagas'
import MyServiceSagas from './_my-service-sagas'
import CommonSagas from './_common-sagas'
import NotificationSagas from './_notification-sagas'
import { NotificationTypes } from '@/redux/_notification-redux'

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        //Common
        takeLatest(CommonTypes.GET_PROVINCE, CommonSagas.getProvince),
        takeLatest(CommonTypes.GET_DISTRICT, CommonSagas.getDistrict),
        takeLatest(CommonTypes.COMMON_FAILURE, ErrorsSagas.raiseError),

        //My service
        takeLatest(MyServiceTypes.CHECK_SUBSCRIPTION, MyServiceSagas.checkSubscription),
        takeLatest(MyServiceTypes.CONFIRM_SUBSCRIPTION, MyServiceSagas.confirmSubscription),
        takeLatest(MyServiceTypes.MY_SERVICE_FAILURE, ErrorsSagas.raiseError),

        //Point
        takeLatest(PointTypes.GET_REAL_PRICE, PointSagas.getRealPrice),
        takeLatest(PointTypes.GET_PROMOTION_CODE, PointSagas.getPromotionCode),
        takeLatest(PointTypes.BUY_POINT, PointSagas.buyPoint),
        takeLatest(PointTypes.POINT_FAILURE, ErrorsSagas.raiseError),

        //Flexible desk item
        takeLatest(FlexibleDeskItemTypes.CHECK_BOOKING, FlexibleBookingSagas.checkBooking),
        takeLatest(FlexibleDeskItemTypes.BOOKING_WITH_POINT, FlexibleBookingSagas.bookingWithPoint),
        takeLatest(FlexibleDeskItemTypes.FLEXIBLE_DESK_ITEM_FAILURE, ErrorsSagas.raiseError),

        //authentication
        takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
        takeLatest(AuthsTypes.REGISTER_REQUEST, AuthsSagas.register),
        takeLatest(AuthsTypes.FORGOT_PASSWORD_REQUEST, AuthsSagas.forgotPassword),
        takeLatest(AuthsTypes.RESET_PASSWORD_REQUEST, AuthsSagas.resetPassword),
        takeLatest(AuthsTypes.SOCIAL_AUTH_FB, AuthsSagas.socialAuthFb),
        takeLatest(AuthsTypes.SOCIAL_AUTH_GOOGLE, AuthsSagas.socialAuthGoogle),
        takeLatest(AuthsTypes.BECOME_HOST, AuthsSagas.becomeHost),
        takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorsSagas.raiseError),

        //Dedicated space
        takeLatest(DedicatedSpaceTypes.DEDICATED_SPACE_LIST, DedicatedSpaceSagas.dedicatedSpaceList),
        takeLatest(DedicatedSpaceTypes.DEDICATED_SPACE_DETAIL, DedicatedSpaceSagas.dedicatedSpaceDetail),
        takeLatest(DedicatedSpaceTypes.DEDICATED_SPACE_FAILURE, ErrorsSagas.raiseError),

        //Dedicated space related
        takeLatest(DedicatedSpaceRelatedTypes.DEDICATED_SPACE_RELATED, DedicatedSpaceRelatedSagas.dedicatedSpaceRelated),
        takeLatest(DedicatedSpaceRelatedTypes.DEDICATED_SPACE_RELATED_FAILURE, ErrorsSagas.raiseError),

        //Dedicated space availability
        takeLatest(DedicatedSpaceAvailabilityTypes.MONTH_AVAILABILITY, DedicatedSpaceAvailabilitySagas.monthAvailability),
        takeLatest(DedicatedSpaceAvailabilityTypes.HOUR_AVAILABILITY, DedicatedSpaceAvailabilitySagas.hourAvailability),
        takeLatest(DedicatedSpaceAvailabilityTypes.DEDICATED_SPACE_AVAILABILITY_ERROR, ErrorsSagas.getError),

        //Dedicated space booking
        takeLatest(DedicatedSpaceBookingTypes.DEDICATED_SPACE_BOOKING_CALCULATE, DedicatedSpaceBookingSagas.dedicatedSpaceBookingCalculate),
        takeLatest(DedicatedSpaceBookingTypes.ADD_DEDICATED_SPACE_BOOKING, DedicatedSpaceBookingSagas.addDedicatedSpaceBooking),
        takeLatest(DedicatedSpaceBookingTypes.BOOKING_LIST, DedicatedSpaceBookingSagas.bookingList),
        takeLatest(DedicatedSpaceBookingTypes.CREATE_CHECKOUT_LINK, DedicatedSpaceBookingSagas.createCheckoutLink),
        takeLatest(DedicatedSpaceBookingTypes.DEDICATED_SPACE_BOOKING_FAILURE, ErrorsSagas.raiseError),
        takeLatest(DedicatedSpaceBookingTypes.DEDICATED_SPACE_BOOKING_ERROR, ErrorsSagas.getError),

        //Dedicated space booking detail
        takeLatest(DedicatedSpaceBookingDetailTypes.DEDICATED_SPACE_BOOKING_DETAIL, DedicatedSpaceBookingDetailSagas.dedicatedSpaceBookingDetail),
        takeLatest(DedicatedSpaceBookingDetailTypes.DEDICATED_SPACE_BOOKING_DETAIL_FAILURE, ErrorsSagas.raiseError),

        //Dedicated space pricing
        takeLatest(DedicatedSpacePricingTypes.DEDICATED_SPACE_PRICING_CALCULATE, DedicatedSpacePricingSagas.dedicatedSpacePricingCalculate),
        takeLatest(DedicatedSpacePricingTypes.DEDICATED_SPACE_PRICING_ERROR, ErrorsSagas.getError),
        
        //Dedicated user type
        takeLatest(DedicatedUserTypeTypes.DEDICATED_USER_TYPE, DedicatedUserTypeSagas.dedicatedUserType),
        takeLatest(DedicatedUserTypeTypes.DEDICATED_USER_TYPE_FAILURE, ErrorsSagas.raiseError),

        //Flexible desk
        takeLatest(FlexibleDeskTypes.GET_FLEXIBLE_DESK_LIST, FlexibleDeskSagas.getFlexibleDeskList),
        takeLatest(FlexibleDeskTypes.GET_FLEXIBLE_DESK_DETAIL, FlexibleDeskSagas.getFlexibleDeskDetail),
        takeLatest(FlexibleDeskTypes.GET_SPACE_POLICY, FlexibleDeskSagas.getSpacePolicy),
        takeLatest(FlexibleDeskTypes.FLEXIBLE_DESK_FAILURE, ErrorsSagas.raiseError),

        //review
        takeLatest(ReviewTypes.GET_REVIEW_COLLECTION, ReviewSagas.getReviewCollection),
        takeLatest(ReviewTypes.POST_REVIEW_GALLERY, ReviewSagas.postReviewGallery),
        takeLatest(ReviewTypes.REVIEW_FAILURE, ErrorsSagas.raiseError),

        //my review
        takeLatest(MyReviewTypes.GET_MY_REVIEW, MyReviewSagas.getMyReview),
        takeLatest(MyReviewTypes.POST_REVIEW_REQUEST, MyReviewSagas.postReviewRequest),
        takeLatest(MyReviewTypes.UPDATE_REVIEW, MyReviewSagas.updateReview),
        takeLatest(MyReviewTypes.MY_REVIEW_FAILURE, ErrorsSagas.raiseError),
    
        //coworking favorite
        takeLatest(CoworkingFavoriteTypes.GET_COWORKING_FAVORITE_LIST, CoworkingFavoriteSagas.getCoworkingFavorite),
        takeLatest(CoworkingFavoriteTypes.TOGETHER_FAVORITE_REQUEST, CoworkingFavoriteSagas.togetherFavorite),
        takeLatest(CoworkingFavoriteTypes.COWORKING_FAVORITE_FAILURE, ErrorsSagas.raiseError),

        //profile
        takeLatest(ProfileTypes.PROFILE_REQUEST, ProfileSagas.getProfile),
        takeLatest(ProfileTypes.LOGOUT_REQUEST, ProfileSagas.logout),
        takeLatest(ProfileTypes.EDIT_PROFILE_REQUEST, ProfileSagas.editProfile),
        takeLatest(ProfileTypes.UPDATE_PHONE_NUMBER, ProfileSagas.updatePhoneNumber),
        takeLatest(ProfileTypes.EDIT_EMAIL, ProfileSagas.editEmail),
        takeLatest(ProfileTypes.CHECK_PHONE_NUMBER, ProfileSagas.checkPhoneNumber),
        takeLatest(ProfileTypes.GET_REWARD, ProfileSagas.getReward),
        takeLatest(ProfileTypes.POST_INPUT_CODE, ProfileSagas.postInputCode),
        takeLatest(ProfileTypes.GET_REFERRAL_CODE, ProfileSagas.getReferralCode),
        takeLatest(ProfileTypes.POST_REFERRAL_CODE, ProfileSagas.postReferralCode),
        takeLatest(ProfileTypes.PROFILE_FAILURE, ErrorsSagas.raiseError),

        //Banner
        takeLatest(BannerTypes.GET_BANNER_LIST, BannerSagas.getBannerList),
        takeLatest(BannerTypes.BANNER_FAILURE, ErrorsSagas.raiseError),

        //Location
        takeLatest(LocationTypes.GET_DISTRICT_LIST, LocationSagas.getDistrictList),
        takeLatest(LocationTypes.GET_AVAILABLE_PROVINCES, LocationSagas.getAvailableProvinces),
        takeLatest(LocationTypes.GET_AVAILABLE_DISTRICTS, LocationSagas.getAvailableDistricts),
        takeLatest(LocationTypes.LOCATION_FAILURE, ErrorsSagas.raiseError),

        //Plan
        takeLatest(PlanTypes.GET_PLAN_LIST, PlanSagas.getPlanList),
        takeLatest(PlanTypes.GET_PLAN_DETAIL, PlanSagas.getPlanDetail),
        takeLatest(PlanTypes.GET_PLAN_TYPE, PlanSagas.getPlanType),
        takeLatest(PlanTypes.PLAN_FAILURE, ErrorsSagas.raiseError),

        //Subscription
        takeLatest(SubscriptionTypes.SUBSCRIPTION_LIST, SubscriptionSagas.list),
        takeLatest(SubscriptionTypes.SUBSCRIPTION_LIST_USING, SubscriptionSagas.listUsing),
        takeLatest(SubscriptionTypes.SUBSCRIPTION_LIST_USED, SubscriptionSagas.listUsed),
        takeLatest(SubscriptionTypes.SUBSCRIPTION_REQUEST, SubscriptionSagas.request),
        takeLatest(SubscriptionTypes.SUBSCRIPTION_ACTIVE, SubscriptionSagas.active),
        takeLatest(SubscriptionTypes.SUBSCRIPTION_FAILURE, ErrorsSagas.raiseError),

        //booking
        takeLatest(BookingTypes.ADD_BOOKING, BookingSagas.add),
        takeLatest(BookingTypes.EDIT_BOOKING, BookingSagas.edit),
        takeLatest(BookingTypes.REMOVE_BOOKING, BookingSagas.remove),
        takeLatest(BookingTypes.MULTI_ADD_BOOKING, BookingSagas.multiAdd),
        takeLatest(BookingTypes.BOOKING_FAILURE, ErrorsSagas.raiseError),

        //Activated
        takeLatest(ActivatedTypes.SUBSCRIPTION_ACTIVATED_LIST, ActivatedSagas.activatedList),
        takeLatest(ActivatedTypes.ACTIVATED_FAILURE, ErrorsSagas.raiseError),

        //Availability
        takeLatest(AvailabilityTypes.FLEXIBLE_DESK_AVAILABILITY_LIST, AvailabilitySagas.flexibleDeskAvailabilityList),
        takeLatest(AvailabilityTypes.FLEXIBLE_AVAILABILITY_BY_SPACE, AvailabilitySagas.flexibleAvailabilityBySpace),
        takeLatest(AvailabilityTypes.AVAILABILITY_FAILURE, ErrorsSagas.raiseError),
        takeLatest(AvailabilityTypes.AVAILABILITY_ERROR, ErrorsSagas.getError),

        //Payment
        takeLatest(PaymentTypes.INIT_PAYMENT, PaymentSagas.initPayment),
        takeLatest(PaymentTypes.INIT_PAYMENT_SPACE, PaymentSagas.initPaymentSpace),
        takeLatest(PaymentTypes.INIT_PAYMENT_DEDICATED_DESK, PaymentSagas.initPaymentDedicatedDesk),
        takeLatest(PaymentTypes.CHECK_PROMOTION_CODE, PaymentSagas.checkPromotionCode),
        takeLatest(PaymentTypes.VALIDATE_TRANSACTION, PaymentSagas.validateTransaction),
        takeLatest(PaymentTypes.PAYMENT_FAILURE, ErrorsSagas.raiseError),

        //Payment channel
        takeLatest(PaymentChannelTypes.LIST_CHANNEL, PaymentChannelSagas.listChannel),
        takeLatest(PaymentChannelTypes.PAYMENT_CHANNEL_FAILURE, ErrorsSagas.raiseError),

        //blog
        takeLatest(BlogTypes.GET_POST_LIST, BlogSagas.getPostList),
        takeLatest(BlogTypes.GET_POST_BY_SLUG, BlogSagas.getPostBySlug),
        takeLatest(BlogTypes.GET_POST_BY_CATEGORY, BlogSagas.getPostByCategory),
        takeLatest(BlogTypes.BLOG_FAILURE, ErrorsSagas.raiseError),

        //profile security
        takeLatest(SecurityTypes.CHANGE_PASS_REQUEST, SecuritySagas.changePass),
        takeLatest(SecurityTypes.SEND_VERIFY_EMAIL, SecuritySagas.sendVerifyEmail),
        takeLatest(SecurityTypes.VERIFY_EMAIL, SecuritySagas.verifyEmail),
        takeLatest(SecurityTypes.VERIFY_PHONE_NUMBER, SecuritySagas.verifyPhoneNumber),
        takeLatest(SecurityTypes.SECURITY_FAILURE, ErrorsSagas.raiseError),

        //Space
        takeLatest(SpacesTypes.GET_SPACE_LIST, SpaceSagas.getSpaceList),
        takeLatest(SpacesTypes.GET_SPACE_DETAIL, SpaceSagas.getSpaceDetail),
        takeLatest(SpacesTypes.GROUPED_LIST, SpaceSagas.groupedList),
        takeLatest(SpacesTypes.SPACE_FAILURE, ErrorsSagas.raiseError),

        //Space type
        takeLatest(SpaceTypeTypes.SAVE_SPACE_TYPE_REQUEST, SpaceTypeSagas.saveSpaceType),
        takeLatest(SpaceTypeTypes.GET_SPACE_BY_TYPE, SpaceTypeSagas.getSpaceByType),
        takeLatest(SpaceTypeTypes.SPACE_TYPE_FAILURE, ErrorsSagas.raiseError),
    
        //Space request
        takeLatest(SpaceRequestTypes.POST_SPACE_REQUEST, SpaceRequestSagas.postSpaceRequest),
        takeLatest(SpaceRequestTypes.GET_SPACE_REQUEST_LIST, SpaceRequestSagas.getSpaceRequestList),
        takeLatest(SpaceRequestTypes.SPACE_REQUEST_FAILURE, ErrorsSagas.raiseError),

        //Space booking
        takeLatest(SpaceBookingTypes.GET_SPACE_BOOKING_LIST, SpaceBookingSagas.getSpaceBookingList),
        takeLatest(SpaceBookingTypes.GET_SPACE_BOOKING_DETAIL, SpaceBookingSagas.getSpaceBookingDetail),
        takeLatest(SpaceBookingTypes.SPACE_BOOKING_FAILURE, ErrorsSagas.raiseError),

        //Dedicated desk
        takeLatest(DedicatedDeskTypes.DEDICATED_DESK_LIST, DedicatedDeskSagas.dedicatedDeskList),
        takeLatest(DedicatedDeskTypes.DEDICATED_DESK_GROUP_LIST, DedicatedDeskSagas.dedicatedDeskGroupList),
        takeLatest(DedicatedDeskTypes.DEDICATED_DESK_DETAIL, DedicatedDeskSagas.dedicatedDeskDetail),
        takeLatest(DedicatedDeskTypes.DEDICATED_DESK_REQUEST, DedicatedDeskSagas.dedicatedDeskRequest),
        takeLatest(DedicatedDeskTypes.DEDICATED_DESK_FAILURE, ErrorsSagas.raiseError),

        //Dedicated desk request
        takeLatest(DedicatedDeskRequestTypes.POST_DEDICATED_DESK_REQUEST, DedicatedDeskRequestSagas.postDedicatedDeskRequest),
        takeLatest(DedicatedDeskRequestTypes.GET_DEDICATED_DESK_REQUEST_LIST, DedicatedDeskRequestSagas.getDedicatedDeskRequestList),
        takeLatest(DedicatedDeskRequestTypes.DEDICATED_DESK_REQUEST_FAILURE, ErrorsSagas.raiseError),
        
        //Dedicated desk booking
        takeLatest(DedicatedDeskBookingTypes.DEDICATED_DESK_BOOKING_LIST, DedicatedDeskBookingSagas.dedicatedDeskBookingList),
        takeLatest(DedicatedDeskBookingTypes.DEDICATED_DESK_BOOKING_DETAIL, DedicatedDeskBookingSagas.dedicatedDeskBookingDetail),
        takeLatest(DedicatedDeskBookingTypes.DEDICATED_DESK_BOOKING_FAILURE, ErrorsSagas.raiseError),

        //Dedicated desk type
        takeLatest(DedicatedDeskTypeTypes.DEDICATED_DESK_TYPE_LIST, DedicatedDeskTypeSagas.dedicatedDeskTypeList),
        takeLatest(DedicatedDeskTypeTypes.DEDICATED_DESK_TYPE_FAILURE, ErrorsSagas.raiseError),

        //Dedicated desk group
        takeLatest(DedicatedDeskGroupTypes.DEDICATED_DESK_GROUP, DedicatedDeskGroupSagas.dedicatedDeskGroup),
        takeLatest(DedicatedDeskGroupTypes.DEDICATED_DESK_GROUP_FAILURE, ErrorsSagas.raiseError),

        //Partner
        takeLatest(PartnerTypes.PARTNER_LIST, PartnerSagas.partnerList),
        takeLatest(PartnerTypes.PARTNER_FAILURE, ErrorsSagas.raiseError),

        //Activity type
        takeLatest(ActivityTypeTypes.ACTIVITY_TYPE_LIST, ActivityTypeSagas.activityTypeList),
        takeLatest(ActivityTypeTypes.ACTIVITY_TYPE_FAILURE, ErrorsSagas.raiseError),

        //Activity type
        takeLatest(ActivityTypeTypes.ACTIVITY_TYPE_LIST, ActivityTypeSagas.activityTypeList),
        takeLatest(ActivityTypeTypes.ACTIVITY_TYPE_FAILURE, ErrorsSagas.raiseError),
        
        //Search type
        takeLatest(SearchTypes.SUGGESTION_REQUEST, SearchSagas.suggestionRequest),
        takeLatest(SearchTypes.SEARCH_FAILURE, ErrorsSagas.raiseError),

        //Flexible Booking type
        takeLatest(FlexibleBookingTypes.GET_FLEXIBLE_BOOKING_LIST, FlexibleBookingSagas.getFlexibleBookingList),
        takeLatest(FlexibleBookingTypes.POST_FLEXIBLE_BOOKING, FlexibleBookingSagas.postFlexibleBooking),
        takeLatest(FlexibleBookingTypes.FLEXIBLE_BOOKING_FAILURE, ErrorsSagas.raiseError),

        //Flexiable Subcription type
        takeLatest(FlexibleSubcriptionTypes.FLEXIBLE_SUBCRIPTION_LIST, FlexibleSubcriptionSagas.getSubscriptionlist),
        takeLatest(FlexibleSubcriptionTypes.FLEXIBLE_SUBCRIPTION_BOOKING, FlexibleSubcriptionSagas.getSubscriptionBooking),
        takeLatest(FlexibleSubcriptionTypes.FLEXIBLE_SUBCRIPTION_FAILURE, ErrorsSagas.raiseError),

        // Flexiable Active State type 
        takeLatest(FlexibleActiveStateTypes.FLEXIBLE_ACTIVE_STATE, FlexibleActiveStateSagas.flexiableActiveState),
        takeLatest(FlexibleActiveStateTypes.FLEXIBLE_ACTIVE_STATE_FAILURE, ErrorsSagas.raiseError),

        // Flexiable Get User type 
        takeLatest(FlexibleGetUserTypes.FLEXIBLE_GET_USER, FlexibleGetUserSagas.getUserFlexiable),
        takeLatest(FlexibleGetUserTypes.FLEXIBLE_GET_USER_FAILURE, ErrorsSagas.raiseError),

        // Tranfer to friends 
        takeLatest(FlexibleSubscriptionTransferTypes.POST_FLEXIBLE_SUBSCRIPTION_TRANSFER_REQUEST, FlexibleSubscriptionTransferSagas.postTransferToFriends),
        takeLatest(FlexibleSubscriptionTransferTypes.FLEXIBLE_SUBSCRIPTION_TRANSFER_FAILURE, ErrorsSagas.raiseError),

        //Space svervice amenity
        takeLatest(SpacesServiceTypes.GET_SPACE_SERVICE_AMENITY, SpaceServiceAmenitySagas.getSpaceServiceAmenity),
        takeLatest(SpacesServiceTypes.EDIT_SPACE_SERVICE_AMENITY, SpaceServiceAmenitySagas.editSpaceServiceAmenity),
        takeLatest(SpacesServiceTypes.GET_AVAILABLE_AMENITY, SpaceServiceAmenitySagas.getAvailableAmenity),
        takeLatest(SpacesServiceTypes.SPACE_SERVICE_AMENITY_FAILURE, ErrorsSagas.raiseError),

        //flexible-desk-popular
        takeLatest(FlexibleDeskPopularTypes.GET_FLEXIBLE_DESK_POPULAR, FlexibleDeskPopularSagas.getFlexibleDeskPopular),
        takeLatest(FlexibleDeskPopularTypes.FLEXIBLE_DESK_POPULAR_FAILURE, ErrorsSagas.raiseError),

        //flexible-desk-newest
        takeLatest(FlexibleDeskNewestTypes.GET_FLEXIBLE_DESK_NEWEST, FlexibleDeskNewestSagas.getFlexibleDeskNewest),
        takeLatest(FlexibleDeskNewestTypes.FLEXIBLE_DESK_NEWEST_FAILURE, ErrorsSagas.raiseError),

        //Flexible desk related
        takeLatest(FlexibleDeskListTypes.GET_FLEXIBLE_DESK_RELATED, FlexibleDeskListSagas.getFlexibleDeskRelated),
        takeLatest(FlexibleDeskListTypes.FLEXIBLE_DESK_LIST_FAILURE, ErrorsSagas.raiseError),

        //Flexiable desk booking cancel 
        takeLatest(FlexibleDeskBookingCancelTypes.FLEXIBLE_DESK_BOOKING_CANCEL, FlexibleDeskBookingCancelSagas.flexiableDeskBookingCancel),
        takeLatest(FlexibleDeskBookingCancelTypes.FLEXIBLE_DESK_BOOKING_CANCEL_FAILURE, ErrorsSagas.raiseError),

        // Question
        takeLatest(QuestionTypes.CATEGORY, QuestionSagas.category),
        takeLatest(QuestionTypes.QUESTIONS, QuestionSagas.questions),
        takeLatest(QuestionTypes.QUESTION, QuestionSagas.question),
        takeLatest(QuestionTypes.QUESTION_FAILURE, ErrorsSagas.raiseError),

        //Office space
        takeLatest(OfficeSpaceTypes.GET_OFFICE_SPACE_LIST, OfficeSpaceSagas.getOfficeSpaceList),
        takeLatest(OfficeSpaceTypes.GET_OFFICE_SPACE_DETAIL, OfficeSpaceSagas.getOfficeSpaceDetail),
        takeLatest(OfficeSpaceTypes.GET_OFFICE_SPACE_RELATED, OfficeSpaceSagas.getOfficeSpaceRelated),
        takeLatest(OfficeSpaceTypes.POST_CONTACT, OfficeSpaceSagas.postContact),
        takeLatest(OfficeSpaceTypes.OFFICE_SPACE_FAILURE, ErrorsSagas.raiseError),

        //Hot desk
        takeLatest(HotDeskTypes.GET_HOT_DESK_LIST, HotDeskSagas.getHotDeskList),
        takeLatest(HotDeskTypes.GET_HOT_DESK_DETAIL, HotDeskSagas.getHotDeskDetail),
        takeLatest(HotDeskTypes.GET_HOT_DESK_RELATED, HotDeskSagas.getHotDeskRelated),
        takeLatest(HotDeskTypes.HOT_DESK_FAILURE, ErrorsSagas.raiseError),

        // Notification
        takeLatest(NotificationTypes.GET_NOTIFICATION_LIST, NotificationSagas.getNotificationList),
        takeLatest(NotificationTypes.GET_UNREAD_NOTIFICATION_COUNT, NotificationSagas.getUnreadNotificationCount),
        takeLatest(NotificationTypes.MARK_ALL_NOTIFICATION_AS_READ, NotificationSagas.markAllNotificationAsRead),
        takeLatest(NotificationTypes.MARK_NOTIFICATION_AS_READ, NotificationSagas.markNotificationAsRead),
        takeLatest(NotificationTypes.REGISTER_PUSH_NOTIFICATION, NotificationSagas.registerPushNotification),
    ])
}
