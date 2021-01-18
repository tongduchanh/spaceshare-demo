import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Button, DropdownMenu, DropdownToggle, NavItem, UncontrolledDropdown } from 'reactstrap'

import { withTranslation } from '../../i18n'

const profileImage = '/static/images/man-user.svg'

function HeaderProfile(props) {
  const { windowWidth, t, profile, handleLogout, unreadNotification } = props
  return (
    <NavItem className="header__item-link">
      <UncontrolledDropdown setActiveFromChild>

        <DropdownToggle tag="button" className="menu__profile" caret>
          <span className="profile__avatar">
            {
              (!profile?.is_complete_profile || !!unreadNotification) &&
              <span
                className="warning-update-user"
              />
            }
            <img src={profile.profile_image || profileImage} />
          </span>
          <span className="profile__name">{profile.full_name}</span>
        </DropdownToggle>

        <DropdownMenu className="header-menu">
          <ul className="header-menu__list">
            <li className="header-menu__group">
              <div className="header-menu__group-header">Tài khoản của bạn</div>
              <ul className="header-menu__subgroup">
                <li className="header-menu__item">
                  <Link href="/account">
                    <a className="header-menu__link">SpaceShare Point</a>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/share">
                    <a className="header-menu__link">Chia sẻ nhận quà</a>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/my-booking">
                    <a className="header-menu__link">{t('profile-my-booking')}</a>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/my-service">
                    <a className="header-menu__link">{t('profile-nav-my-service')}</a>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/profile">
                    <div className="header-menu__link d-flex justify-content-between header__item-pointer">
                      <span>Thông tin cá nhân</span>

                      {
                        !profile?.is_complete_profile &&
                        <span className="bg-danger warning-update-user-dropdown">
                          <i
                            className="
                              text-white
                              fas fa-exclamation
                            "
                          />
                        </span>
                      }
                    </div>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/notification">
                    <div className="header-menu__link d-flex justify-content-between header__item-pointer">
                      <span>Thông báo</span>
                      { !!unreadNotification &&
                      <span className="bg-danger font-weight-bold text-sm text-white d-flex align-items-center justify-content-center warning-update-user-dropdown px-1">
                        {unreadNotification > 99 ? '99+' : unreadNotification}
                      </span>}
                    </div>
                  </Link>
                </li>
                <li className="header-menu__item">
                  <Link href="/my-favorite">
                    <a className="header-menu__link">{t('profile-favorite')}</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="header-menu__item header-menu__item--outside">
              <Button color="primary w-100" onClick={handleLogout} outline>{t('sign-out')}</Button>
            </li>
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

HeaderProfile.propTypes = {
  windowWidth: PropTypes.number,
  isHeaderTop: PropTypes.bool,
  t: PropTypes.func,
  handleLogout: PropTypes.func,
  profile: PropTypes.object,
  unreadNotification: PropTypes.object,
}

export default withTranslation('common')(HeaderProfile)
