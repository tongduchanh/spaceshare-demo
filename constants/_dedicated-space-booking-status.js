export default class DedicatedSpaceBookingStatus {
  static AVAILABLE = 0
  static CHECKED_IN = 1
  static EXPIRED = 2
  static CANCELED = 3 // người dùng hủy khi đã thanh toán thành công
  static REJECTED = 4 // partner hủy đã thanh toán thành công
  static PENDING_APPROVAL = 7 // chờ phê duyệt
  static DECLINED = 8 // partner từ chối yêu cầu
  static ACCEPTED = 9
  static AWAITING_PAYMENT = 10
  static PAYMENT_FAILED = 11
  static PAYMENT_TIMEOUT = 12
  
  static 0 = 'success'
  static 1 = 'checked-in'
  static 2 = 'expired'
  static 3 = 'cancelled'
  static 4 = 'rejected'
  static 7 = 'pending-approval'
  static 8 = 'declined'
  static 9 = 'accepted'
  static 10 = 'awaiting-payment'
  static 11 = 'payment-failed'
  static 12 = 'payment-timeout'
}
