import React from 'react'
import {Button, FormGroup} from 'reactstrap'
import PropTypes from 'prop-types'
import { withTranslation } from '../../i18n'

const SubmitButton = (props) => {
  let classes = `btn-login ${props.classes}`
  const {t} = props
  return (
    <FormGroup className="btns-group">
      <Button onClick={props.clicked} className={classes}>{t(props.text)}</Button>
    </FormGroup>
  )
}

SubmitButton.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string,
  clicked: PropTypes.func,
  t: PropTypes.func
}

export default withTranslation('common')(SubmitButton)
