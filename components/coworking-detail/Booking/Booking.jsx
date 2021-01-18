import React from 'react'

import BookingHeader from '@/components/coworking-detail/Booking/BookingHeader'
import BookingBody from '@/components/coworking-detail/Booking/BookingBody'
import BookingFooter from '@/components/coworking-detail/Booking/BookingFooter'

import './Booking.styles.scss'

function Booking() {
  return (
    <div className="flexibleBooking">
      <div className="flexibleBooking__header">
        <BookingHeader />
      </div>
      <div className="flexibleBooking__body">
        <BookingBody />
      </div>
      <div className="flexibleBooking__footer">
        <BookingFooter />
      </div>
    </div>
  )
}

export default Booking
