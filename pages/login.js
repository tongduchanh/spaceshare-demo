/**
 * @author HanhTD
 * Login
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import EmailValidator from 'email-validator'
import { Row, Col, FormGroup, Button } from 'reactstrap'
import validator from 'validator'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'
import GoogleLogin from 'react-google-login'

import AuthsActions from '../redux/_auths-redux'
import SubmitButton from '../components/auths/submit-button'
import LoginNow from '../components/auths/login-now'
import RegisterOr from '../components/auths/register-or'
import ProfileActions from '../redux/_profile-redux'
import { i18n, withTranslation } from '../i18n'
import Layout from '../components/layouts/layout'
import Loader from '../components/Loader'
import { ModalName } from '../constants'
import { FacebookIcon, GoogleIcon } from '../icons'
import { AppUtils } from '../utils'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

class LoginPage extends React.Component {
  static async getInitialProps({ req }) {
    const currentLanguage = req ? req.language : i18n.language
    return {
      namespacesRequired: ['common'],
      currentLanguage: currentLanguage,
    }
  }

  constructor(props) {
    super(props)
    let additional_message = ''
    this.state = {
      username: '',
      password: '',
      callback: '',
      coworkingCallbackUrl: '',
      additional_message: additional_message,
      showPass: false,
      data: this.props.data,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        token: nextProps.data.data.token,
      }
    }

    if (nextProps.coworking !== prevState.coworking) {
      return {
        coworking: nextProps.coworking,
      }
    } else return null
  }

  componentDidMount() {
    AppUtils.scrollToTop()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      let data = this.props.data.data
      if (data.token) {
        this.props.profileRequest()
      }
    }

    if (prevProps.profile !== this.props.profile && this.props.profile.getProfile) {
      this.props.router.back()
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.loginRequest(data)
  }

  showPass = () => {
    this.setState({
      showPass: !this.state.showPass,
    })
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
    };
    this.props.socialAuthFb(data);
  }

  generateRegisterLink = () => {
    let { callback } = this.state
    let callbackUrl
    if (callback === null) {
      callbackUrl = ''
    } else {
      callbackUrl = `?callbackPath=${callback}`
    }
    let registerUrl = `/register${callbackUrl}`
    return registerUrl
  }

  render() {
    const { additional_message, username } = this.state
    const { t } = this.props
    let forgotPasswordUrl = 'forgot-password'
    if (EmailValidator.validate(username)) {
      forgotPasswordUrl += `?email=${username}`
    }
    const regiterUrl = this.generateRegisterLink()
    return (
      <Layout {...this.props}>
        <Head>
          <title>{t('title-login')}</title>
          <meta name="description" content={t('description-login')} />
        </Head>
        <div className="login-page">
          {this.props.processing && <Loader />}
          <div className="login-content">
            <div className="additional-info">{additional_message}</div>
            <div className="login-form">
              <div className="form-header">
                <h1>{t('sign-in')}</h1>
                <h2 style={{ display: 'none' }}>{t('sign-in')}</h2>
              </div>
              <div className="form-body">
                <ValidationForm onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <TextInput
                      className="form-control form-username"
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Email hoặc số điện thoại"
                      required
                      pattern=".{3,}"
                      errorMessage={{
                        required: t('validate-field-0'),
                        pattern: t('validate-field-3'),
                        validator: t('invalidate-email'),
                      }}
                      onChange={this.handleChange}
                      value={username}
                      // validator={validator.isEmail}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      type={!this.state.showPass ? 'password' : 'text'}
                      name="password"
                      id="password"
                      placeholder={t('password')}
                      className="form-control form-password"
                      required
                      errorMessage={{
                        required: t('validate-field-0'),
                      }}
                      onChange={this.handleChange}
                      autoComplete="new-password"
                      value={this.state.password}
                    />
                    <div className="show-password">
                      {!this.state.showPass ? (
                        <i className="far fa-eye" onClick={this.showPass} />
                      ) : (
                        <i className="far fa-eye-slash" onClick={this.showPass} />
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup check className="remember">
                    <Link href={forgotPasswordUrl}>
                      <a>{t('forgot-password')}</a>
                    </Link>
                  </FormGroup>
                  <SubmitButton text="login" />
                  <LoginNow to={regiterUrl} text1="dont-have-account" text2="register-now" />
                  <RegisterOr />
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <FacebookLogin
                          appId={publicRuntimeConfig.REACT_APP_FACEBOOK_APP_ID}
                          fields="name,email,picture"
                          callback={this.responseFacebook}
                          cssClass="btn btn-secondary"
                          textButton={t('facebook-login')}
                          isMobile={false}
                          render={(renderProps) => (
                            <Button
                              color="custom"
                              onClick={renderProps.onClick}
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
                          clientId={publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID}
                          onSuccess={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                          render={renderProps => (
                            <Button onClick={renderProps.onClick} color="custom" className="btn-google btn-social justify-content-center">
                              <GoogleIcon w={18} h={18} className="icon" />
                              <span className="ml-2">GOOGLE</span>
                            </Button>
                          )}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </ValidationForm>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

LoginPage.propTypes = {
  loginRequest: PropTypes.func,
  profileRequest: PropTypes.func,
  socialAuthGoogle: PropTypes.func,
  socialAuthFb: PropTypes.func,
  t: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,

  data: PropTypes.object,
  profile: PropTypes.object,
  processing: PropTypes.bool,
  router: PropTypes.object,
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
  loginRequest: (data) => dispatch(AuthsActions.loginRequest(data)),
  socialAuthFb: (data) => dispatch(AuthsActions.socialAuthFb(data)),
  profileRequest: (data) => dispatch(ProfileActions.profileRequest(data)),
  socialAuthGoogle: (data) => dispatch(AuthsActions.socialAuthGoogle(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(LoginPage)))
