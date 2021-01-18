import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { NotificationContainer } from 'react-notifications'

import configureStore from '../redux'
import ProfileActions from '../redux/_profile-redux'

import ErrorsHandler from '../components/errors-handler'
import Modals from '../components/Modals'
import { i18n, appWithTranslation } from '../i18n'
import MessengerChat from '../components/MessengerChat'

import 'react-dates/lib/css/_datepicker.css'
import 'react-smartbanner/dist/main.css'
import '../i18n'
import '../styles/bootstrap.scss'
import '../styles/styles.scss'

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (ctx.req && ctx.req.cookies && ctx.req.cookies.jwt_auth_token) {
      ctx.store.dispatch(ProfileActions.profileRequest(ctx.req.cookies))
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    const currentLanguage = ctx.req ? ctx.req.language : i18n.language
    return {
      pageProps,
      currentLanguage,
    }
  }

  render() {
    const { Component, pageProps, store, router, currentLanguage, t } = this.props
    return (
      <Provider store={store}>
        <NotificationContainer />
        <ErrorsHandler />
        <Modals />
        <Component {...pageProps} {...router} currentLanguage={currentLanguage} t={t} />

        <MessengerChat />
        <button id="verify-phone" color="warning" className="display-none" />
      </Provider>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga(appWithTranslation(_App)))
