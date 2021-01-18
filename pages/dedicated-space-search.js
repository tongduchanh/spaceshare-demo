import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { hide, show } from 'redux-modal'

import LocationActions from '../redux/_location-redux'
import CommonActions from '../redux/_common-redux'
import ActivityTypeActions from '../redux/_activity-type-redux'
import SpaceServiceAmenityActions from '../redux/_space-service-amenity-redux'
import DedicatedSpaceActions from '../redux/dedicated-space/_dedicated-space-redux'
import DedicatedUserTypeActions from '../redux/dedicated-space/_dedicated-user-type-redux'

import Layout from '../components/layouts/layout'
import AdvanceSearch from '../components/advance-search'
import DedicatedList from '../components/dedicated-space/dedicated-list'
import Section from '../components/section/section'
import DistrictSlider from '../components/event-spaces/district-slider'
import ServiceLoader from '../components/content-loader/service-loader'
import EventType from '../components/event-spaces/EventTop'

import { i18n, withTranslation } from '../i18n'
import { SpaceServiceType, DefaultValue } from '../constants'

const provinceList = DefaultValue.provinceList

class EventPage extends React.Component {
  static async getInitialProps({ store, req, query }) {
    const currentLanguage = req ? req.language : i18n.language
    const districts = query.districts
    const use_types = query.use_types
    const amenities = query.amenities
    const search = query.search
    const is_instant_booking = query.is_instant_booking
    const rate_type = query.rate_type
    const from_price = query.from_price
    const to_price = query.to_price
    const ordering = query.ordering
    const latitude = query.latitude
    const longitude = query.longitude
    const from_area = query.from_area
    const to_area = query.to_area
    const from_capacity = query.from_capacity
    const to_capacity = query.to_capacity
    const provinces = query.provinces
    const page = query.page || DefaultValue.PAGE

    // fetch data event space
    const data = {
      limit: DefaultValue.LIMIT_LIST,
      offset: (page - 1) * DefaultValue.LIMIT_LIST,
      ...(districts && { districts: districts }),
      ...(use_types && { use_types: use_types }),
      ...(amenities && { amenities: amenities }),
      ...(is_instant_booking && { is_instant_booking: is_instant_booking }),
      ...(rate_type && { rate_type: rate_type }),
      ...(from_price && { from_price: from_price }),
      ...(to_price && { to_price: to_price }),
      ...(search && { search: search }),
      ...(ordering && { ordering: ordering }),
      ...(latitude && { latitude: latitude }),
      ...(longitude && { longitude: longitude }),
      ...(from_area && { from_area: from_area }),
      ...(to_area && { to_area: to_area }),
      ...(from_capacity && { from_capacity: from_capacity }),
      ...(to_capacity && { to_capacity: to_capacity }),
      ...(provinces && { provinces: provinces }),
    }
    store.dispatch(DedicatedSpaceActions.dedicatedSpaceList(data, req ? req.cookies : null))

    // fetch data available district
    const dataDistrict = {
      lang: currentLanguage,
      space_service_type_id: SpaceServiceType.DEDICATED_SPACE,
    }
    store.dispatch(LocationActions.getDistrictList(dataDistrict))

    store.dispatch(ActivityTypeActions.activityTypeList({}))

    // fetch data amenity list
    store.dispatch(
      SpaceServiceAmenityActions.getAvailableAmenity({
        lang: currentLanguage,
        space_service_type: SpaceServiceType.DEDICATED_SPACE,
      }),
    )

    // fetch data user type
    store.dispatch(DedicatedUserTypeActions.dedicatedUserType({ lang: currentLanguage }))

    return {
      namespacesRequired: ['common'],
      currentLanguage: currentLanguage,
    }
  }

  state = {
    coworking: [],
    plan: {},
    service: [],
    district: [],
    params: {},
    showMap: false,
    provinceName: 'Spaceshare',
    sectionTitle: '',
    activityTypeName: 'Không gian tổ chức sự kiện',
  }

  componentDidMount() {
    // this.setProvinceName()
    this.setActivityTypeName()
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router
    if (
      query.districts !== prevProps.router.query.districts ||
      query.amenities !== prevProps.router.query.amenities ||
      query.use_types !== prevProps.router.query.use_types ||
      query.is_instant_booking !== prevProps.router.query.is_instant_booking ||
      query.search !== prevProps.router.query.search ||
      query.rate_type !== prevProps.router.query.rate_type ||
      query.from_price !== prevProps.router.query.from_price ||
      query.to_price !== prevProps.router.query.to_price ||
      query.latitude !== prevProps.router.query.latitude ||
      query.longitude !== prevProps.router.query.longitude ||
      query.ordering !== prevProps.router.query.ordering ||
      query.from_area !== prevProps.router.query.from_area ||
      query.to_area !== prevProps.router.query.to_area ||
      query.from_capacity !== prevProps.router.query.from_capacity ||
      query.to_capacity !== prevProps.router.query.to_capacity ||
      query.provinces !== prevProps.router.query.provinces
    ) {
      this.getSpaceList()
    }
  }

