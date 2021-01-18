import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import {Container, Nav, NavItem} from 'reactstrap'
import classnames from 'classnames'

import { withTranslation } from '../../i18n'

function Navbar(props) {
  const {t, showPackage, showPolicy, showPricing} = props
  const [activeBar, setActiveBar] = useState(false)
  function scrollFunction() {
    let scrollTop = pageYOffset
    if (scrollTop > 370) {
      setActiveBar(true)
    } else setActiveBar(false)
  }
  useEffect(() => {
    let scrollTop = pageYOffset
    if (scrollTop > 370) {
      setActiveBar(true)
    } else setActiveBar(false)
    window.addEventListener('scroll', scrollFunction)
    return () => window.removeEventListener('scroll', scrollFunction)
  })
  return (
    <div 
      className={classnames('space__bar space__bar--top position-fixed w-100', {
        'active': activeBar
      })}
    >
      <Container className="container--medium">
        <Nav className="space__nav">
          <NavItem>
            <Link
              className="nav-link"
              activeClass="active"
              to="overview"
              spy
              smooth
              offset={-80}
              duration={500}
            >
              {t('overview')}
            </Link>
          </NavItem>
          {showPricing && (
            <NavItem>
              <Link
                className="nav-link"
                activeClass="active"
                to="pricing"
                spy
                smooth
                offset={-80}
                duration={500}
              >
                Giá chi tiết
              </Link>
            </NavItem>
          )}
          <NavItem>
            <Link
              className="nav-link"
              activeClass="active"
              to="amenities"
              spy
              smooth
              offset={-80}
              duration={500}
            >
              {t('amenities')}
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className="nav-link"
              activeClass="active"
              to="reviews"
              spy
              smooth
              offset={-80}
              duration={500}
            >
              {t('reviews')}
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className="nav-link"
              activeClass="active"
              to="hours"
              spy
              smooth
              offset={-80}
              duration={500}
            >
              {t('working-time')}
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className="nav-link"
              activeClass="active"
              to="location"
              spy
              smooth
              offset={-80}
              duration={500}
            >
              {t('location')}
            </Link>
          </NavItem>
          {showPackage && (
            <NavItem>
              <Link
                className="nav-link"
                activeClass="active"
                to="packages"
                spy
                smooth
                offset={-80}
                duration={500}
              >
                Gói SpaceShare Point
              </Link>
            </NavItem>
          )}
          {showPolicy && (
            <NavItem>
              <Link
                className="nav-link"
                activeClass="active"
                to="policy"
                spy
                smooth
                offset={-80}
                duration={500}
              >
                {t('policies')}
              </Link>
            </NavItem>
          )}
        </Nav>
      </Container>
    </div>
  )
}

Navbar.propTypes = {
  t: PropTypes.func,
  showPackage: PropTypes.bool,
  showPolicy: PropTypes.bool,
  showPricing: PropTypes.bool,
}

export default withTranslation('common')(Navbar)
