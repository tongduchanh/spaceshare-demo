export default class FlexibleDeskSubscriptionStatus {
    static INIT = 0
    static AVAILABLE = 1
    static ACTIVATED = 2
    static EXPIRED = 3
    static CANCELED = 4
    static PAYMENT_FAIL = 5
    static ARCHIVED = 6
    static TRANSFERRED = 7
    static CONVERT_POINT = 8
    // not in the class FlexibleDeskSubscriptionStatus server return , just addition
    static GET_ALL = 'All'
}
