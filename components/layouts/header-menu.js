import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Button, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'

import { withTranslation } from '../../i18n'

function HeaderMenu(props) {
  const { windowWidth, isHeaderTop, t } = props
  return (
    <NavItem className="header__item-link">
      <UncontrolledDropdown setActiveFromChild>
        <DropdownToggle tag="a" className="nav-link d-flex">
          {isHeaderTop ? (
            <img src="/static/images/icons/menu-white.svg" width="20" />
          ) : (
            <img src="/static/images/icons/menu.svg" width="20" />
          )}
        </DropdownToggle>
        <DropdownMenu className="header-menu">
          <ul className="header-menu__list">
            {windowWidth < 1100 && (
              <li className="header-menu__group">
                <div className="header-menu__group-header">{t('sign-in')}</div>
                <ul className="header-menu__subgroup">
                  <li className="header-menu__item">
                    <Link href="/login">
                      <Button color="primary w-100" outline>
                        {t('sign-in')}
                      </Button>
                    </Link>
                  </li>
                  <li className="header-menu__item">
                    <Link href="/register">
                      <Button color="primary w-100">{t('sign-up')}</Button>
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {windowWidth < 1200 && (
              <li className="header-menu__group">
                <div className="header-menu__group-header">Trở thành đối tác của Spaceshare</div>
                <ul className="header-menu__subgroup">
                  <li className="header-menu__item">
                    <Link href="/host">
                      <Button color="custom" className="btn-main btn-partner px-2 w-100">
                        {t('become-partner')}
                      </Button>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    </NavItem>
  )
}

HeaderMenu.propTypes = {
  windowWidth: PropTypes.number,
  isHeaderTop: PropTypes.bool,
  t: PropTypes.func,
}

export default withTranslation('common')(HeaderMenu)
