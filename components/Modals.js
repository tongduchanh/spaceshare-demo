import React from 'react'
import CommonModal from './modal/CommonModal'
import VerificationModal from './modal/verification-modal'
import NotificationModal from './modal/NotificationModal'
import BookingSuccessModal from './modal/booking-success'
import PaymentSuccessModal from './modal/payment-success'
import PaymentFailModal from './modal/payment-fail'
import SuccessModal from './modal/success-modal'

class Modals extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CommonModal />
                <VerificationModal />
                <NotificationModal />
                <BookingSuccessModal />
                <PaymentSuccessModal />
                <PaymentFailModal />
                <SuccessModal />
            </React.Fragment>
        )
    }
}

export default Modals
