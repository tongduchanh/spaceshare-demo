import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import validator from 'validator'
import {Row, Col, FormGroup, Modal, ModalHeader, ModalBody, Label, Button} from 'reactstrap'
import {withRouter} from 'next/router'
import {TextInput, ValidationForm} from 'react-bootstrap4-form-validation'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'

import SpaceRequestActions from '../../redux/_space-request-redux'

import { withTranslation } from '../../i18n'

class ContactEventModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      guest_amount: 1,
      start_time: new Date(),
      end_time: null,
      note: '',
      full_name: '',
      email: '',
      phone_number: '',
      coworking: {}
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.profile !== state.profile && props.profile) {
      return {
        profile: props.profile,
        full_name: props.profile.full_name,
        email: props.profile.email,
        phone_number: props.profile.national_phone_number,
      }
    }
    return null
  }

  //show & hide modal
  toggle = () => {
    this.props.toggle(false)
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spaceRequest !== this.props.spaceRequest) {
      if (this.props.spaceRequest.postSpaceRequest) {
        Swal.fire({
          title: this.props.t('congratulations'),
          type: 'success',
          html: 
            `${this.props.t('contact-success')} <br />
              ${this.props.t('we-contact')}
            `,
          confirmButtonText: 'OK',
          showCloseButton: true,
          customClass: {
            title: 'title-class',
            confirmButton: 'confirm-button-class'
          },
        }).then(() => {
          this.toggle()
        })
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const state = {...this.state}
    const data = {
      full_name: state.full_name,
      phone_number: state.phone_number,
      email: state.email,
      guest_amount: state.guest_amount,
      start_time: state.start_time ? moment(state.start_time).format('DD-MM-YYYY hh:mm:ss') : null,
      end_time: state.end_time ? moment(state.end_time).format('DD-MM-YYYY hh:mm:ss') : null,
      note: state.note,
      space: this.props.coworking.id
    }
    this.props.postSpaceRequest(data)
  }

  handleChangeDate = (date, name) => {
    this.setState({
      [name]: date
    })
  }

  render() {
    const {t} = this.props
    const {full_name, email, phone_number, guest_amount, start_time, end_time, note} = this.state
    return (
      <Modal className="container modal-center contact-modal" isOpen={this.props.isOpen} toggle={this.toggle}>
        <div className="close-button" onClick={this.toggle} />
        <ModalHeader className="j-content-center">
          <div className="title fw-7">
            {t('contact-event-space')}
          </div>
        </ModalHeader>
        <ModalBody>
          <ValidationForm className="form custom-form" onSubmit={this.handleSubmit}>
            <Row>
              <Col md="12" className="contact-modal__item">
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        {t('full-name')}
                      </Label>
                      <TextInput
                        type="text"
                        name="full_name"
                        value={full_name || ''}
                        placeholder={t('full-name')}
                        onChange={this.handleChange}
                        required
                        pattern=".*[^ ].*"
                        errorMessage={{
                          pattern: t('validate-not-empty'),
                          required: t('validate-field-full-name'),
                        }}
                        maxLength="50"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        {t('email')}
                      </Label>
                      <TextInput
                        type="email"
                        name="email"
                        value={email || ''}
                        placeholder={t('email')}
                        onChange={this.handleChange}
                        validator={validator.isEmail}
                        errorMessage={{
                          pattern: t('validate-not-empty'),
                          required: t('validate-field-email'),
                          validator: t('validate-email'),
                        }}
                        maxLength="50"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>
                        {t('phone')}
                      </Label>
                      <TextInput
                        type="text"
                        name="phone_number"
                        value={phone_number || ''}
                        placeholder={t('phone')}
                        onChange={this.handleChange}
                        required
                        errorMessage={{
                          required: t('validate-field-phone-number'),
                        }}
                        maxLength="50"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>
                        {t('guest-amount')}
                      </Label>
                      <TextInput
                        type="number"
                        min="0"
                        name="guest_amount"
                        value={guest_amount || 0}
                        onChange={this.handleChange}
                        required
                        errorMessage={{
                          required: t('validate-field-guest-amount'),
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>
                        {t('start-date')}
                      </Label>
                      <DatePicker
                        selected={start_time}
                        showTimeSelect
                        onChange={(e) => this.handleChangeDate(e, 'start_time')}
                        dateFormat="dd-MM-yyyy h:mm aa"
                        timeFormat="HH:mm"
                        minDate={new Date()}
                        maxDate={end_time}
                        className="form-control"
                        popperPlacement="bottom"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>
                        {t('end-date')}
                      </Label>
                      <DatePicker
                        selected={end_time}
                        showTimeSelect
                        timeFormat="HH:mm"
                        onChange={(e) => this.handleChangeDate(e, 'end_time')}
                        dateFormat="dd-MM-yyyy h:mm aa"
                        minDate={start_time}
                        className="form-control"
                        popperPlacement="bottom"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" xs="12">
                    <FormGroup>
                      <Label>
                        {t('note')}
                      </Label>
                      <TextInput
                        type="text"
                        multiline
                        rows="5"
                        name="note"
                        value={note}
                        onChange={this.handleChange}
                        maxLength="250"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" xs="12">
                    <Button color="custom" className="btn-gold fw-7">
                      {t('send-info')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ValidationForm>
        </ModalBody>
      </Modal>
    )
  }
}

ContactEventModal.propTypes = {
  postSpaceRequest: PropTypes.func,
  toggle: PropTypes.func,
  t: PropTypes.func,

  profile: PropTypes.object,
  spaceRequest: PropTypes.object,
  coworking: PropTypes.object,
  isOpen: PropTypes.bool,
}

const mapStateToProps = state => ({
  spaceRequest: state.spaceRequest.data,
})

const mapDispatchToProps = dispatch => ({
  postSpaceRequest: data => dispatch(SpaceRequestActions.postSpaceRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(ContactEventModal)))
