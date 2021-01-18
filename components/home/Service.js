import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap'
import Link from 'next/link'
import { withTranslation } from '../../i18n'

class Service extends React.Component {
  render () {
    const {t} = this.props
    return (
      <div className="section">
        <Container className="servive-ss">
          <div className="section-title">
            <h3>{t('service-ss-title')}</h3>
          </div>
          <Row>
            <Col xs="12" md="4">
              <Link href={`/coworking`}>
                <a className="service-item">
                  <img src="/static/images/layouts/service-1.jpg" />
                  <div className="service-text">
                    {t('flexible-desk')}
                  </div>
                </a>
              </Link>
            </Col>
            <Col xs="12" md="4">
              <Link href="/hot-desk">
                <a className="service-item">
                  <img src="/static/images/layouts/service-2.jpg" />
                  <div className="service-text">
                    {t('dedicated-desk')}
                  </div>
                </a>
              </Link>
            </Col>
            <Col xs="12" md="4">
              <Link href="/event">
                <a className="service-item">
                  <img src="/static/images/layouts/service-3.jpg" />
                  <div className="service-text">
                    {t('event-space')}
                  </div>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Service.propTypes = {
  t: PropTypes.func
}
export default withTranslation('common')(Service)
