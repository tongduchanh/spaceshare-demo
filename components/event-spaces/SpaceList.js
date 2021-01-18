/**
 * @author HanhTD
 * SpaceList
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter} from 'next/router'
import Link from 'next/link'
import { Card, CardBody, CardImg, CardTitle, Col, Row, Container} from 'reactstrap'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'
import moment from 'moment'

import LoadingBar from '../LoadingBar'
import LoadingItem from '../loading-item'
import { withTranslation } from '../../i18n'
import ImageLoader from '../content-loader/image-loader'
import ReactLazyLoad from '../LazyLoad'

const dummy = '/static/images/dummy.png'

class SpaceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [],
      spaceList: [],
      windowWidth: 0
    }
  }

  setWidth = () => {
    this.setState({
      windowWidth: window.innerWidth
    })
  }

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth
    })
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.spaces !== state.spaces) {
      return {
        coworkings: props.coworkings,
        spaces: props.spaces,
      }
    }

    return null
  }

  render() {
    moment.locale('en')
    const { spaces } = this.state
    let { t } = this.props
    const arrLoad = Array.apply(null, Array(10))
    
    return (
      <div className="section">
        {this.props.processing && <LoadingBar />}
        <div className="space space__slider">
          <Container>
            <div className="section-title mt--24 mb--24">
              <h3>{this.props.t('party-space')}</h3>
            </div>
              <React.Fragment>
                {this.props.processing ? (
                  <Row>
                    {arrLoad.map((val, key) => (
                      <Col xs="6" md="4" lg="3" xl="20" key={key}>
                        <div className="loader" style={{width: '100%'}}>
                          <LoadingItem />
                        </div>
                      </Col>)
                    )}
                  </Row>
                ) : (
                  <Row>
                    {spaces && spaces.map((item, index) => (
                      <Col xs="6" md="4" lg="3" xl="20" key={index}>
                        <Card className="space__item">
                          <Link href={`/party-detail?id=${item.id}`} as={`/party/${item.id}`}>
                            <a className="space__img">
                              <ReactLazyLoad
                                placeholder={<ImageLoader />}
                                offset={200}
                              >
                                <CardImg className="fade-in" alt={`space-${index}`} top src={item.thumbnail || dummy} />
                              </ReactLazyLoad>
                            </a>
                          </Link>
                          <CardBody className="space__info">
                            <div className="space__type">
                              {t('party-space')}
                            </div>
                            <Link href={`/party-detail?id=${item.id}`} as={`/party/${item.id}`}>
                              <a>
                                <CardTitle title={item.name} className="space__name has-right-icon" >
                                  <h5>{item.name}</h5>
                                </CardTitle>
                              </a>
                            </Link>

                            <p className="space__address">
                              <span>
                                {item.shortened_address}
                              </span>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                    {!this.props.processing && spaces && spaces.length == 0 && (
                      <Col xs="12" className="text-center no-data-find">{this.props.t('no-data-space-find')}</Col>
                    )}
                  </Row>
                )}
              </React.Fragment>
          </Container>
        </div>
      </div>
    )
  }
}

SpaceList.propTypes = {
  getSpaceList: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  t: PropTypes.func,

  space: PropTypes.object,
  profile: PropTypes.object,
  processing: PropTypes.bool,
  screen: PropTypes.string,
  spaces: PropTypes.array,
  activityType: PropTypes.array,
  router: PropTypes.object,
  params: PropTypes.object,
  currentLanguage: PropTypes.string
}

const mapStateToProps = state => ({
  processing: state.space.processing,
  space: state.space.data
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(SpaceList)))
