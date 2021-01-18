import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'reactstrap'
import classnames from 'classnames'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import { SpaceServiceType } from '../../constants'
import SearchActions from '../../redux/_search-redux'
import { withTranslation } from '../../i18n'

function SearchType(props) {
  const { service_type, t } = props
  const handleSelectType = (type) => {
    props.setServiceType(type)
  }
  return (
    <div className="search-type">
      <Nav className="align-items-center">
        <NavItem
          onClick={() => handleSelectType(SpaceServiceType.FLEXIBLE_DESK)}
          className={classnames({
            active: service_type === SpaceServiceType.FLEXIBLE_DESK,
          })}
        >
          Coworking Space
        </NavItem>

        <NavItem
          onClick={() => handleSelectType(SpaceServiceType.OFFICE_SPACE)}
          className={classnames({
            active: service_type === SpaceServiceType.OFFICE_SPACE,
          })}
        >
          {t('package-office')}
        </NavItem>

        <NavItem
          onClick={() => handleSelectType(SpaceServiceType.DEDICATED_SPACE)}
          className={classnames({
            active: service_type === SpaceServiceType.DEDICATED_SPACE,
          })}
        >
          <span className="pc">{t('event-space')}</span>
          <span className="sp">Tổ chức sự kiện</span>
          
        </NavItem>
      </Nav>
    </div>
  )
}

SearchType.propTypes = {
  setServiceType: PropTypes.func,
  t: PropTypes.func,
  service_type: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    service_type: state.search.service_type,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setServiceType: (data) => dispatch(SearchActions.setServiceType(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(SearchType)))
