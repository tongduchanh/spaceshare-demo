import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { TabContent, TabPane } from 'reactstrap'

import PackageBooking from '@/components/coworking-detail/Booking/PackageBooking'
// import PointBooking from '@/components/coworking-detail/Booking/PointBooking'
import PointBooking from './PointBookingNew'

function BookingBody(props) {
  const { activeTab } = props
  return (
    <div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <PointBooking />
        </TabPane>
        <TabPane tabId="2">
          <PackageBooking />
        </TabPane>
      </TabContent>
    </div>
  )
}

BookingBody.propTypes = {
  activeTab: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.flexibleDeskItem.activeBookingTab,
  }
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BookingBody))
