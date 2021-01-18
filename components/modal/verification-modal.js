import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'next/router'
import PropTypes from 'prop-types'
import validator from 'validator'
import {Row, Col, FormGroup, Modal, ModalHeader, ModalBody, Label, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import { connectModal } from 'redux-modal'
import {TextInput, ValidationForm} from 'react-bootstrap4-form-validation'
import * as firebase from 'firebase';
import Loader from 'react-loader-spinner'
import ReactCodeInput from 'react-verification-code-input'
import Countdown from 'react-countdown'
import ReactLoading from 'react-loading'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

import { ModalName } from '../../constants'
import ProfileActions from '../../redux/_profile-redux'
import SecurityActions from '../../redux/_security-redux'
import { withTranslation } from '../../i18n'

const Verified = '/static/images/verified.svg'

class VerificationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verification_step: 1,
      full_name: '',
      phone_number: '',
      email: '',
      profile: {},
      resend: false,
      national_code: '84',
      national_phone_number: null,
      sms_sent: false,
      countdown_key: 0,
      countdown_email_key: 0,
      resend_email: false,
      checkPhoneMessage: null,
    }
  }

  componentDidMount() {
    const profile = this.props.profile && this.props.profile.data
    this.setState({
      verification_step: profile.verification_step,
      email: profile.email,
      profile: profile,
      national_phone_number: profile.national_phone_number,
      national_code: profile.national_code
    })
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('verify-phone',
    {
      'size': 'invisible',
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile) {
      if (this.props.profile.updatePhoneNumber) {
        this.setStep(3)
      }
    }

    if (this.props.checkPhoneNumberData !== prevProps.checkPhoneNumberData) {
      const response = this.props.checkPhoneNumberData
      if (response && response.checkPhoneNumber) {
        if (response.status === true) {
          this.setState({
            checkPhoneMessage: response.message
          })
          this.verifyPhoneNumber()
        } else {
          this.setState({
            checkPhoneMessage: response.message
          })
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      const profile = nextProps.profile.data
      if (nextProps.profile.getProfile) {
        this.setState({
          verification_step: profile.verification_step,
          email: profile.email,
          profile: profile,
        })
      }

      if (nextProps.profile.editProfile) {
        if (this.props.profile.data.full_name !== profile.full_name) {
          this.setStep(2)
        }
        if (this.props.profile.data.email !== profile.email) {
          this.setStep(4)
        }
        this.setState({
          resend: false
        })
      }
    }

    if (this.props.security !== nextProps.security) {
      if (nextProps.security.sendVerifyEmail) {
        this.setStep(4)
      } else if (nextProps.security.verifyPhoneNumber) {
        this.setStep(3)
      }
    }
  }

  verify = () => {
    if (!this.state.profile.is_verified_email) {
      this.props.sendVerifyEmail()
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { verification_step, full_name, email } = this.state
    let requestData = new FormData()
    switch (verification_step) {
      // Submit full name
      case 1:
        requestData.append('full_name', full_name)
        this.props.editProfileRequest(requestData)
        break
      //Submit email
      case 3:
        requestData.append('email', email)
        this.props.editProfileRequest(requestData)
        break

      default:
        break
    }
  }

  handleResend = () => {
    this.setState({
      resend_email: true,
      countdown_email_key: this.state.countdown_email_key + 1
    })
    this.verify()
  }

  setStep = step => {
    this.setState({
      verification_step: step
    })
  }

  handleChangeEmail = () => {
    this.setState({
      resend: true,
      verification_step: 3
    })
  }

  verifyPhoneNumber = () => {
    const profile = this.props.profile && this.props.profile.data
    const national_code = this.state.national_code || profile.national_code
    const national_phone_number = this.state.national_phone_number || profile.national_phone_number
    const phoneNumber = `+${national_code} ${national_phone_number}`
    this.setState({countdown_key: this.state.countdown_key + 1})
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(confirmationResult => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      this.setState({
        sms_sent: true,
        session_info: confirmationResult.verificationId
      })
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      console.warn('send sms error', error)
    });
  }

  //check phone number before
  checkPhoneNumber = () => {
    const profile = this.props.profile && this.props.profile.data
    const national_code = this.state.national_code || profile.national_code
    const national_phone_number = this.state.national_phone_number || profile.national_phone_number
    const data = {
      phone_number: national_phone_number,
      national_code: national_code
    }
    this.props.checkPhoneNumber(data)
  }

  // Update phone number
  handleUpdatePhone = () => {
    const data = {
      national_code: this.state.national_code,
      national_phone_number: this.state.national_phone_number,
      session_info: this.state.session_info,
      code: this.state.code,
    }
    this.props.updatePhoneNumber(data)
  }

  // Change code sent to phone
  handleChangeCode = code => {
    this.setState({
      code
    }, () => {
      if (code && code.length === 6) {
        this.handleUpdatePhone()
      }
    })
  }

  handleChangePhone = (value, country) => {
    this.setState({
      national_code: country.dialCode,
      national_phone_number: value.slice(country.dialCode.length)
    })
  }

  render() {
    let { show, t } = this.props
    const { verification_step, full_name, countdown_key, email, resend, profile, national_code, national_phone_number } = this.state
    let step1Class = 'step step-1 active'
    let progress12Class = 'progress-bar progress-12'
    let progress23Class = 'progress-bar progress-23'
    let step2Class = 'step step-2'
    let step3Class = 'step step-3'
    let step1Verified = ''
    let step2Verified = ''
    let step3Verified = ''
    if (verification_step === 2) {
      step2Class += ' active'
      progress12Class += ' active'
      step1Verified = (
        <img src={Verified} alt="verified-step-1" />
      )
    }
    if (verification_step === 3 || verification_step === 4 || verification_step === 0) {
      step2Class += ' active'
      step3Class += ' active'
      progress12Class += ' active'
      progress23Class += ' active'
      step1Verified = (
        <img src={Verified} alt="verified-step-1" />
      )
      step2Verified = (
        <img src={Verified} alt="verified-step-2" />
      )
    }
    if (verification_step === 0) {
      step3Verified = (
        <img src={Verified} alt="verified-step-3" />
      )
    }

    //render count down resend sms
    const renderer = ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return (
        <a id="verify-phone" href="javascript:void(0)" onClick={this.verifyPhoneNumber}> {t('send-again')}</a>
        )
      } else {
        // Render a countdown
        return (
          <span> {t('send-code-after')}{` `}{seconds}s</span>
        )
      }
    };

    //render count down resend email
    const rendererResendEmail = ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return (
        <a id="verify-phone" href="javascript:void(0)" onClick={this.handleResend}> {t('send-again')}</a>
        )
      } else {
        // Render a countdown
        return (
          <span className="" style={{color: '#444444'}}> {t('send-code-after')}{` `}{seconds}s</span>
        )
      }
    };
    
    return (
      <Modal className="verification-modal" isOpen={show}>
        <div className="close-button" onClick={this.props.handleHide} />
        <ModalHeader>
          {this.props.t('verification-title')}
        </ModalHeader>
        <ModalBody className="detail">
          {verification_step !== 0 && (
            <p className="instruction">{this.props.t('verification-instruction')}</p>
          )}
          <div className="progress">
            <div className={step1Class} onClick={() => this.handleChangeStep('STEP_1')}>
              <div className="round">
                {step1Verified}
              </div>
              <div className="step-title">
                {this.props.t('profile-information')}
              </div>
            </div>
            <div className={progress12Class} />
            <div className={step2Class}>
              <div className="round">
                {step2Verified}
              </div>
              <div className="step-title">
                {this.props.t('phone-number')}
              </div>
            </div>
            <div className={progress23Class} />
            <div className={step3Class}>
              <div className="round">
                {step3Verified}
              </div>
              <div className="step-title">
                {this.props.t('activate-email')}
              </div>
            </div>
          </div>
          <ValidationForm onSubmit={this.handleSubmit}>
            <Row>
              {/* Step 1: Verify full_name */}
              <Col md={{ size: 8, offset: 2}}>
                {( verification_step === 1) && (
                  <React.Fragment>
                    <FormGroup>
                      <Label className="fw-7">{this.props.t('full-name')}</Label>
                      <TextInput
                        type="text"
                        name="full_name"
                        placeholder={this.props.t('pl_full_name')}
                        value={full_name}
                        onChange={this.handleChange}
                        required
                        errorMessage={{
                          required: this.props.t('validate-field-full-name'),
                        }}
                      />
                    </FormGroup>
                    <Button color="custom" className="btn-coal">
                      {this.props.t('next')}
                    </Button>
                  </React.Fragment>
                )}
              </Col>

              {/* Step 2: Verify phone */}
              <Col md={{ size: 8, offset: 2}}>
                {verification_step === 2 && (
                  <React.Fragment>
                    {!this.state.sms_sent ? (
                    <FormGroup>
                      <Label className="fw-7">{this.props.t('your-phone')}</Label>
                      <PhoneInput
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true
                        }}
                        country="vn"
                        value={`${national_code}${national_phone_number}`}
                        onChange={this.handleChangePhone}
                      />
                      {!this.props.processing && (
                        <div className="alert-error mb--6">{this.state.checkPhoneMessage}</div>
                      )}
                      <Button color="custom" className="btn-coal" onClick={this.checkPhoneNumber}>
                        {this.props.processing ? (
                          <Loader
                            type="ThreeDots"
                            color="#fff"
                            height={10}
                            width={35}
                          />
                        ) : (
                          <span>{t('verify')}</span>
                        )}
                      </Button>
                    </FormGroup>
                    ) : (
                        <div>
                          <div className="title font-weight-bold">{t('enter-code')}</div>
                          <p>{t('send-code-to', {phone: `+${national_code} ${national_phone_number}`})}</p>
                          <ReactCodeInput 
                            onChange={this.handleChangeCode}
                            className="input__code"
                          />
                          {this.props.processing && (
                            <Loader
                              type="ThreeDots"
                              color="#ff6f61"
                              height={10}
                              width={35}
                            />
                          )}
                          <p>{t('did-not-get-code')}
                            <Countdown 
                              date={Date.now() + 60000}
                              renderer={renderer}
                              key={countdown_key}
                            />
                          </p>
                        </div>
                    )}
                   
                  </React.Fragment>
                )}
              </Col>
              
              {/* Step 3: Verify email */}
              <Col md={{ size: 8, offset: 2}}>
                {((verification_step === 3 && (profile.email === null || profile.email === '')) || resend) && (
                  <React.Fragment>
                    <FormGroup>
                      <Label className="fw-7">{this.props.t('your-email')}</Label>
                      <TextInput
                        type="email"
                        name="email"
                        placeholder={this.props.t('pl_your_email')}
                        value={email}
                        onChange={this.handleChange}
                        required
                        errorMessage={{
                          required: this.props.t('validate-field-email'),
                          type: this.props.t('invalidate-email'),
                          validator: this.props.t('invalidate-email'),
                        }}
                        validator={validator.isEmail}
                      />
                    </FormGroup>
                    <Button color="custom" className="btn-coal">
                      {this.props.t('next')}
                    </Button>
                  </React.Fragment>
                )}
              </Col>

              <Col md="12">
                {((verification_step === 3 && profile.email !== null && profile.email !== '' && !resend) || verification_step === 4) && (
                  <React.Fragment>
                    <p style={{ 'textAlign': 'center' }}>Link kích hoạt đã được gửi tới email <a href="javascript:void(0)">{email}</a>. Bạn vui lòng truy cập email và làm theo hướng dẫn</p>
                    <p className="text-center">Bạn chưa nhận được email kích hoạt?{` `}
                      <span className="resend">
                        {this.props.securityProcessing ? (
                          <ReactLoading 
                            type={'bubbles'} 
                            color="#ff6f61"
                            height={10} 
                            width={35}
                            className="d-inline-block"
                          />
                        ) : (
                          <React.Fragment>
                            {this.state.resend_email ? (
                              <Countdown 
                                date={Date.now() + 59000}
                                renderer={rendererResendEmail}
                                key={this.state.countdown_email_key}
                              />
                            ) : (
                              <span onClick={this.handleResend}>Gửi lại</span>
                            )}
                          </React.Fragment>
                        )}
                      </span>
                    </p>
                    <p className="text-center resend" onClick={this.handleChangeEmail}>Thay đổi email</p>
                  </React.Fragment>
                )}
              </Col>
            </Row>

            {verification_step === 0 && (
              <React.Fragment>
                <p style={{ 'textAlign': 'center' }}>{this.props.t('verified_successfully')}</p>
              </React.Fragment>
            )}
          </ValidationForm>
        </ModalBody>
      </Modal>
    )
  }
}

