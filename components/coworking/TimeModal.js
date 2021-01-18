import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem} from 'reactstrap'
import { withTranslation } from '../../i18n'
import ListTimeItem from './ListTimeItem'

class TimeModal extends Component {
  toggle = () => {
    this.props.toggle(false)
  }

  render () {
    const { isOpen, hours, t } = this.props
    return (
      <Modal className="time-modal modal-center" isOpen={isOpen}>
        <ModalHeader toggle={this.toggle}>
          {t('detail-time')}
        </ModalHeader>
        <ModalBody>
          <ListGroup flush>
            <ListGroupItem>
              <ListTimeItem
                date={t('monday')}
                startTime={hours && hours.mon_start}
                endTime={hours && hours.mon_end}
                isOpen={hours && hours.mon_open}
              />
            </ListGroupItem>

            <ListGroupItem>
              <ListTimeItem 
                date={t('tuesday')}
                startTime={hours && hours.tue_start}
                endTime={hours && hours.tue_end}
                isOpen={hours && hours.tue_open}
              />
            </ListGroupItem>

            <ListGroupItem>
              <ListTimeItem 
                date={t('wednesday')}
                startTime={hours && hours.wed_start}
                endTime={hours && hours.wed_end}
                isOpen={hours && hours.wed_open}
              />
            </ListGroupItem>

            <ListGroupItem>
              <ListTimeItem 
                date={t('thursday')}
                startTime={hours && hours.thu_start}
                endTime={hours && hours.thu_end}
                isOpen={hours && hours.thu_open}
              />
            </ListGroupItem>
            
            <ListGroupItem>
              <ListTimeItem 
                date={t('friday')}
                startTime={hours && hours.fri_start}
                endTime={hours && hours.fri_end}
                isOpen={hours && hours.fri_open}
              />
            </ListGroupItem>
            
            <ListGroupItem>
              <ListTimeItem 
                date={t('saturday')}
                startTime={hours && hours.sat_start}
                endTime={hours && hours.sat_end}
                isOpen={hours && hours.sat_open}
              />
            </ListGroupItem>
            
            <ListGroupItem>
              <ListTimeItem 
                date={t('sunday')}
                startTime={hours && hours.sun_start}
                endTime={hours && hours.sun_end}
                isOpen={hours && hours.sun_open}
              />
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
      </Modal>
    )
  }
}

TimeModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  hours: PropTypes.object,
  t: PropTypes.func,
}

export default withTranslation('common')(TimeModal)
