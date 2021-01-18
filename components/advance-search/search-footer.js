import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import classnames from 'classnames'

import { withTranslation } from '../../i18n'

function SearchFooter({
  search,
  t,
  disabledClearButton,
  clear,
  windowWidth
}) {
  return (
    <div className="search__footer">
      <div className="btn-groups">
        <Button
          className={classnames({
          'btn-full': windowWidth < 767
          })}
          color="warning" 
          onClick={search}
        >
          {t('apply')}
        </Button>
      {windowWidth >= 767 && (
        <Button 
          color="custom" 
          className="btn-clear"
          onClick={clear}
          disabled={disabledClearButton}
        >
          {t('delete')}
        </Button>
      )}
      </div>
    </div>
	)
}

SearchFooter.propTypes = {
  search: PropTypes.func,
  t: PropTypes.func,
  clear: PropTypes.func,

  disabledClearButton: PropTypes.bool,
  windowWidth: PropTypes.number
}

export default withTranslation('common')(SearchFooter)
