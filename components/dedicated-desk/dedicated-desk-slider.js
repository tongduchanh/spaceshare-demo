/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'
import moment from 'moment'
import Slider from 'react-slick'

import { withTranslation } from '../../i18n'

import { SlickSliderSettings } from '../../constants'
import DedicatedItem from './dedicated-item'

class DedicatedDeskList extends React.Component {
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
    const { spaces, windowWidth} = this.state
    const {t} = this.props
    const settings = SlickSliderSettings.DEDICATED_SPACE_SETTINGS
    return (
      <div>
        <div className="section__body">
          <div className="space space__slider">
            {windowWidth > 767 && (
              <Slider {...settings}>
                {spaces && spaces.length > 0 && spaces.map((item, index) => (
                  <div key={index} style={{ width: `272px` }}>
                    <DedicatedItem space={item} />
                  </div>
                ))}
              </Slider>
            )}
            {windowWidth <= 767 && (
              <div className="slider-scroll">
                {spaces && spaces.length > 0 && spaces.map((item, index) => (
                  <div key={index} className="service__item--slider" style={{ width: 272, minWidth: `272px`}}>
                    <DedicatedItem space={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

DedicatedDeskList.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  dedicatedDeskList: PropTypes.func,
  t: PropTypes.func,

  profile: PropTypes.object,
  data: PropTypes.object,
  history: PropTypes.object,
  screen: PropTypes.string,
  processing: PropTypes.bool,
}

const mapStateToProps = state => ({
  processing: state.dedicatedDesk.processing,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(DedicatedDeskList)))
