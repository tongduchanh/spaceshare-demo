import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'

import { CloseIcon } from '../../icons'
import { withTranslation } from '../../i18n'

function SearchHeader({
  toggle,
  t,
  disabledClearButton,
  clear
}) {
    return (
      <div className="search__header">
        <div className="close-mobile-button" onClick={toggle}>
          <CloseIcon
            width={15}
            height={15}
            fill={'#444444'}
          />
        </div>

        <Button 
          color="custom" 
          className="btn-clear"
          onClick={clear}
          disabled={disabledClearButton}
        >
          {t('delete')}
        </Button>
      </div>
    )
}

SearchHeader.propTypes = {
  toggle: PropTypes.func,
  t: PropTypes.func,
  clear: PropTypes.func,

  disabledClearButton: PropTypes.bool,
  windowWidth: PropTypes.number
}

export default withTranslation('common')(SearchHeader)
