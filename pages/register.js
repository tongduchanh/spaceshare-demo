import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Head from 'next/head'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
  Row,
  Col,
  FormGroup,
  Button,
} from 'reactstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import validator from 'validator'
import GoogleLogin from 'react-google-login'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

import AuthsActions from '../redux/_auths-redux'
import ProfileActions from '../redux/_profile-redux'

import { i18n, withTranslation } from '../i18n'
import { AppUtils } from '../utils'
import SubmitButton from '../components/auths/submit-button'
import LoginNow from '../components/auths/login-now'
import RegisterOr from '../components/auths/register-or'
import Layout from '../components/layouts/layout'
import Loader from '../components/Loader'
import { ModalName } from '../constants'
import { FacebookIcon, GoogleIcon } from '../icons'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class Register extends React.Component {
  static async getInitialProps({ req }) {
    const currentLanguage = req ? req.language : i18n.language
    return {
      namespacesRequired: ['common'],
      currentLanguage: currentLanguage,
    }
  }

  constructor(props) {
    super(props)
    const query = new URLSearchParams(this.props.router.query)
    if (this.props.profile && this.props.profile.data) {
      AppUtils.goTo(props, '/profile')
    }

    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      national_code: '',
      national_phone_number: '',
      full_name: '',
      callback: query.get('callbackPath'),
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      let data = this.props.data.data
      if (data.token) {
        if (typeof fbq !== 'undefined') {
          // eslint-disable-next-line no-undef
          fbq('track', 'CompleteRegistration')
        }
        this.props.profileRequest()
      }
    }

    if (
      this.props.profile !== prevProps.profile &&
      this.props.profile.getProfile
    ) {
      this.props.router.replace('/')
    }
  }

  okFunction = () => {
    Router.push('/my-service')
    this.props.hide(ModalName.NOTIFICATION)
  }

  generateCallback = () => {
    let { callback } = this.state
    let callbackUrl
    if (callback === null) {
      callbackUrl = '/'
    } else {
      callbackUrl = callback
    }
    return callbackUrl
  }

  verificationCloseFunction = () => {
    this.props.hide(ModalName.VERIFICATION)
    this.props.profileRequest({})
    this.props.router.push('/profile')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.full_name,
      national_code: this.state.national_code,
      national_phone_number: this.state.national_phone_number
    }
    this.props.registerRequest(data)
  }

  matchPassword = (value) => {
    return value && value === this.state.password
  }

  responseFacebook = (response) => {
    let data = {
      provider: 'facebook-token',
      access_token: response.accessToken,
      redirect_uri: '/',
    }
    this.props.socialAuthFb(data)
  }

  responseGoogle = (response) => {
    let data = {
      provider: 'google-oauth2',
      access_token: response.accessToken,
      redirect_uri: '/',
    }
    this.props.socialAuthFb(data)
  }

  generateLoginLink = () => {
    let { callback } = this.state
    let callbackUrl
    if (callback === null) {
      callbackUrl = ''
    } else {
      callbackUrl = `?callbackPath=${callback}`
    }
    let registerUrl = `/login${callbackUrl}`
    return registerUrl
  }
  handleChangePhone = (value, country) => {
    this.setState({
      national_code: country.dialCode,
      national_phone_number: value.slice(country.dialCode.length)
    })
  }
  render() {
    const { t } = this.props
    const {
      email,
      password,
      full_name,
    } = this.state
    const loginUrl = this.generateLoginLink()
    return (
      <Layout {...this.props}>
        <div className="login-page">
          <Head>
            <title>{t('title-register')}</title>
          </Head>
          {this.props.processing === true ? <Loader /> : ''}
          <div className="login-content">
            <div className="login-form register-form">
              <div className="form-header">
                <h1>Đăng ký thành viên</h1>
              </div>
              <div className="form-body">
                <ValidationForm onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <FacebookLogin
                          appId={publicRuntimeConfig.REACT_APP_FACEBOOK_APP_ID}
                          fields="name,email,picture"
                          callback={this.responseFacebook}
                          isMobile={false}
                          render={(renderProps) => (
                            <Button
                              onClick={renderProps.onClick}
                              color="custom"
                              className="btn-facebook btn-social justify-content-center"
                            >
                              <FacebookIcon w={18} h={18} className="icon" />
                              <span className="ml-2">FACEBOOK</span>
                            </Button>
                          )}
                        />
                      </Col>
                      <Col md={6}>
                        <GoogleLogin
                          clientId={
                            publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID
                          }
                          onSuccess={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                          buttonText="GOOGLE"
                          render={(renderProps) => (
                            <Button
                              onClick={renderProps.onClick}
                              color="custom"
                              className="btn-google btn-social justify-content-center"
                            >
                              <GoogleIcon w={18} h={18} className="icon" />
                              <span className="ml-2">GOOGLE</span>
                            </Button>
                          )}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <RegisterOr />
                  <FormGroup>
                    <TextInput
                      className="form-control"
                      type="text"
                      name="full_name"
                      placeholder={t('full-name')}
                      errorMessage={{
                        required: 'Vui lòng nhập tên của bạn',
                      }}
                      onChange={this.handleChange}
                      value={full_name}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <PhoneInput
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                      }}
                      country="vn"
                      required
                      onChange={this.handleChangePhone}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      className="form-control"
                      type="email"
                      name="email"
                      id="email"
                      placeholder={`${t('email-placeholder')}`}
                      required
                      pattern=".{3,}"
                      errorMessage={{
                        required: t('validate-field-email'),
                        pattern: t('validate-field-3'),
                        validator: t('invalidate-email'),
                      }}
                      onChange={this.handleChange}
                      value={email}
                      validator={validator.isEmail}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      type="password"
                      name="password"
                      placeholder={`${t('password')}`}
                      className="form-control"
                      required
                      pattern="(?=.*[A-Z]).{8,}"
                      errorMessage={{
                        required: t('validate-field-password'),
                        pattern: t('invalidate-password'),
                      }}
                      onChange={this.handleChange}
                      autoComplete="new-password"
                      value={password}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      type="password"
                      name="re-enter-password"
                      id="re-enter-password"
                      placeholder={`${t('re-enter-password')}`}
                      onChange={this.handleChange}
                      required
                      validator={this.matchPassword}
                      errorMessage={{
                        required: t('validate-field-0'),
                        validator: t('unmatched-password'),
                      }}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup className="register-now">
                    <a
                      target="_blank"
                      href="/policy"
                      dangerouslySetInnerHTML={{ __html: t('policy-link') }}
                    />
                  </FormGroup>
                  <SubmitButton text="register" />
                  <LoginNow
                    to={loginUrl}
                    text1="have-account"
                    text2="login-now"
                  />
                </ValidationForm>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
Register.propTypes = {
  registerRequest: PropTypes.func,
  profileRequest: PropTypes.func,
  socialAuthFb: PropTypes.func,
  t: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,

  data: PropTypes.object,
  profile: PropTypes.object,
  location: PropTypes.object,
  router: PropTypes.object,
  processing: PropTypes.bool,
}
const mapStateToProps = (state) => {
  return {
    processing: state.auths.processing,
    data: state.auths.data,
    profile: state.profile.data,
  }
}
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  registerRequest: (data) => dispatch(AuthsActions.registerRequest(data)),
  profileRequest: (data) => dispatch(ProfileActions.profileRequest(data)),
  socialAuthFb: (data) => dispatch(AuthsActions.socialAuthFb(data)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(Register)))
