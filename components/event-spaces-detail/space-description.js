import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withTranslation } from '../../i18n'

function SpaceDescription(props) {
  const [showMore, setShowMore] = useState(false)

  const handleShowMore = () => setShowMore(!showMore)

  const { showFade, space, t } = props

  return (
    <div
      className={classnames('space__content-wrap is-relative', {
        mini: !showMore,
      })}
    >
      <div
        className="space__content space-content text-html"
        id="space__content"
        dangerouslySetInnerHTML={{ __html: space.description }}
      />
      {showFade && (
        <div className="space-fade-bottom">
          <div className="faded" />
          <div className="button-box">
            {!showMore && (
              <a className="show-more" onClick={handleShowMore}>
                {t('see-more')}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

SpaceDescription.propTypes = {
  t: PropTypes.func,
  space: PropTypes.object,
  showFade: PropTypes.bool,
}

export default withTranslation('common')(SpaceDescription)
