import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import validator from 'validator'
import {Row, Col, FormGroup, Modal, ModalHeader, ModalBody, Label, Button,
InputGroup, InputGroupAddon, Input} from 'reactstrap'
import {withRouter} from 'next/router'
import {TextInput, ValidationForm} from 'react-bootstrap4-form-validation'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'

import DedicatedDeskRequestActions from '../../redux/_dedicated-desk-request-redux'

import { withTranslation } from '../../i18n'

class ContactModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      seat_amount: 1,
      start_date: new Date(),
      note: '',
      full_name: '',
      email: '',
      phone_number: '',
      coworking_id: 1,
      duration_type: 1,
      duration_value: 1,
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
    if (prevProps.dedicatedDeskRequest !== this.props.dedicatedDeskRequest) {
      if (this.props.dedicatedDeskRequest.postDedicatedDeskRequest) {
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
      seat_amount: state.seat_amount,
      start_date: state.start_date ? moment(state.start_date).format('DD-MM-YYYY') : null,
      duration_type: state.duration_type,
      duration_value: state.duration_value,
      note: state.note,
      dedicated_desk: this.props.coworking?.id
    }
    this.props.postDedicatedDeskRequest(data)
  }

  handleChangeDate = (date, name) => {
    this.setState({
      [name]: date
    })
  }

  render() {
    const {t} = this.props
    const {full_name, email, phone_number, seat_amount, start_date, note, duration_type, duration_value} = this.state
    return (
      <Modal className="container modal-center contact-modal" isOpen={this.props.isOpen} toggle={this.toggle}>
        <div className="close-button" onClick={this.toggle} />
        <ModalHeader className="d-block">
          <div className="title fw-7 text-center mb1">
            Liên hệ đặt chỗ
          </div>
          <div className="subtitle text-center">Hãy để lại thông tin chúng tôi sẽ liên lạc lại ngay</div>
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
                          validator: t('invalidate-email'),
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
                        {t('seat-amount')}
                      </Label>
                      <TextInput
                        type="number"
                        min="0"
                        name="seat_amount"
                        value={seat_amount}
                        onChange={this.handleChange}
                        required
                        errorMessage={{
                          required: t('validate-number'),
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
                        selected={start_date}
                        onChange={(e) => this.handleChangeDate(e, 'start_date')}
                        dateFormat="dd-MM-yyyy"
                        minDate={new Date()}
                        className="form-control"
                        popperPlacement="bottom"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>
                        {t('duration')}
                      </Label>
                      <InputGroup>
                        <TextInput
                          type="number"
                          placeholder="1"
                          min="1"
                          name="duration_value"
                          value={duration_value}
                          onChange={this.handleChange}
                        />
                        <InputGroupAddon addonType="append">
                          <Input type="select" name="duration_type" id="exampleSelect" value={duration_type} onChange={this.handleChange}>
                            <option value={1}>{t('day')}</option>
                            <option value={2}>{t('week')}</option>
                            <option value={3}>{t('month')}</option>
                            <option value={4}>{t('year')}</option>
                          </Input>
                        </InputGroupAddon>
                      </InputGroup>
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
                  <Col md="12" xs="12" className="text-center">
                    <Button color="custom" className="btn-gold fw-7">
                      {t('send-info')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ValidationForm>
        </ModalBody>
        <style jsx>{`
          .subtitle {
            font-weight: normal;
            font-size: 18px
          }
        `}
        </style>
      </Modal>
    )
  }
}

ContactModal.propTypes = {
  postDedicatedDeskRequest: PropTypes.func,
  toggle: PropTypes.func,
  t: PropTypes.func,

  profile: PropTypes.object,
  coworking: PropTypes.object,
  dedicatedDeskRequest: PropTypes.object,
  isOpen: PropTypes.bool,
}

const mapStateToProps = state => ({
  dedicatedDeskRequest: state.dedicatedDeskRequest.data,
})

const mapDispatchToProps = dispatch => ({
  postDedicatedDeskRequest: data => dispatch(DedicatedDeskRequestActions.postDedicatedDeskRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(ContactModal)))
