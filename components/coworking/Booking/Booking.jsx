import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames'


import { withTranslation } from '../../../i18n'

function Booking(props) {
  return (
    <div className="flexibleBooking">
      <div className="flexibleBooking__header">

      </div>
      <div className="flexibleBooking__body">

      </div>
      <div className="flexibleBooking__footer">

      </div>
    </div>
  )
}

export default (withTranslation('common')(Booking))
