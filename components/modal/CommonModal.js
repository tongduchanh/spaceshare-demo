import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../../constants'
import { withTranslation } from '../../i18n'

class CommonModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    headerClass: PropTypes.string,
    bodyClass: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
    okFunction: PropTypes.func,
    closeFunction: PropTypes.func,
    loginFunction: PropTypes.func,
    actionFunction: PropTypes.func,
    actionMes: PropTypes.string,
    t: PropTypes.func,
  }

  render() {
    let {
      show,
      headerClass,
      bodyClass,
      title,
      message,
      handleHide,
      okFunction,
      closeFunction,
      loginFunction,
      actionFunction,
      actionMes,
      t
    } = this.props
    title = !title ? t(DefaultValue.MODAL_NAME) : title

    return (
      <Modal isOpen={show}>
        <div className="close-button" onClick={handleHide} />
        {title && <ModalHeader className={headerClass}>{title}</ModalHeader>}
        <ModalBody className={bodyClass} dangerouslySetInnerHTML={{ __html: message}} />
        <ModalFooter>
          {actionFunction && (
            <div>
              <Button color="custom" className="btn-gold" onClick={handleHide}>
                {t('close')}
              </Button>{' '}
              <Button color="custom" className="btn-coal" onClick={actionFunction}>
                {actionMes}
              </Button>
            </div>
          )}
          {okFunction && (
            <div>
              <Button color="custom" className="btn-coal" onClick={okFunction}>
                {t('ok')}
              </Button>{' '}
              <Button color="custom" className="btn-gold" onClick={handleHide}>
                {t('cancel')}
              </Button>
            </div>
          )}
          {!okFunction && closeFunction && (
            <Button color="custom" className="btn-coal" onClick={closeFunction}>
              {t('close')}
            </Button>
          )}
          {(!okFunction && !closeFunction && !loginFunction && !actionFunction) && (
            <Button color="custom" className="btn-coal" onClick={handleHide}>
              {t('close')}
            </Button>
          )}
          {loginFunction && (
            <Button color="custom" className="btn-coal" onClick={loginFunction}>
              {t('go-to-login-page')}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: ModalName.COMMON })(CommonModal))
