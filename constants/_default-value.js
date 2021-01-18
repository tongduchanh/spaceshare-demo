export default class DefaultValue {
  static MODAL_NAME = 'default-modal-name'
  static PAGE = 1
  static LIMIT = 10
  static LIMIT_LIST = 20
  static REVIEW_LIMIT = 5
  static COWORKINGS_PER_PAGE = 10
  static MPD = 86400000
  static TOKEN_ALIVE = 10800000
  static REFRESH_STEP = 7200000
  static ALREADY_BOOKED = 'ALREADY_BOOKED'
  static AVAILABLE = 'AVAILABLE'
  static CHECKED_IN = 'CHECKED-IN'
  static TAB_BASIC = '1'
  static TAB_POPULAR = '2'
  static TAB_FLEXIBLE = '3'
  static BOOKING_STATUS = 'CHECKED-IN,AVAILABLE'
  static COWORKING_SPACE = 'COWORKING_SPACE'

  static SHOWED_STATUS = ['AVAILABLE', 'CHECKED-IN', 'CHECKED-OUT', 'REJECTED']
  static CODE_TYPE_PERCENT = 'PERCENT'
  static CODE_TYPE_MONEY = 'MONEY'
  static CODE_TYPE_TURN = 'TURN'
  static CODE_FREE_LAUNCH_2019 = 'LAUNCH2019'

  static S_INIT = 0
  static S_AWAITING_PAYMENT = 1
  static S_AVAILABLE = 2
  static S_USED = 3
  static S_EXPIRED = 4
  static S_CANCELED = 5

  static FLEXIBLE_DESK = 'FLEXIBLE_DESK'
  static EVENT_SPACE = 'EVENT_SPACE'
  static DEDICATED_DESK = 'DEDICATED_DESK'

  static HOT_DESK_SCOPE = 1
  static EVENT_SPACE_SCOPE = 2
  static DEDICATED_DESK_SCOPE = 3

  static 0 = 'INIT'
  static 1 = 'AVAILABLE'
  static 2 = 'ACTIVATED'
  static 3 = 'EXPIRED'
  static 4 = 'CANCELED'
  static 5 = 'PAYMENT-FAIL'
  static 6 = 'ARCHIVED'
  static 7 = 'TRANSFERRED'
  static 8 = 'CONVERT-POINT'
  static SERVICE_PER_PAGE = 5

  static TIME_DATA = [
    { id: 1, value: '6:00', label: '6:00 am' },
    { id: 2, value: '6:30', label: '6:30 am' },
    { id: 3, value: '7:00', label: '7:00 am' },
    { id: 4, value: '7:30', label: '7:30 am' },
    { id: 5, value: '8:00', label: '8:00 am' },
    { id: 6, value: '8:30', label: '8:30 am' },
    { id: 7, value: '9:00', label: '9:00 am' },
    { id: 8, value: '9:30', label: '9:30 am' },
    { id: 9, value: '10:00', label: '10:00 am' },
    { id: 10, value: '10:30', label: '10:30 am' },
    { id: 10, value: '11:00', label: '11:00 am' },
    { id: 10, value: '11:30', label: '11:30 am' },
    { id: 10, value: '12:00', label: '12:00 pm' },
    { id: 10, value: '12:30', label: '12:30 pm' },
    { id: 10, value: '13:00', label: '13:00 pm' },
    { id: 10, value: '13:30', label: '13:30 pm' },
    { id: 10, value: '14:00', label: '14:00 pm' },
    { id: 10, value: '14:30', label: '14:30 pm' },
    { id: 10, value: '15:00', label: '15:00 pm' },
    { id: 10, value: '15:30', label: '15:30 pm' },
    { id: 10, value: '16:00', label: '16:00 pm' },
    { id: 10, value: '16:30', label: '16:30 pm' },
    { id: 10, value: '17:00', label: '17:00 pm' },
    { id: 10, value: '17:30', label: '17:30 pm' },
    { id: 10, value: '18:00', label: '18:00 pm' },
    { id: 10, value: '18:30', label: '18:30 pm' },
    { id: 10, value: '19:00', label: '19:00 pm' },
    { id: 10, value: '19:30', label: '19:30 pm' },
    { id: 10, value: '20:00', label: '20:00 pm' },
    { id: 10, value: '20:30', label: '20:30 pm' },
    { id: 10, value: '21:00', label: '21:00 pm' },
    { id: 10, value: '21:30', label: '21:30 pm' },
    { id: 10, value: '22:00', label: '22:00 pm' },
    { id: 10, value: '22:30', label: '22:30 pm' },
    { id: 10, value: '23:00', label: '23:00 pm' },
    { id: 10, value: '23:30', label: '23:30 pm' },
  ]

  static provinceList = [
    {
      id: 1,
      name: 'Hà Nội',
      thumbnail: '/static/images/background/ha-noi.png',
    },
    {
      id: 3,
      name: 'Hồ Chí Minh',
      thumbnail: '/static/images/background/hcm.png',
    },
  ]
}
