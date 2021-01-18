import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../../constants'
import { withTranslation } from '../../i18n'

class NotificationModal extends Component {
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
      title,
      message,
      handleHide,
      okFunction,
      t
    } = this.props
    title = !title ? t(DefaultValue.MODAL_NAME) : title

    return (
      <Modal isOpen={show} className="notification-modal modal-center">
        <div className="close-modal" onClick={handleHide}>
            <img src="/static/images/icons/close.png" />
        </div>
        {title && <ModalHeader className={headerClass}>{title}</ModalHeader>}
        <ModalBody>
          <div className="py-3 text-center">
            <span className="icon">
              <i className="fas fa-gift fa-3x" />
            </span>
            <h4 className="mt-4">
              {this.props.t('congratulations')}
            </h4>
            <p className="text">
              <div dangerouslySetInnerHTML={{ __html : message}} />
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="custom" className="btn-white" onClick={okFunction}>
            Inbox Fanpage
          </Button>{' '}
          <Button color="link" className="text-white">
            <a className="text-white" href="tel:0975 970 286">Gọi Hotline</a>
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: ModalName.NOTIFICATION })(NotificationModal))
