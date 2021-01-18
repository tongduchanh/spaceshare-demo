import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'
import dynamic from 'next/dynamic'

import FlexibleActions from '../redux/_flexible-desk-redux'
import BannerActions from '../redux/_banner-redux'
import DedicatedDeskActions from '../redux/_dedicated-desk-redux'
import DedicatedSpaceActions from '../redux/dedicated-space/_dedicated-space-redux'
import BlogActions from '../redux/_blog-redux'
import PartnerActions from '../redux/_partner-redux'
import DedicatedDeskGroupActions from '../redux/_dedicated-desk-group-redux'
import OfficeSpaceActions from '../redux/_office-space-redux'
import HotDeskActions from '../redux/_hot-desk-redux'

import Layout from '../components/layouts/layout'
import Background from '../components/home/background'

import { i18n, withTranslation } from '../i18n'
import { AppUtils } from '../utils'
import { DefaultValue, SpaceServiceType } from '../constants'


const DedicatedSlider = dynamic(() => import('../components/dedicated-space/dedicated-slider'), {
  ssr: false,
})


const Section = dynamic(() => import('../components/section/section'), { ssr: false })
class HomePage extends React.Component {
  static async getInitialProps({ store, req }) {
    //fetch data dedicated space
    const currentLanguage = req ? req.language : i18n.language
    const dedicatedData = {
      limit: DefaultValue.LIMIT,
      offset: 0,
      lang: currentLanguage,
    }
    store.dispatch(
      DedicatedSpaceActions.dedicatedSpaceList(dedicatedData, req ? req.cookies : null),
    )

    return {
      namespacesRequired: ['common'],
      currentLanguage: currentLanguage,
    }
  }

  componentDidMount() {
    document.body.classList.add('header-transparent')
  }

  componentWillUnmount() {
    document.body.classList.remove('header-transparent')
  }

  render() {
    const dedicatedSpace = this.props.dedicatedSpace?.data?.results
    const banners = this.props.banner?.data
    const og_image = banners && banners[0] && banners[0].image
    const { t } = this.props
    return (
      <Layout {...this.props}>
        <Head>
          <title>{this.props.t('title-home')}</title>
          <meta property="og:title" content="SpaceShare - Xóa bỏ giới hạn không gian" />
          <meta property="og:url" content={process.env.REACT_APP_SITE_URL} />
          <meta
            property="og:description"
            content="Khám phá, lựa chọn và trải nghiệm không gian Nhanh chóng , Đa dạng, Tiết kiệm"
          />
          <meta property="og:image" content={og_image} />
          <meta property="og:image:width" content="1080" />
          <meta property="og:image:height" content="720" />
        </Head>
        <Background />
        <div style={{ minHeight: `600px` }}>
          <Section
            title={t('dedicated-space-title')}
            subTitle={t('dedicated-space-desc')}
            showLink
            showSubtitle
            showMoreHref={AppUtils.routerSpaceHref(SpaceServiceType.DEDICATED_SPACE)}
            showMoreAs={AppUtils.routerSpaceHref(SpaceServiceType.DEDICATED_SPACE)}
            render={
              <DedicatedSlider
                spaces={dedicatedSpace}
                serviceType={SpaceServiceType.DEDICATED_SPACE}
              />
            }
          />

        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  getFlexibleDeskList: PropTypes.func,
  getPlanList: PropTypes.func,
  getBannerList: PropTypes.func,
  getSpaceList: PropTypes.func,
  dedicatedDeskList: PropTypes.func,
  getPostList: PropTypes.func,
  partnerList: PropTypes.func,
  profileRequest: PropTypes.func,
  t: PropTypes.func,

  officeSpace: PropTypes.object,
  hotDesk: PropTypes.object,
  profile: PropTypes.object,
  plan: PropTypes.object,
  coworking: PropTypes.object,
  location: PropTypes.object,
  districtSpace: PropTypes.object,
  banner: PropTypes.object,
  dedicatedSpace: PropTypes.object,
  blog: PropTypes.array,
  dedicatedDesk: PropTypes.object,
  partner: PropTypes.object,
  dedicatedDeskType: PropTypes.object,
  currentLanguage: PropTypes.string,
  router: PropTypes.object,
  isAuthenticated: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

const mapStateToProps = (state) => {
  return {
    coworking: state.coworking.data,
    plan: state.plan.data,
    location: state.location.data,
    banner: state.banner.data,
    dedicatedSpace: state.dedicatedSpace.data,
    dedicatedDesk: state.dedicatedDeskGroup.data,
    blog: state.blog.data,
    partner: state.partner.data,
    profile: state.profile.data,
    dedicatedDeskType: state.dedicatedDeskType.data,
    officeSpace: state.officeSpace.list,
    hotDesk: state.hotDesk.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(HomePage)))
