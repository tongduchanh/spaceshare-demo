import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import classnames from 'classnames'

import ProfileActions from '../../redux/_profile-redux'
import { i18n, withTranslation } from '../../i18n'
import { ProfileIcon, FavoriteIcon, BookingIcon, PackageIcon, LogoutIcon } from '../../icons'

class DrawerMenu extends React.Component {
  componentDidUpdate(preProps) {
    if (this.props.profile !== preProps.profile) {
      if (this.props.profile.logout) {
        // location.reload()
      }
    }
  }

  handleLogout = () => {
    this.props.logoutRequest()
    this.props.onClick()
  }

  setLang = (lang) => {
    if (lang === this.props.currentLanguage) {
      return
    }
    i18n.changeLanguage(lang)
    location.reload()
  }

  render() {
    const { t, currentLanguage } = this.props
    const profile = this.props.profile && this.props.profile.data
    return (
      <React.Fragment>
        <ul className="drawer__list mt--12">
          <li>
            <Link href="/">
              <a onClick={this.props.onClick}>{t('home')}</a>
            </Link>
          </li>
          {/*<li>*/}
          {/*  <Link href="/package">*/}
          {/*    <a onClick={this.props.onClick}>{t('nav-service')}</a>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          <li>
            <Link href="/hot-desk">
              <a onClick={this.props.onClick}>{t('package-office')}</a>
            </Link>
          </li>
          <li>
            <Link href="/event-spaces">
              <a onClick={this.props.onClick}>{t('event-space')}</a>
            </Link>
          </li>
          <li>
            <Link href="/coworking">
              <a onClick={this.props.onClick}>Coworking Space</a>
            </Link>
          </li>
          <li>
            <Link href="/hot-desk">
              <a onClick={this.props.onClick}>Chỗ ngồi cá nhân</a>
            </Link>
          </li>
          <hr className="drawer__list-hr" />
          <li>
            <Link href="/host">
              <a onClick={this.props.onClick}>Trở thành đối tác</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a onClick={this.props.onClick}>Về chúng tôi</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a onClick={this.props.onClick}>Tin tức và Ưu đãi</a>
            </Link>
          </li>
          <hr className="drawer__list-hr" />
          {profile ? (
            <React.Fragment>
              <li>
                <Link href="/profile">
                  <a onClick={this.props.onClick} className="j-space-between">
                    <div>{t('profile-config')}</div>
                    <div>
                      <ProfileIcon className="icon-24" />
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-favorite">
                  <a onClick={this.props.onClick} className="j-space-between">
                    <div>{t('profile-favorite')}</div>
                    <div>
                      <FavoriteIcon className="icon-24" />
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-booking">
                  <a onClick={this.props.onClick} className="j-space-between">
                    <div>{t('profile-my-booking')}</div>
                    <div>
                      <BookingIcon className="icon-24" />
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-service">
                  <a onClick={this.props.onClick} className="j-space-between">
                    <div>{t('profile-nav-my-service')}</div>
                    <div>
                      <PackageIcon className="icon-24" />
                    </div>
                  </a>
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link href="/register">
                  <a onClick={this.props.onClick}>{t('sign-up')}</a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a onClick={this.props.onClick}>{t('sign-in')}</a>
                </Link>
              </li>
            </React.Fragment>
          )}

          <hr className="drawer__list-hr" />
          <li>
            <a className="list-parent">{t('language')}</a>
          </li>
          <li>
            <a
              onClick={() => this.setLang('vi')}
              className={classnames({ language__active: currentLanguage === 'vi' })}
            >
              {t('vi')}
            </a>
          </li>
          <li>
            <a
              onClick={() => this.setLang('eng')}
              className={classnames({ language__active: currentLanguage === 'eng' })}
            >
              {t('eng')}
            </a>
          </li>
          <hr className="drawer__list-hr" />
          {profile && (
            <li>
              <a onClick={this.handleLogout} className="j-space-between">
                <div>{t('sign-out')}</div>
                <div>
                  <LogoutIcon className="icon-24" />
                </div>
              </a>
            </li>
          )}
        </ul>
      </React.Fragment>
    )
  }
}

DrawerMenu.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func,
  logoutRequest: PropTypes.func,
  currentLanguage: PropTypes.string,

  profile: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: (data) => dispatch(ProfileActions.logoutRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(DrawerMenu))
