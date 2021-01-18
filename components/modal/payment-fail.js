import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { withTranslation } from '../../i18n'

const iconError = '/static/images/error.svg'

class PaymentFail extends Component {
  static propTypes = {
    show: PropTypes.bool,
    t: PropTypes.func,
    closeFunction: PropTypes.func,
    handleHide: PropTypes.func.isRequired,
    flexibleSubcriptionList: PropTypes.func,
  }
  
  completed = () => {
    this.props.handleHide()
    this.props.flexibleSubcriptionList()
  }

  render() {
    let {
      show,
      closeFunction,
      t,
    } = this.props
   
    return (
      <Modal isOpen={show} className="modal-center payment-modal">
        <ModalHeader className="modal-header--fail j-content-center">
          <div className="text-center body-top">
            <img src={iconError} width={48} />
          </div>
          
        </ModalHeader>
        <ModalBody>
          <div className="text-center body-top">
            <div className="modal-body__title">
              {t('payment-fail').toUpperCase()}!
            </div>
            <div className="mb--24">
              <div>{t('payment-fail-content')}</div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={closeFunction}>
            {t('close')}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: 'payment-fail' })(PaymentFail))
