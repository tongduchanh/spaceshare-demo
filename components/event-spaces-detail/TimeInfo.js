import React from 'react'
import PropTypes from 'prop-types'
import AppUtils from '../../utils/AppUtils'
import { withTranslation } from '../../i18n'

class TimeInfo extends React.Component {
  render () {
    const {isOpen, startTime, endTime, t, date} = this.props
    return (
      <div className="space__hours-item j-space-between">
        <div>{date}</div>
        {isOpen ? (
          <div>
            {AppUtils.time_format(startTime)}
            {` - `}
            {AppUtils.time_format(endTime)}
          </div>
        ) : (
          <div style={{color: 'red', marginLeft: '10px'}}>{t('close-door')}</div>
        )}
      </div>
    )
  }
}

TimeInfo.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  date: PropTypes.string,
  isOpen: PropTypes.bool,
  t:  PropTypes.func,
}

export default withTranslation('common')(TimeInfo)
