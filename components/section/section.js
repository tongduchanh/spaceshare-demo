import React from 'react'
import PropTypes from 'prop-types'
import {Container} from 'reactstrap'
import Link from 'next/link'

import SectionHeader from './section-header'
import {RightArrow} from '../../icons'
import { withTranslation } from '../../i18n'

function Section(props) {
  return (
    <div className="section">
      <Container className={props.containerClass && props.containerClass}>
        <div className="section__main">
          <div>
            <SectionHeader
              title={props.title}
              subTitle={props.subTitle}
              routerUrl={props.showMoreHref}
              routerAs={props.showMoreAs}
              showLink={props.showLink}
              showSubtitle={props.showSubtitle}
              showFilter={props.showFilter}
              searchPage={props.searchPage}
            />
          </div>

          {props.render}

          <div>
            {props.showLink && (
              <div className="section__bottom see-more see-more--bottom sp">
                <Link href={props.showMoreHref} as={props.showMoreAs}>
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
          </div>
        </div>
      </Container>
    </div>
  )
}

Section.propTypes = {
  t: PropTypes.func,
  showMoreHref: PropTypes.string,
  showMoreAs: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showLink: PropTypes.bool,
  showSubtitle: PropTypes.bool,
  router: PropTypes.object,
  render: PropTypes.object,
  containerClass: PropTypes.string,
  showFilter: PropTypes.bool,
  searchPage: PropTypes.any
}

export default withTranslation('common')(Section)
