import React from 'react'
import PropTypes from 'prop-types'
import AppUtils from '../../utils/AppUtils'
import { withTranslation } from '../../i18n'

class ListTimeItem extends React.Component {
  render () {
    const { t } = this.props
    return (
      <React.Fragment>
        <span className="date">
          {this.props.date}
        </span>
        <span className="time pull-right">
          {this.props.isOpen ? (
            <span>
              {AppUtils.time_format(this.props.startTime)}
              {` - `}
              {AppUtils.time_format(this.props.endTime)}
            </span>
          ) : (
            <span style={{color: 'red'}}>{t('close-door')}</span>
          )}
        </span>
        <div className="clearfix" />
      </React.Fragment>
    )
  }
}

ListTimeItem.propTypes = {
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  isOpen: PropTypes.bool,
  t: PropTypes.func,
}

export default withTranslation('common')(ListTimeItem)
