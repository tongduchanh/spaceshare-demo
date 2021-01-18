/**
 * @author HanhTD
 * Footer component
 */

import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { withTranslation } from '../../i18n'
import PropTypes from 'prop-types'
import Link from 'next/link'

const facebook = '/static/images/facebook.svg'
const instagram = '/static/images/instagram.svg'
const logo = '/static/images/layouts/logo.png'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadDone: false,
    }
  }

  componentDidMount() {
    setTimeout(function () {
      if (window.FB) window.FB.XFBML.parse()
    }, 0)

    window.addEventListener(
      'load',
      function () {
        this.setState({ loadDone: true })
      }.bind(this),
    )
  }

  changeRoute(e, path) {
    e.preventDefault()
    this.props.router.push(path).then(() => window.scrollTo(0, 0))
  }

  render() {
    const { t } = this.props
    return (
      <footer>
        <Container className="container-content">
          <div className="footer">
            <div className="footer--top mb--30">
              <Row>
                <Col xs="12" md="6">
                  <div className="image-container">
                    <img alt="logo-footer" className="logo" src={logo} />
                    <div className="logo-info align-item-center">
                      <div>
                        <div className="logo-text">{t('spaceshare')}</div>
                        <div className="slogan-text">{t('slogan')}</div>
                      </div>
                    </div>
                  </div>
                  <p>
                    SpaceShare - Nền tảng đặt chỗ trực tuyến không gian làm
                    việc, tổ chức sự kiện, phòng họp, phòng đào tạo,...Nhanh
                    chóng - Linh hoạt - Tiết kiệm.
                  </p>
                </Col>
                <Col xs="12" md="6">
                  <div
                    className="fb-page"
                    data-href="https://www.facebook.com/spaceshare.vn/"
                    data-width="380"
                    data-hide-cover="false"
                    data-show-facepile="true"
                  />
                </Col>
                <Col xs="12" className="sp footer__item">
                  <h3 className="footer__item-title">
                    Tải ứng dụng SpaceShare
                  </h3>
                  <div className="mb--12">
                    <a href="https://spaceshare.page.link/home">
                      <img src="/static/images/apple-store.svg" />
                    </a>
                  </div>
                  <div>
                    <a href="https://spaceshare.page.link/home">
                      <img src="/static/images/google-play.svg" />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="footer--middle mb--30">
              <Row>
                <Col xs="6" md="3">
                  <div className="footer__item">
                    <h3 className="footer__item-title">{t('support-lbl')}</h3>
                    <ul className="footer__item-menu">
                      <li>
                        <a
                          href="/blog"
                          onClick={(event) => this.changeRoute(event, '/blog')}
                        >
                          {t('news-and-offers')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about"
                          onClick={(event) => this.changeRoute(event, '/about')}
                        >
                          {t('nav-about')}
                        </a>
                      </li>
                      <li>
                        <a
                          href="/FAQ"
                          onClick={(event) => this.changeRoute(event, '/FAQ')}
                        >
                          {t('nav-guide')}
                        </a>
                      </li>
                      <li>
                        {this.props.profile && this.props.profile.data ? (
                          <a
                            href="/profile"
                            onClick={(event) =>
                              this.changeRoute(event, '/profile')
                            }
                          >
                            {t('nav-profile-info')}
                          </a>
                        ) : (
                          <a
                            href="/login"
                            onClick={(event) =>
                              this.changeRoute(event, '/login')
                            }
                          >
                            {t('sign-in')}
                          </a>
                        )}
                      </li>
                      <li>
                        <a
                          href="/host"
                          onClick={(event) => this.changeRoute(event, '/host')}
                        >
                          {t('become-partner')}
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col xs="6" md="3">
                  <div className="footer__item">
                    <h3 className="footer__item-title">{t('discover')}</h3>
                    <ul className="footer__item-menu">
                      <li>
                        <Link href="/coworking">
                          <a>Coworking Space</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/hot-desk">
                          <a>{t('work-space')}</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/event-spaces">
                          <a>{t('event')}</a>
                        </Link>
                      </li>
                      {/*<li>*/}
                      {/*  <Link href="/package">*/}
                      {/*    <a>{t('spaceshare-package')}</a>*/}
                      {/*  </Link>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </Col>

                <Col xs="12" md="3">
                  <div className="footer__item">
                    <h3 className="footer__item-title">{t('about-us')}</h3>
                    <ul className="footer__item-menu">
                      <li>
                        <a href="mailto:info@spaceshare.vn">
                          {t('spaceshare-email')}
                        </a>
                      </li>
                      <li>
                        <a href="tel:0975 970 286">
                          Hotline Không gian làm việc cá nhân/ Gói Spaceshare:
                          0975 970 286
                        </a>
                      </li>
                      <li>
                        <a href="tel:0902 945 286">{t('copy-right-2')}</a>
                      </li>
                      <li>
                        <Link href="/policy">
                          <a>{t('terms')}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col xs="12" md="3" className="flex-column">
                  <div className="footer__item mb--24">
                    <h3 className="footer__item-title">{t('follow-us')}</h3>
                    <div className="social-network">
                      <span>
                        <a
                          href="https://www.facebook.com/spaceshare.vn/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img alt="facebook" src={facebook} />
                        </a>
                      </span>
                      <span>
                        <a
                          href="https://www.instagram.com/spaceshare.vn/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img alt="instagram" src={instagram} />
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="footer__item pc">
                    <h3 className="footer__item-title">
                      Tải ứng dụng SpaceShare
                    </h3>
                    <div className="mb--12">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://apps.apple.com/us/app/spaceshare/id1461454549"
                      >
                        <img src="/static/images/apple-store.svg" />
                      </a>
                    </div>
                    <div className="mb--12">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://play.google.com/store/apps/details?id=vn.spaceshare.coworkingspace"
                      >
                        <img src="/static/images/google-play.svg" />
                      </a>
                    </div>
                  </div>
                </Col>
                <Col xs="12" md={{ size: 3, offset: 6 }}>
                  <div className="footer__item">
                    <h3 className="footer__item-title">
                      Certification
                    </h3>
                    <div>
                      <a
                        href="//www.dmca.com/Protection/Status.aspx?ID=25a79181-d559-429a-a8e8-8b40eeeef0f4"
                        title="DMCA.com Protection Status"
                        className="dmca-badge"
                      >
                        {' '}
                        <img
                          src="https://images.dmca.com/Badges/DMCA_logo-grn-btn150w.png?ID=25a79181-d559-429a-a8e8-8b40eeeef0f4"
                          alt="DMCA.com Protection Status"
                        />
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <div className="footer--bottom">
          <Container>
            <div className="footer__copy">{t('copy-right')}</div>
          </Container>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  router: PropTypes.object,
  profile: PropTypes.object,
  t: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data,
  }
}
const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(Footer)))
