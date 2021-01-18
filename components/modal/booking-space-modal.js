import React from 'react'
import PropTypes from 'prop-types'
import {Modal, ModalBody} from 'reactstrap'

class BookingSpaceModal extends React.Component {
  //show&hide modal
  toggle = () => {
    this.props.toggle()
  }
  render() {
    const {booking} = this.props
    return (
      <Modal className="modal-full" isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalBody>
          <div className="close-mobile-button" onClick={this.toggle}>
            <img src="/static/images/cancel.svg" width="16" />
          </div>
          {booking}
        </ModalBody>
      </Modal>
    )
  }
}

BookingSpaceModal.propTypes = {
  toggle: PropTypes.func,
  coworking: PropTypes.object,
  flexibleSubscription: PropTypes.array,
  isOpen: PropTypes.bool,
  currentLanguage: PropTypes.string,
  profile: PropTypes.object,
  booking: PropTypes.any
}

export default BookingSpaceModal
