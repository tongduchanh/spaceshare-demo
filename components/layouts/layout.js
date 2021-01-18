import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import { withTranslation } from 'react-i18next'
// import SmartBanner from 'react-smartbanner'
import { isAndroid, isIOS } from 'react-device-detect'

class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { t, children, noFooter, currentLanguage, additionClass } = this.props
    let force
    if (isAndroid) {
      force = 'android'
    } else if (isIOS) {
      force = 'ios'
    }
    let url = { ios: 'https://spaceshare.page.link/home', android: 'https://spaceshare.page.link/home'}
    return (
      <div>
        {/* <div id="smart-banner">
          <SmartBanner 
            force={force}
            url={url}
            daysHidden={1}
            daysReminder={1}
            button={t('download-app').toUpperCase()}
          />
        </div> */}
        
        <Header t={t} {...this.props} currentLanguage={currentLanguage} />
        <main className={`main-content ${additionClass}`}>
          {children}
        </main>
        {!noFooter && <Footer t={t} />}
      </div>
    )
  }
}

Layout.propTypes = {
  t: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  noFooter: PropTypes.bool,
  currentLanguage: PropTypes.string,
  additionClass: PropTypes.string,
}

Layout.defaultProps = {
  noFooter: false
}

export default withTranslation('common')(Layout)
