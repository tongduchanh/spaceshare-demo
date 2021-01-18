import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap'
import Link from 'next/link'

import { withTranslation } from '../i18n'
import Layout from '../components/layouts/layout'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { 
        namespacesRequired: ['common'],
        statusCode,
    }
  }

  render() {
    const {t} = this.props
    return (
      <Layout {...this.props}>
        <section className="page_404">
          <Container>
            <Row>
              <Col md="12">
                <div className="content text-center">
                  <div className="four_zero_four_bg">
                    <h1>{t('404-title')}</h1>
                  </div>
                  <div className="contant_box_404">
                    <h3>{t('404-sub-title')}</h3>
                    <p>{t('404-content')}</p>
                    <Link href="/">
                      <a className="link_404">
                        {t('404-go-home')}
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    )
  }
}

Error.defaultProps = {
    statusCode: null,
}

Error.propTypes = {
    statusCode: PropTypes.number,
    t: PropTypes.func
}

export default (withTranslation('common')(Error))
