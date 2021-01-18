import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import { AppUtils } from '../../utils'
import { LocationIcon } from '../../icons'

function SuggestionResult(props) {
  const { suggestion, districts, serviceType } = props
  return (
    <React.Fragment>
      {suggestion &&
        suggestion.map((val, key) => {
          let href = AppUtils.routerSpaceDetailHref(serviceType, val.id)
          let as = AppUtils.routerSpaceDetailAs(serviceType, val.id)
          return (
            <Link href={href} as={as} key={key}>
              <div className="search-suggestion__item is-flex" key={key}>
                <div className="search-suggestion__item-logo">
                  <img className="search-suggestion__item-logo-spaces" src={val.logo} />
                </div>
                <div className="search-suggestion__item-info">
                  <div className="search-suggestion__item-name">{val.name}</div>
                  <div className="search-suggestion__item-address">{val.district}</div>
                </div>
              </div>
            </Link>
          )
        })}
      {districts &&
        districts.map((val, key) => {
          let href = AppUtils.routerDistrictHref(serviceType, val.id)
          let as = AppUtils.routerDistrictAs(serviceType, val.id)
          return (
            <Link href={href} as={as} key={key}>
              <div className="search-suggestion__item is-flex district" key={key}>
                <div className="search-suggestion__item-logo">
                  <div className="search-suggestion__item-logo-location">
                    <LocationIcon fill="#484848" />
                  </div>
                </div>
                <div className="search-suggestion__item-info d-flex align-items-center">
                  <div className="search-suggestion__item-name normal">{val.name}</div>
                </div>
              </div>
            </Link>
          )
        })}
    </React.Fragment>
  )
}

SuggestionResult.propTypes = {
  suggestion: PropTypes.array,
  districts: PropTypes.array,
  serviceType: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SuggestionResult))