VerificationModal.propTypes = {
  profileRequest: PropTypes.func,
  sendVerifyEmail: PropTypes.func,
  closeFunction: PropTypes.func,
  editProfileRequest: PropTypes.func,
  updatePhoneNumber: PropTypes.func,
  t: PropTypes.func,
  checkPhoneNumber: PropTypes.func,
  handleHide: PropTypes.func,

  show: PropTypes.bool,
  processing: PropTypes.bool,
  securityProcessing: PropTypes.bool,
  profile: PropTypes.object,
  security: PropTypes.object,
  data: PropTypes.object,
  checkPhoneNumberData: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.profile.processing,
    profile: state.profile.data,
    securityProcessing: state.security.processing,
    security: state.security.data,
    checkPhoneNumberData: state.profile.checkPhoneNumberData,
  }
}

const mapDispatchToProps = dispatch => ({
  editProfileRequest: data => dispatch(ProfileActions.editProfileRequest(data)),
  updatePhoneNumber: data => dispatch(ProfileActions.updatePhoneNumber(data)),
  sendVerifyEmail: () => dispatch(SecurityActions.sendVerifyEmail()),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data)),
  checkPhoneNumber: data => dispatch(ProfileActions.checkPhoneNumber(data)),
})

export default withTranslation('common')(connectModal(
  { name: ModalName.VERIFICATION }
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerificationModal))))
