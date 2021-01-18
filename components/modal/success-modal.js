import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { withTranslation } from '../../i18n'

const iconCheck = '/static/images/success.svg'
class SuccessModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    t: PropTypes.func,
    okFunction: PropTypes.func,
    showOk: PropTypes.bool,
    okText: PropTypes.string,
    handleHide: PropTypes.func.isRequired,
    message: PropTypes.node,
    title: PropTypes.string
  }

  render() {
    let {
      show,
      handleHide,
      t,
      okFunction,
      okText,
      showOk,
      title,
      message
    } = this.props

    return (
      <Modal
        isOpen={show}
        className="booking-success-modal modal-center modal-success"
      >
        <ModalHeader className="modal-header--success j-content-center">
          <div className="text-center body-top">
            <img src={iconCheck} width={48} />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="text-center body-bottom" style={{ fontSize: '1rem' }}>
            <div className="modal-body__title">{title}</div>
            {message}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>
            {t('close')}
          </Button>{' '}
          {showOk !== false && (
            <Button color="success" onClick={okFunction}>
              {okText || t('booking-management')}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: 'success-modal' })(SuccessModal))
