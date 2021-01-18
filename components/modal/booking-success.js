import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { withTranslation } from '../../i18n'
import { ModalName } from '../../constants'

const iconCheck = '/static/images/success.svg'
class BookingSuccessModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    t: PropTypes.func,
    okFunction: PropTypes.func,
    handleHide: PropTypes.func.isRequired,
  }
  render() {
    let {
      show,
      handleHide,
      t,
      okFunction
    } = this.props

    return (
      <Modal isOpen={show} className="booking-success-modal modal-center modal-success">
        <ModalHeader className="modal-header--success j-content-center">
          <div className="text-center body-top">
            <img src={iconCheck} width={48} />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="text-center body-bottom" style={{fontSize: '1rem'}}>
            <div className="modal-body__title">
              {t('booking-success')}!
            </div>
            {t('booking-success-text')}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>
            {t('close')}
          </Button>{' '}
          <Button color="success" onClick={okFunction}>
            {t('booking-management')}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: ModalName.BOOKING_SUCCESS })(BookingSuccessModal))
