import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { withTranslation } from '../../i18n'
import Countdown from 'react-countdown'

const iconCheck = '/static/images/success.svg'

class PaymentSuccess extends Component {
  static propTypes = {
    show: PropTypes.bool,
    t: PropTypes.func,
    okFunction: PropTypes.func,
    closeFunction: PropTypes.func,
    handleHide: PropTypes.func.isRequired,
    flexibleSubcriptionList: PropTypes.func,
    processing: PropTypes.bool,
    message1: PropTypes.string,
    message2: PropTypes.string
  }
  state = {
    isCompleted : false
  }

  completed = () => {
    this.props.flexibleSubcriptionList()
  }

  render() {
    let {
      show,
      handleHide,
      t,
      processing,
      closeFunction,
      message1,
      message2
    } = this.props

    const renderer = ({ seconds, completed }) => {
      if (completed) {
        return (
          <div>
            <div>Giao dịch của bạn đã được xử lý thành công.</div>
            <div>Hãy kích hoạt gói dịch vụ ngay để đặt lịch với SpaceShare</div>
            <Button color="success" onClick={handleHide} className="mt--24">
              {t('continue')}
            </Button>
          </div>
        )
      } else {
        // Render a countdown
        return (
          <div>
            {t('payment-process')}{` `}
              <span style={{color: `#2dce89`}}>{seconds}s</span>
          </div>
        );
      }
    };
    return (
      <Modal isOpen={show} className="modal-center payment-modal">
        <ModalHeader className="modal-header--success j-content-center">
          <div className="text-center body-top">
            <img src={iconCheck} width={48} />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="text-center body-bottom" style={{fontSize: '1rem'}}>
            <div className="modal-body__title">
              {t('payment-success-title')}!
            </div>
            <div className="mb--24">
              {processing ? (
                <Countdown
                  date={Date.now() + 5000}
                  renderer={renderer}
                  onComplete={() => this.completed()}
                />
              ) : (
                <div>
                  <div>{message1}</div>
                  <div>{message2}</div>
                  <Button color="success" onClick={closeFunction} className="mt--24">
                    {t('continue')}
                  </Button>
                </div>
              )}
              
            </div>
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

export default withTranslation('common')(connectModal({ name: 'payment-success' })(PaymentSuccess))
