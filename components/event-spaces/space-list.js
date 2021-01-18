/**
 * @author HanhTD
 * Space list
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import {Row, Col} from 'reactstrap'
import {bindActionCreators} from 'redux'
import {hide, show} from 'redux-modal'
import moment from 'moment'
import dynamic from 'next/dynamic'
import classnames from 'classnames'

import CoworkingFavoriteActions from '../../redux/_coworking-favorite-redux'
import FlexibleActions from '../../redux/_flexible-desk-redux'

import SpaceItem from './space-item'
import LoadingItem from '../loading-item'
import PaginationComponent from '../PaginationComponent'

import { withTranslation } from '../../i18n'
import {DefaultValue} from '../../constants'
import {AppUtils} from '../../utils'

const Map = dynamic(
  () => import('../map'),
  { ssr: false }
)

class SpaceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [],
      actionOn: {},
      offset: 0,
      limit: DefaultValue.LIMIT_LIST,
      showSeeAll: true,
      showMap: false,
      hasMore: true
    }
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
      if (!item.is_favorite)
        this.props.addFavorite({ space_service_meta_id: item.id })
      else
        this.props.removeFavorite({space_service_meta_id: item.id})
    })
  }

  render() {
    moment.locale('en')
    const {t, total, isShowAll, serviceType} = this.props
    let { spaces, showMap } = this.state
    const arrLoad = Array.apply(null, Array(10))
    return (
      <div>
        <div className="section__body">
          <div className="space">
            {(this.props.processing && spaces && spaces.length === 0) || (this.props.processing && this.props.isSearch) ? (
              <div className="content-loader">
                <section>
                  <Row className="skeleton skeleton__list">
                      {arrLoad.map((val, key) => (
                        <Col xs="6" md="4" lg="3" xl="20" key={key} className="skeleton__item">
                          <div className="loader" style={{width: '100%'}}>
                            <LoadingItem />
                          </div>
                        </Col>)
                      )}
                  </Row>
                </section>
              </div>
            ) : (
              <React.Fragment>
                {showMap ? (
                  <Row>
                    <Col md="12" lg="7">
                      {spaces && spaces.map((item, index) => (
                        <SpaceItem
                          key={index}
                          space={item}
                          index={index}
                          favoriteToggle={space => this.favoriteToggle(space)}
                          mapView
                          serviceType={this.props.serviceType}
                        />
                      ))}
                    </Col>
                    <Col md="5">
                      <Map />
                    </Col>
                  </Row>
                )
                  : (
                      <Row>
                        {spaces && spaces.map((item, index) => (
                          <Col xs="12" md="4" lg="3" xl="20" key={index} 
                            className={classnames({'space-display': isShowAll})}
                          >
                            <SpaceItem
                              space={item}
                              index={index}
                              favoriteToggle={space => this.favoriteToggle(space)}
                              serviceType={serviceType}
                            />
                          </Col>
                        ))}
                      </Row>
                  )}
                  <Col md="12">
                    <PaginationComponent
                      count={total}
                      asUrl={AppUtils.routerSpaceSearhAs(serviceType)}
                      perPage={DefaultValue.LIMIT_LIST}
                    />
                  </Col>
                  {spaces && spaces.length == 0 && !this.props.processing && (
                    <Col xs="12" className="text-center no-data-find">{t('no-data-find')}</Col>
                  )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}

SpaceList.propTypes = {
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  t: PropTypes.func,
  getFlexibleDeskList: PropTypes.func,

  coworking: PropTypes.object,
  profile: PropTypes.object,
  router: PropTypes.object,
  favorite: PropTypes.object,
  processing: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  total: PropTypes.number,
  isShowAll: PropTypes.bool,
  isSearch: PropTypes.bool,
  showMoreAs: PropTypes.string,
  showMoreHref: PropTypes.string,
  serviceType: PropTypes.number,
  count: PropTypes.number
}

const mapStateToProps = state => ({
  favorite: state.favorite.data,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  addFavorite: data => dispatch(CoworkingFavoriteActions.addFavorite(data)),
  removeFavorite: data => dispatch(CoworkingFavoriteActions.removeFavorite(data)),
  getFlexibleDeskList: (data, cookies) => dispatch(FlexibleActions.getFlexibleDeskList(data, cookies)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(SpaceList)))
