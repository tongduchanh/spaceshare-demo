import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'
import { isMobile } from 'react-device-detect'

import {RightArrow} from '../../icons'
import { withTranslation } from '../../i18n'
import Sort from '../advance-search/sort'

function SectionHeader(props) {
  const handleClick = () => {
    if (!props.showLink) {
      return
    }
    props.router.push(props.routerUrl, props.routerAs).then(() => window.scrollTo(0, 0))
  }

  return (
    <div className="section__header">
      <div 
        className={classnames('section__header-content', {
          'cursor-poiter': props.showLink
        })}
        onClick={handleClick}
      >
        <div>
          <h3 className="section__header-title">
            {props.title}
          </h3>
          <div className="section__header-subtitle">
            {props.subTitle}
          </div>
        </div>
        {props.showLink && (
          <div className="section__header-content-right">
            <Link href={props.routerUrl} as={props.routerAs}>
              <a>
                <RightArrow
                  w={16}
                  h={16}
                  fill={'#444444'}
                />
              </a>
            </Link>
          </div>
        )}
      </div>
      {props.showLink && (
        <div className="section__header-more pc">
          <Link href={props.routerUrl} as={props.routerAs}>
            <a>
              <span className="mr--6">
                {props.t('show-all')}
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
      {props.showFilter && !isMobile && (
        <Sort searchPage={props.searchPage} />
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  routerUrl: PropTypes.string,
  routerAs: PropTypes.string,
  t: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  router: PropTypes.object,
  showLink: PropTypes.bool,
  showSubtitle: PropTypes.bool,
  showFilter: PropTypes.bool,
  searchPage: PropTypes.any
}

export default withTranslation('common')(withRouter(SectionHeader))
