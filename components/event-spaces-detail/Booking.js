import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames'

import { withTranslation } from '../../i18n'
import HourlyBooking from '../dedicated-space/hourly-booking'
import ShiftBooking from '../dedicated-space/shift-booking'
import DailyBooking from '../dedicated-space/daily-booking'
import {PricingType} from '../../constants'

const Booking = (props) => {
  const {space, t} = props
  const [activeTab, setActiveTab] = useState(`${PricingType.HOURLY_RATE}`);

  useEffect(() => {
    let active = ''
    if (space.service_pricing) {
      if (space.service_pricing.hourly_rate) {
        active = `${PricingType.HOURLY_RATE}`
      } else {
        if (space.service_pricing.shift_rate && space.service_pricing.shift_rate.length > 0) {
          active = `${PricingType.SHIFT_RATE}`
        } else {
          active = `${PricingType.DAILY_RATE}`
        }
      }
    }
    setActiveTab(active)
  }, [space])

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="booking-sidebar-wrap booking-wrap mt--30">
      <Nav tabs className="booking__tab d-flex">
        {space.service_pricing && space.service_pricing.hourly_rate && (
          <NavItem> 
            <NavLink
              className={classnames({ active: activeTab === `${PricingType.HOURLY_RATE}` })}
              onClick={() => { toggle(`${PricingType.HOURLY_RATE}`) }}
            >
              {t('hour')}
            </NavLink>
          </NavItem>
        )}
        {space.service_pricing && space.service_pricing.shift_rate && space.service_pricing.shift_rate.length > 0 && (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab == `${PricingType.SHIFT_RATE}` })}
              onClick={() => { toggle(`${PricingType.SHIFT_RATE}`) }}
            >
              {t('shift')}
            </NavLink>
          </NavItem>
        )}
        {space.service_pricing && space.service_pricing.daily_rate && (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === `${PricingType.DAILY_RATE}` })}
              onClick={() => { toggle(`${PricingType.DAILY_RATE}`); }}
            >
              {t('day')}
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={`${PricingType.HOURLY_RATE}`}>
          <HourlyBooking
            space={space}
          />
        </TabPane>
        <TabPane tabId={`${PricingType.SHIFT_RATE}`}>
          <ShiftBooking 
            space={space}
          />
        </TabPane>
        <TabPane tabId={`${PricingType.DAILY_RATE}`}>
          <DailyBooking 
            space={space}
          />
        </TabPane>
      </TabContent>
      
      <div className="booking__host">
        <div className="d-flex align-items-center">
          <div className="host-avatar">
            <img className="image--circle" src={space.space_meta && space.space_meta.logo} />
          </div>
          <div className="host-info ml-3 font-weight-bolder">
            {space.space_meta && space.space_meta.name}
          </div>
        </div>
      </div>
    </div>
  )
}

Booking.propTypes = {
  t: PropTypes.func,
  dedicatedSpaceAvailability: PropTypes.func,
  dedicatedSpaceBookingCalculate: PropTypes.func,

  space: PropTypes.object,
  router: PropTypes.object,
  availability: PropTypes.object,
  booking: PropTypes.object,
  bookingError: PropTypes.object,
  processing: PropTypes.bool,
  processingBooking: PropTypes.bool
}

export default (withTranslation('common')(Booking))
