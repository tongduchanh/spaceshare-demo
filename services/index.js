/**
 * @author Nam NH
 * Center point to export instances of services
 */
import AuthsService from './_auths-services'
import FlexibleDeskService from './_flexible-desk-services'
import ProfileService from './_profile-services'
import CommonService from './_common-service'
import LocationService from './_location-service'
import CoworkingFavoriteService from './_coworking-favorite-service'
import PlanService from './_plan-service'
import SubscriptionService from './_subscription-service'
import BookingService from './_booking-service'
import AvailabilityService from './_availability-service'
import BookingCsService from './_booking-cs-service'
import PaymentService from './_payment-service'
import BlogService from './_blog-service'
import SecurityService from './_security-service'
import SpaceService from './_space-service'
import SpaceBookingService from './_space-booking-service'
import DedicatedDeskService from './_dedicated-desk-service'
import DedicatedDeskBookingService from './_dedicated-desk-booking-service'
import PartnerService from './_partner-service'
import FlexibleSubscriptionTransferService from './_flexiable-subscription-tranfer-service'
import SpaceServiceAmenity from './_space-service-amenity-service'
//Flexible desk
import FlexibleSubcriptionService from './_flexible-subcription-service'
import FlexibleActiveStateService from './_flexible-active-state-service'
import FlexibleBookingService from './_flexible-booking-service'
import FlexibleGetUserService from './_flexible-get-user-services'
import FlexibleDeskNewestService from './_flexible-desk-newest-service'
import FlexibleDeskPopularSerivce from './_flexible-desk-popular-service'
import FlexibleDeskBookingCancelService from './_flexible-desk-booking-cancel-service'
//Dedicated space
import DedicatedSpaceService from './dedicated-space/_dedicated-space-service'
import DedicatedBookingService from './dedicated-space/_dedicated-booking-service'
//Office space
import OfficeSpaceService from './_office-space-service'
//Hot desk
import HotDeskService from './_hot-desk-service'
// Notification
import NotificationService from './_notification-service'

export const authsService = new AuthsService()
export const flexibleDeskService = new FlexibleDeskService()
export const profileService = new ProfileService()
export const commonService = new CommonService()
export const locationService = new LocationService()
export const coworkingFavoriteService = new CoworkingFavoriteService()
export const planService = new PlanService()
export const subscriptionService = new SubscriptionService()
export const bookingService = new BookingService()
export const availabilityService = new AvailabilityService()
export const bookingCsService = new BookingCsService()
export const paymentService = new PaymentService()
export const blogService = new BlogService()
export const securityService = new SecurityService()
export const spaceService = new SpaceService()
export const spaceBookingService = new SpaceBookingService()
export const dedicatedDeskService = new DedicatedDeskService()
export const dedicatedDeskBookingService = new DedicatedDeskBookingService()
export const partnerService = new PartnerService()
export const spaceServiceAmenity = new SpaceServiceAmenity()
//Flexible desk
export const flexibleBookingService = new FlexibleBookingService()
export const flexibleSubcriptionService = new FlexibleSubcriptionService()
export const flexibleActiveStateService = new FlexibleActiveStateService()
export const flexibleGetUserService = new FlexibleGetUserService()
export const flexibleSubscriptionTransferService = new FlexibleSubscriptionTransferService()
export const flexibleDeskPopularSerivce = new FlexibleDeskPopularSerivce()
export const flexibleDeskNewestService = new FlexibleDeskNewestService()
export const flexibleDeskBookingCancelService = new FlexibleDeskBookingCancelService()
//Dedicated space
export const dedicatedSpaceService = new DedicatedSpaceService()
export const dedicatedBookingService = new DedicatedBookingService()
//Office space
export const officeSpaceService = new OfficeSpaceService()
//Hot desk
export const hotDeskService = new HotDeskService()
// Notification
export const notificationService = new NotificationService()
