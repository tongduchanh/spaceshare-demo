/**
 * @author HanhTD
 * Header component
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import classnames from 'classnames'
import { hide, show } from 'redux-modal'
import { bindActionCreators } from 'redux'
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import ProfileActions from '../../redux/_profile-redux'
import { withTranslation } from '../../i18n'
import { SpaceServiceType } from '../../constants'
import HeaderMobile from './header-mobile'

import SearchActions from '../../redux/_search-redux'
import DialogSearch from './dialog-search'
import HeaderMenu from './header-menu'
import HeaderProfile from './header-profile'
import NotificationActions from '@/redux/_notification-redux'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      isOpen: false,
      isToggle: false,
      dropdownOpen: false,
      route: null,
      user: {},
      toogleMenu: false,
      suggestion: [],
      districts: [],
      search: '',
      open: false,
      searchOpen: false,
    }
  }

  scrollFunction = () => {
    let smartBanner = document.getElementById('smart-banner')
    if (smartBanner) {
      let smartBannerHeight = document.getElementById('smart-banner')
        .clientHeight
      let scrollTop = pageYOffset
      if (scrollTop > smartBannerHeight) {
        this.setState({
          fixed: true,
        })
      } else {
        this.setState({
          fixed: false,
        })
      }
    }
    this.setState({
      scrollHeight: pageYOffset,
    })
  }

  componentDidMount() {
    const route = this.props.router.pathname
    this.setState({
      route: route,
    })
    this.setState({
      scrollHeight: pageYOffset,
    })

    window.addEventListener('scroll', this.scrollFunction)

    const pathname = this.props.router.pathname
    if (pathname.indexOf('/coworking') >= 0) {
      this.setState({
        space_service_type: SpaceServiceType.FLEXIBLE_DESK,
      })
    } else if (pathname.indexOf('/hot-desk') >= 0) {
      this.setState({
        space_service_type: SpaceServiceType.HOT_DESK,
      })
    } else {
      this.setState({
        space_service_type: SpaceServiceType.DEDICATED_SPACE,
      })
    }

    this.setState({
      windowWidth: window.innerWidth,
    })
    window.addEventListener('resize', this.setWidth)

    if(this.props.profile?.data) {
      this.props.getUnreadNotificationCount();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFunction)
    window.removeEventListener('resize', this.setWidth)
    document.body.classList.remove('body-overflow-hidden')
    document.body.classList.remove('drawer-open')
  }

  componentDidUpdate(prevProps){
    if(this.props.profile !== prevProps.profile) {
      if(this.props.profile?.data) {
        this.props.getUnreadNotificationCount();
      }
    }
  }

  setWidth = () => {
    this.setState({
      windowWidth: window.innerWidth,
    })
  }

  changeRoute = (e, href, as) => {
    e.preventDefault()
    this.setState(
      {
        href,
        isOpen: false,
        isToggle: false,
      },
      () => {
        Router.push(href, as).then(() => window.scrollTo(0, 0))
      },
    )
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }

  toggleTooltip = (bool) => {
    this.setState({
      isToggle: bool,
    })
  }

  toggleSearch = () => {
    this.props.setDialogSearchOpen(!this.props.dialogSearchOpen, () => {
      if (this.props.dialogSearchOpen) {
        document.body.classList.add('body-overflow-hidden')
      } else {
        document.body.classList.remove('body-overflow-hidden')
      }
    })
  }

  closeSearch = () => {
    this.props.setDialogSearchOpen(false, () =>
      document.body.classList.remove('body-overflow-hidden'),
    )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleLogout = () => {
    this.props.logoutRequest()
  }

  toggleMenu = (value) => {
    this.setState(
      {
        toogleMenu: value,
      },
      () => {
        if (this.state.toogleMenu) {
          document.body.classList.add('overflow-hidden')
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      },
    )
  }

  onDrawerClose = () => {
    this.setState({ open: false })
    document.body.classList.remove('drawer-open')
  }

  handleLogout = () => {
    this.props.logoutRequest()
  }

  isHeaderTop = () => {
    if (
      this.state.scrollHeight === 0 &&
      (this.props.router.pathname === '/' ||
        this.props.router.pathname === '/host')
    )
      return true
    else return false
  }

  render() {
    const { scrollHeight, windowWidth } = this.state
    const { t, dialogSearchOpen } = this.props
    const profile = this.props.profile && this.props.profile.data
    const unreadNotification = this.props.notificationReducer?.countData?.data?.total_message

    return (
      <React.Fragment>
        <div className={classnames({
            'header-wrapper':
              this.props.router.pathname !== '/' &&
              this.props.router.pathname !== '/host',
          })}>
          <HeaderMobile currentLanguage={this.props.currentLanguage} />
          <div className="header--large">
            <header
              id="header"
              className={classnames('', {
                header__top: scrollHeight === 0,
                header__regular:
                  scrollHeight > 0 ||
                  (this.props.router.pathname !== '/' &&
                    this.props.router.pathname !== '/host'),
                header__home:
                  this.props.router.pathname === '/' ||
                  this.props.router.pathname === '/host',
                header__page:
                  this.props.router.pathname !== '/' &&
                  this.props.router.pathname !== '/host',
              })}
            >
              <div className="header__item header--left">
                <Link href="/">
                  <a className="header__logo align-item-center header__item-link">
                    <img
                      alt="logo"
                      className="logo"
                      src="/static/images/logo.svg"
                    />
                    <div className="logo-info align-item-center">
                      <div>
                        <div className="logo-text">{t('spaceshare')}</div>
                        <div className="slogan-text">{t('slogan')}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>

              <div className="header__item header--middle pc">
                <Nav className="header__item-menu align-items-center">
                  <NavItem>
                    <Link href="/event-spaces">
                      <a className="nav-link">Tổ chức sự kiện</a>
                    </Link>
                  </NavItem>
                </Nav>
              </div>

              <div className="header__item header--right pc">
                <Nav className="header__item-menu align-items-center">
                  <NavItem className="header__item-link">
                    <NavLink onClick={this.toggleSearch}>
                      {this.isHeaderTop() ? (
                        <img src="/static/images/search-white.svg" width="18" />
                      ) : (
                        <img src="/static/images/search-black.svg" width="18" />
                      )}
                    </NavLink>
                  </NavItem>
                  {windowWidth > 1200 && (
                    <NavItem className="header__item-link">
                      <Link href="/host">
                        <Button
                          color="custom"
                          className="btn-main btn-partner px-2"
                        >
                          {t('become-partner')}
                        </Button>
                      </Link>
                    </NavItem>
                  )}
                  {profile ? (
                    <HeaderProfile
                      windowWidth={windowWidth}
                      isHeaderTop={this.isHeaderTop()}
                      profile={profile}
                      unreadNotification={unreadNotification}
                      handleLogout={this.handleLogout}
                    />
                  ) : (
                    <React.Fragment>
                      {windowWidth >= 1100 && (
                        <React.Fragment>
                          <NavItem>
                            <Link href="/register">
                              <a className="nav-link">{t('sign-up')}</a>
                            </Link>
                          </NavItem>
                          <NavItem className="pc">
                            <Link href="/login">
                              <a className="nav-link">{t('sign-in')}</a>
                            </Link>
                          </NavItem>
                        </React.Fragment>
                      )}
                      {windowWidth < 1200 && (
                        <HeaderMenu
                          windowWidth={windowWidth}
                          isHeaderTop={this.isHeaderTop()}
                        />
                      )}
                    </React.Fragment>
                  )}
                </Nav>
              </div>
            </header>
          </div>
          {dialogSearchOpen && (
            <React.Fragment>
              <DialogSearch close={this.closeSearch} />
            </React.Fragment>
          )}
        </div>
        {/* <div
          className={classnames('pc', {
            'header-wrapper':
              this.props.router.pathname !== '/' &&
              this.props.router.pathname !== '/host',
          })}
        >
          
        </div> */}
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  t: PropTypes.func,
  logoutRequest: PropTypes.func,
  profileRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  spaceType: PropTypes.object,
  suggestion: PropTypes.object,
  suggestionRequest: PropTypes.func,
  setDialogSearchOpen: PropTypes.func,
  notificationReducer: PropTypes.object,
  getUnreadNotificationCount: PropTypes.func,

  router: PropTypes.object,
  profile: PropTypes.object,
  dialogSearchOpen: PropTypes.bool,
  currentLanguage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    suggestion: state.search.data,
    spaceType: state.spaceType.data,
    processing: state.profile.processing,
    profile: state.profile.data,
    dialogSearchOpen: state.search.dialogSearchOpen,
    notificationReducer: state.notification
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  profileRequest: (data) => dispatch(ProfileActions.profileRequest(data)),
  logoutRequest: (data) => dispatch(ProfileActions.logoutRequest(data)),
  suggestionRequest: (data) => dispatch(SearchActions.suggestionRequest(data)),
  setDialogSearchOpen: (data) =>
    dispatch(SearchActions.setDialogSearchOpen(data)),
  getUnreadNotificationCount: () => dispatch(NotificationActions.getUnreadNotificationCount())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(Header)))
