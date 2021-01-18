/**
 * @author HanhTD
 * Space slider
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'
import {Row, Col} from 'reactstrap'
import {bindActionCreators} from 'redux'
import {hide, show} from 'redux-modal'
import moment from 'moment'
import Slider from 'react-slick'

import CoworkingFavoriteActions from '../../redux/_coworking-favorite-redux'
import {RightArrow} from '../../icons'
import LoadingItem from '../loading-item'
import DedicatedItem from './dedicated-item'

import { withTranslation } from '../../i18n'
import { SlickSliderSettings } from '../../constants'

class SpaceSlide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [],
      actionOn: {},
      offset: 0,
      limit: '',
      showSeeAll: true,
      showMap: false,
      dragging: false,
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
      windowWidth: window.innerWidth,
    })

    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.spaces !== state.coworkings) {
      return {
        coworkings: props.spaces,
        spaces: props.spaces,
      }
    }

    if (props.showMap !== state.showMap) {
      return {
        showMap: props.showMap
      }
    }
    return null
  }

  componentDidUpdate(prevProps) {
    if (this.props.favorite !== prevProps.favorite) {
      let favorite = this.props.favorite.addFavorite ? this.props.favorite.addFavorite : false
      let { actionOn, spaces } = this.state
      var newSpaces = spaces.map(el => {
        if (el.id === actionOn) {
          return Object.assign({}, el, { is_favorite: favorite })
        }
        return el
      })
      this.setState({
        spaces: newSpaces,
        actionOn: null
      })
    }
  }

  favoriteToggle = item => {
    this.setState({
      actionOn: item.id
    }, () => {
      if (!item.is_favorite) {
        this.props.addFavorite({ space_service_meta_id: item.id })
      }
      else {
        this.props.removeFavorite({space_service_meta_id: item.id })
      }
    })
  }

  render() {
    moment.locale('en')
    const {t, showMoreAs, showLink, showMoreHref} = this.props
    let { spaces, dragging, windowWidth } = this.state
    const settings = SlickSliderSettings.DEDICATED_SPACE_SETTINGS
    const arrLoad = Array.apply(null, Array(5))

    return (
      <div>
        <div className="section__body">
          {(this.props.processing && spaces && spaces.length === 0) ? (
            <div className="content-loader">
              <div className="mt--30" />
                <section>
                  <Row className="skeleton skeleton__slider">
                    {arrLoad.map((val, key) => (
                      <Col xs="6" md="4" lg="3" xl="20" key={key}>
                        <div className="loader" style={{width: '100%'}}>
                          <LoadingItem />
                        </div>
                      </Col>)
                    )}
                  </Row>
                </section>
            </div>
          ) : (
          <div className="space space__slider">
            {windowWidth > 767 && (
              <Slider {...settings}>
                {spaces && spaces.map((item, index) => (
                  <div key={index} style={{ width: 272}}>
                    <DedicatedItem
                      space={item}
                      index={index}
                      dragging={dragging}
                      favoriteToggle={space => this.favoriteToggle(space)}
                      serviceType={this.props.serviceType}
                      windowWidth={windowWidth}
                    />
                  </div>
                ))}
              </Slider>
            )}

            {windowWidth <= 767 && (
              <div className="slider-scroll">
                {spaces && spaces.map((item, index) => (
                  <div key={index} className="service__item--slider" style={{ width: 272, minWidth: `272px`}}>
                    <DedicatedItem
                      space={item}
                      index={index}
                      dragging={dragging}
                      favoriteToggle={space => this.favoriteToggle(space)}
                      windowWidth={windowWidth}
                      serviceType={this.props.serviceType}
                    />
                  </div>
                ))}
              </div>
            )}
            {showLink && (
              <div className="see-more see-more--bottom sp">
                <Link href={showMoreHref} as={showMoreAs}>
                  <a>
                    <span className="mr--6">
                      {t('view-more')}
                    </span>
                    <RightArrow
                      w={10}
                      h={10}
                      fill={'#fbc02d'}
                    />
                  </a>
                </Link>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    )
  }
}

SpaceSlide.propTypes = {
  addFavorite: PropTypes.func,
  hide: PropTypes.func,
  removeFavorite: PropTypes.func,
  show: PropTypes.func,
  t: PropTypes.func,

  className: PropTypes.string,
  coworking: PropTypes.object,
  subTitle: PropTypes.string,
  favorite: PropTypes.object,
  title: PropTypes.string,
  processing: PropTypes.bool,
  processingCoworking: PropTypes.bool,
  profile: PropTypes.object,
  router: PropTypes.object,
  isShowMore: PropTypes.bool,
  isShowDescription: PropTypes.bool,
  showLink: PropTypes.bool,
  showMoreAs: PropTypes.string,
  showMoreHref: PropTypes.string,
  serviceType: PropTypes.number
}

const mapStateToProps = state => ({
  favorite: state.favorite.data,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  addFavorite: data => dispatch(CoworkingFavoriteActions.addFavorite(data)),
  removeFavorite: data => dispatch(CoworkingFavoriteActions.removeFavorite(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(SpaceSlide)))
