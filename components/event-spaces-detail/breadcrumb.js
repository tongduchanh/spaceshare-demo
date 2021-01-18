import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { withTranslation } from '../../i18n'

function Breadcrumb(props) {
  const { breadcrumbList } = props
  return (
    <React.Fragment>
      <ul className="breadcrumbs">
        {breadcrumbList.map((val, key) => (
          <li className="breadcrumbs__item" key={key}>
            <Link href={val.linkHref} as={val.linkAs}>
              <a>{val.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

Breadcrumb.propTypes = {
  t: PropTypes.func,
  space: PropTypes.object,
  serviceType: PropTypes.number,
  breadcrumbList: PropTypes.array
}

export default withTranslation('common')(Breadcrumb)
