import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

import FlexibleDeskItemAction from '@/redux/_flexible-desk-item-redux'

function BookingHeader(props) {
  const { activeTab, setActiveBookingTab } = props
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveBookingTab(tab)
  }
  return (
    <div>
      <Nav className="flexibleBooking__nav">
        <NavItem className="flexibleBooking__nav-item">
          <NavLink
            className={classnames('flexibleBooking__nav-link', {
              active: activeTab === '1',
            })}
            onClick={() => toggle('1')}
          >
            Sử dụng point
          </NavLink>
        </NavItem>
        <NavItem className="flexibleBooking__nav-item">
          <NavLink
            className={classnames('flexibleBooking__nav-link', {
              active: activeTab === '2',
            })}
            onClick={() => toggle('2')}
          >
            Sử dụng gói
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  )
}
BookingHeader.propTypes = {
  setActiveBookingTab: PropTypes.func,
  activeTab: PropTypes.string,
}
const mapStateToProps = (state) => {
  return {
    activeTab: state.flexibleDeskItem.activeBookingTab,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveBookingTab: (data) =>
    dispatch(FlexibleDeskItemAction.setActiveBookingTab(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BookingHeader))