  setActivityTypeName = () => {
    const use_types = this.props.router.query.use_types
    let activityTypeName = this.state.activityTypeName
    if (use_types) {
      activityTypeName = this.props.userType?.data?.results.filter(
        (el) => el.id == use_types,
      )[0].name
    }
    this.setState({ activityTypeName }, () => {
      const province = this.props.router.query.provinces
      let provinceName = this.state.provinceName
      if (province == 1) {
        provinceName = 'Hà Nội'
      } else if (province == 3) {
        provinceName = 'Hồ Chí Minh'
      }
      this.setState(
        {
          provinceName,
        },
        () => {
          this.setState({
            sectionTitle: `${this.state.activityTypeName} tại ${this.state.provinceName}`,
          })
        },
      )
    })
  }

  // Lấy danh sách space từ client (client only)
  getSpaceList() {
    const query = this.props.router.query
    const districts = query.districts
    const amenities = query.amenities
    const use_types = query.use_types
    const search = query.search
    const is_instant_booking = query.is_instant_booking
    const rate_type = query.rate_type
    const from_price = query.from_price
    const to_price = query.to_price
    const latitude = query.latitude
    const longitude = query.longitude
    const ordering = query.ordering
    const from_area = query.from_area
    const to_area = query.to_area
    const from_capacity = query.from_capacity
    const to_capacity = query.to_capacity
    const provinces = query.provinces
    const page = query.page || DefaultValue.PAGE
    const requestData = {
      limit: DefaultValue.LIMIT_LIST,
      offset: (page - 1) * DefaultValue.LIMIT_LIST,
      ...(districts && { districts: districts }),
      ...(use_types && { use_types: use_types }),
      ...(amenities && { amenities: amenities }),
      ...(is_instant_booking && { is_instant_booking: is_instant_booking }),
      ...(rate_type && { rate_type: rate_type }),
      ...(from_price && { from_price: from_price }),
      ...(to_price && { to_price: to_price }),
      ...(search && { search: search }),
      ...(latitude && { latitude: latitude }),
      ...(longitude && { longitude: longitude }),
      ...(ordering && { ordering: ordering }),
      ...(from_area && { from_area: from_area }),
      ...(to_area && { to_area: to_area }),
      ...(from_capacity && { from_capacity: from_capacity }),
      ...(to_capacity && { to_capacity: to_capacity }),
      ...(provinces && { provinces: provinces }),
    }
    this.setActivityTypeName()
    this.props.dedicatedSpaceList(requestData)
  }

  handleSwitch = (checked) => {
    this.setState({
      showMap: checked,
    })
  }

  render() {
    const district = this.props.district?.data?.results
    const spaces = this.props.space?.data?.results
    const total = this.props.space?.data?.count
    const spaceServiceAmenity = this.props.spaceServiceAmenity?.data
    const userType = this.props.userType?.data?.results
    const { t } = this.props
    const additionalService = [
      {
        id: 1,
        name: t('party-space-short'),
        feature_image: 'https://spaceshare.s3.amazonaws.com/media/space_photos/party.jpg',
        href: '/party',
        as: '/party',
      },
    ]
    return (
      <Layout {...this.props}>
        <Head>
          <title>{this.props.t('title-event')}</title>
        </Head>

        <AdvanceSearch
          districtList={district}
          checked={this.state.showMap}
          searchPage={SpaceServiceType.DEDICATED_SPACE}
          spaceServiceAmenity={spaceServiceAmenity}
          isSearchAmenity
          isInstantBooking
          isSearchPrice
          isFilterArea
          isFilterCapacity
          isSearchLocation={this.props.router.query.provinces ? true : false}
        />
        {!userType ? (
          <ServiceLoader />
        ) : (
          <Section
            title={t('explore-spaceshare')}
            render={
              <EventType
                type={SpaceServiceType.DEDICATED_SPACE}
                activityType={userType}
              />
            }
          />
        )}

        <Section
          title={this.state.sectionTitle}
          subTitle={t('dedicated-space-desc')}
          showSubtitle
          showFilter
          searchPage={SpaceServiceType.DEDICATED_SPACE}
          render={
            <DedicatedList
              spaces={spaces}
              total={total}
              showMap={this.state.showMap}
              processing={this.props.processing}
              serviceType={SpaceServiceType.DEDICATED_SPACE}
              isSearch
            />
          }
        />
      </Layout>
    )
  }
}

EventPage.propTypes = {
  dedicatedSpaceList: PropTypes.func,
  listService: PropTypes.func,
  activityTypeList: PropTypes.func,
  getBannerList: PropTypes.func,
  t: PropTypes.func,

  plan: PropTypes.object,
  space: PropTypes.object,
  district: PropTypes.object,
  service: PropTypes.object,
  banner: PropTypes.object,
  currentLanguage: PropTypes.string,
  router: PropTypes.object,
  activityType: PropTypes.object,
  params: PropTypes.object,
  profile: PropTypes.object,
  spaceServiceAmenity: PropTypes.object,
  userType: PropTypes.object,
  processing: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    space: state.dedicatedSpace.data,
    processing: state.dedicatedSpace.processing,
    district: state.location.data,
    activityType: state.activityType.data,
    spaceServiceAmenity: state.spaceServiceAmenity.data,
    userType: state.dedicatedUserType.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ show, hide }, dispatch),
  dedicatedSpaceList: (data) => dispatch(DedicatedSpaceActions.dedicatedSpaceList(data)),
  getDistrictList: (data, cookies, type_api) =>
    dispatch(LocationActions.getDistrictList(data, cookies, type_api)),
  listService: (data) => dispatch(CommonActions.listService(data)),
  activityTypeList: (data) => dispatch(ActivityTypeActions.activityTypeList(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(EventPage)))
