import React from 'react'
import {FormGroup} from 'reactstrap'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withTranslation } from '../../i18n'

const LoginNow = (props) => {
  const {t} = props
  return (
    <FormGroup className="register-now">
      <Link href={props.to}>
        <a>
          <span>{t(props.text1)}</span>
          <span>{t(props.text2)}</span>
        </a>
      </Link>
    </FormGroup>
  )
}

LoginNow.propTypes = {
  to: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  t: PropTypes.func
}

export default withTranslation('common')(LoginNow)
