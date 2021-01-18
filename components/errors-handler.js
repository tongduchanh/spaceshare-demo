import { Component } from 'react'
import Router, {withRouter} from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { show, hide } from 'redux-modal'
import { bindActionCreators } from 'redux'

import {ModalName} from '../constants'
import { withTranslation } from '../i18n'
import { HttpStatus } from '../constants'

class ErrorsHandler extends Component {
  loginFunction = () => {
    Router.push('/login')
    this.props.hide(ModalName.COMMON)
  }

  closeAndGoHomePage = () => {
    this.props.hide(ModalName.COMMON)
    this.props.router.push('/')
  }

  componentDidUpdate(preProps) {
    if (this.props.error && this.props.error !== preProps.error) {
      if (this.props.error.verifyEmailError) {
        this.props.show(ModalName.COMMON, {
          message: this.props.t(this.props.error.message),
          closeFunction: () => this.closeAndGoHomePage()
        })
        return
      }
      if (this.props.status == HttpStatus.UNAUTHORIZED) {
        if (this.props.error.message_code === '1009') {
          this.props.show(ModalName.COMMON, {
            message: this.props.t(this.props.error.message),
            loginFunction: () => this.loginFunction()
          })
        }
      } else {
        this.props.show(ModalName.COMMON, {
          message: this.props.t(this.props.error.message),
          closeFunction: () => {
            this.props.hide(ModalName.COMMON)
          }
        })
      }
    }
  }

  render() {
    return null
  }
}

ErrorsHandler.propTypes = {
  error: PropTypes.object,
  dataError: PropTypes.object,
  status: PropTypes.number,
  t: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  router: PropTypes.object
}

const mapStateToProps = state => {
  return {
    error: state.errors.error,
    status: state.errors.status,
    dataError: state.errors.dataError
  }
}

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({ show, hide }, dispatch)
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(ErrorsHandler)))
