import React from 'react'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import {
  Container,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import Switch from 'react-switch'
import classnames from 'classnames'
import { withTranslation } from '../i18n'
import { MetaSearch, SpaceServiceType } from '../constants'

import SearchHeader from './advance-search/search-header'
import SearchFooter from './advance-search/search-footer'
import LocationFilter from './advance-search/location-filter'
import AmenityFilter from './advance-search/amanity-filter'
import PriceFilter from './advance-search/price-filter'
import AreaFilter from './advance-search/area-filter'
import CapacityFilter from './advance-search/capacity-filter'

const rateTypeList = [
  { id: 0, name: 'Giá theo giờ' },
  { id: 1, name: 'Giá theo ngày' },
  { id: 2, name: 'Giá theo buổi' },
]
const priceList = [
  { id: 1, name: 'Dưới 5 triệu', from_price: 0, to_price: 5000000 },
  { id: 2, name: '5 - 10 triệu', from_price: 5000000, to_price: 10000000 },
  { id: 3, name: '10 - 20 triệu', from_price: 10000000, to_price: 20000000 },
  { id: 4, name: 'Trên 20 triệu', from_price: 20000000, to_price: '' },
]

const areaList = [
  { id: 1, name: 'Dưới 20 m2', from: 0, to: 20 },
  { id: 2, name: '20 m2 - 50 m2', from: 20, to: 50 },
  { id: 3, name: '50 m2 - 100 m2', from: 50, to: 100 },
  { id: 4, name: 'Lớn hơn 100 m2', from: 100, to: '' },
]
const capacityList = [
  { id: 1, name: `Dưới 5 người`, from: 0, to: 5 },
  { id: 2, name: '5 - 10 người', from: 5, to: 10 },
  { id: 3, name: '10 - 20 người', from: 10, to: 20 },
  { id: 4, name: '20 - 50 người', from: 20, to: 50 },
  { id: 5, name: 'Trên 50 người', from: 50, to: '' },
]

class AdvanceSearch extends React.Component {
  state = {
    checked: false,
    dropdownOpen: false,
    type: null,
    districts: [],
    amenities: [],
    rate_type: null,
    available_today: false,
    is_instant_booking: false,
    from_price: '',
    to_price: '',
    price_range_default: null,
    price_range: null,
    windowWidth: 0,
    selectedOption: {},

    area_range: null,
    from_area: null,
    to_area: null,
    area_filter_text: '',

    capacity_range: null,
    from_capacity: null,
    to_capacity: null,
    capacity_filter_text: '',
  }

  setWidth = () => {
    this.setState({
      windowWidth: window.innerWidth,
    })
  }

  componentDidMount() {
    let query = Router.query
    const districtParam = query.districts
    const amenityParam = query.amenities
    const available_today = query.available_today
    const is_instant_booking = query.is_instant_booking
    const rate_type = query.rate_type
    const price_range = query.price_range
    const from_price = query.from_price
    const to_price = query.to_price
    // get area range from query
    const from_area = query.from_area
    const to_area = query.to_area
    const area_range = query.area_range

    // get capacity_range from query
    const capacity_range = query.capacity_range
    const from_capacity = query.from_capacity
    const to_capacity = query.to_capacity

    this.setState({
      districts: districtParam ? districtParam.split(',') : [],
      amenities: amenityParam ? amenityParam.split(',') : [],
      rate_type: rate_type ? rate_type : null,
      price_range: price_range ? price_range : null,
      available_today: available_today ? available_today : false,
      is_instant_booking: is_instant_booking ? is_instant_booking : false,
      from_price: from_price ? from_price : '',
      to_price: to_price ? to_price : '',
      price_range_default: price_range ? price_range : null,
      price_filter_text: price_range
        ? priceList.filter((el) => el.id == price_range)[0].name
        : '',
      to_price_default: to_price ? to_price : null,
    })
    //set area range query
    this.setState({
      from_area: from_area ? from_area : null,
      to_area: to_area ? to_area : null,
      area_range: area_range ? area_range : null,
      area_range_default: area_range ? area_range : null,
      area_filter_text: area_range
        ? areaList.filter((el) => el.id == area_range)[0].name
        : '',
    })

    //set capacity range range
    this.setState({
      from_capacity: from_capacity ? from_capacity : null,
      to_capacity: to_capacity ? to_capacity : null,
      capacity_range: capacity_range ? capacity_range : null,
      capacity_range_default: capacity_range ? capacity_range : null,
      capacity_filter_text: capacity_range
        ? capacityList.filter((el) => el.id == capacity_range)[0]?.name
        : '',
    })
    // Tính chiều rộng window để hiển thị responsive cho datepicker
    this.setState({
      windowWidth: window.innerWidth,
    })
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth)
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.router
    if (query.from_price !== prevProps.router.query.from_price) {
      this.setState({ from_price_default: query.from_price })
    }
    if (query.to_price !== prevProps.router.query.to_price) {
      this.setState({ to_price_default: query.to_price })
    }
    if (query.price_range !== prevProps.router.query.price_range) {
      this.setState({ price_range_default: query.price_range })
    }
    if (query.area_range !== prevProps.router.query.area_range) {
      this.setState({ area_range_default: query.area_range })
    }
    if (query.capacity_range !== prevProps.router.query.capacity_range) {
      this.setState({ capacity_range_default: query.capacity_range })
    }
  }

  // Set state khi thay đổi form check
  handleChange = (e) => {
    const name = e.target.name
    let itemChecked
    if (name == 'districts') {
      itemChecked = this.state.districts
    }
    if (name == 'amenities') {
      itemChecked = this.state.amenities
    }

    const value = e.target.value
    const isChecked = e.target.checked
    if (isChecked === false) {
      itemChecked = itemChecked.filter((item) => item !== value)
    } else {
      itemChecked.push(value)
    }

    this.setState({
      [e.target.name]: itemChecked,
    })
  }

  handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
    if (name === 'price_range') {
      let priceFilter = priceList.find((el) => el.id == value)
      this.setState({
        price_filter_text: priceFilter.name,
        from_price: priceFilter.from_price,
        to_price: priceFilter.to_price,
      })
    }
    if (name === 'area_range') {
      let areaFilter = areaList.find((el) => el.id == value)
      this.setState({
        area_filter_text: areaFilter.name,
        from_area: areaFilter.from,
        to_area: areaFilter.to,
      })
    }
    if (name === 'capacity_range') {
      let capacityFilter = capacityList.find((el) => el.id == value)
      this.setState({
        capacity_filter_text: capacityFilter?.name,
        from_capacity: capacityFilter?.from,
        to_capacity: capacityFilter?.to,
      })
    }
  }

  handleSwitch = (checked) => {
    this.props.handleSwitch(checked)
  }

  toggle = (type) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      type: type,
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.checked !== state.checked) {
      return {
        checked: props.checked,
      }
    }
    return null
  }

  searchAvailable = () => {
    this.setState(
      (prevState) => ({
        available_today: !prevState.available_today,
      }),
      () => {
        this.handleSearch()
      },
    )
  }

  searchInstantBooking = () => {
    this.setState(
      (prevState) => ({
        is_instant_booking: !prevState.is_instant_booking,
      }),
      () => {
        this.handleSearch()
      },
    )
  }

  handleSearch = () => {
    const {
      districts,
      available_today,
      amenities,
      is_instant_booking,
      rate_type,
      from_price,
      to_price,
      price_range,
      area_range,
      from_area,
      to_area,
      capacity_range,
      from_capacity,
      to_capacity,
    } = this.state
    const { searchPage } = this.props
    const districtParam = districts.join(',')
    const amenityParam = amenities.join(',')
    this.setState({
      dropdownOpen: false,
    })
    let params = new URLSearchParams(this.props.router.query)

    // set param districts
    if (districtParam.length > 0) {
      params.set('districts', districtParam)
    } else {
      params.delete('districts')
    }

    // set param amenities
    if (amenityParam.length > 0) {
      params.set('amenities', amenityParam)
    } else {
      params.delete('amenities')
    }

    // set param available_today
    if (available_today) {
      params.set('available_today', available_today)
    } else {
      params.delete('available_today')
    }

    // set param is_instant_booking
    if (is_instant_booking) {
      params.set('is_instant_booking', is_instant_booking)
    } else {
      params.delete('is_instant_booking')
    }

    // set param rate_type
    if (rate_type) {
      params.set('rate_type', rate_type)
    } else {
      params.delete('rate_type')
    }

    // set param price_range
    if (price_range) {
      params.set('price_range', price_range)
      params.set('from_price', from_price)
      params.set('to_price', to_price)
    } else {
      params.delete('price_range', price_range)
      params.delete('to_price')
      params.delete('from_price')
    }

    // set param area_range
    if (area_range) {
      params.set('area_range', area_range)
      params.set('from_area', from_area)
      params.set('to_area', to_area)
    } else {
      params.delete('area_range', area_range)
      params.delete('from_area')
      params.delete('to_area')
    }

    // set param capacity range
    if (capacity_range) {
      params.set('capacity_range', capacity_range)
      params.set('from_capacity', from_capacity)
      params.set('to_capacity', to_capacity)
    } else {
      params.delete('capacity_range', capacity_range)
      params.delete('from_capacity')
      params.delete('to_capacity')
    }
    params.delete('page')
    this.pushParams(params, searchPage)
  }

  pushParams = (params, searchPage) => {
    const href = `/event-spaces?${params.toString()}`
    const as = `/event-spaces?${params.toString()}`
    Router.push(href, as, { shallow: true })
  }

  handleResetRateTypeForm = (e) => {
    e.preventDefault()
    this.setState(
      {
        rate_type: null,
        price_range: null,
        to_price: '',
        from_price: '',
      },
      () => {
        const query = this.props.router.query
        const rate_type = query.rate_type
        const to_price = query.to_price
        const from_price = query.from_price
        if (rate_type || to_price || from_price) {
          this.handleSearch()
        }
      },
    )
  }
  handleResetAreaForm = (e) => {
    e.preventDefault()
    this.setState(
      {
        area_range: null,
        to_area: null,
        from_area: null,
      },
      () => {
        const query = this.props.router.query
        const area_range = query.area_range
        const to_area = query.to_area
        const from_area = query.from_area
        if (area_range || to_area || from_area) {
          this.handleSearch()
        }
      },
    )
  }

  handleResetCapacityForm = (e) => {
    e.preventDefault()
    this.setState(
      {
        capacity_range: null,
        from_capacity: null,
        to_capacity: null,
      },
      () => {
        const query = this.props.router.query
        const capacity_range = query.capacity_range
        const from_capacity = query.from_capacity
        const to_capacity = query.to_capacity
        if (capacity_range || from_capacity || to_capacity) {
          this.handleSearch()
        }
      },
    )
  }

  handleResetDistrictForm = (e) => {
    e.preventDefault()
    this.setState(
      {
        districts: [],
      },
      () => {
        const query = this.props.router.query
        const districts = query.districts
        if (districts) {
          this.handleSearch()
        }
      },
    )
  }

  handleResetAmenityForm = (e) => {
    e.preventDefault()
    this.setState(
      {
        amenities: [],
      },
      () => {
        const query = this.props.router.query
        const amenities = query.amenities
        if (amenities) {
          this.handleSearch()
        }
      },
    )
  }

  render() {
    const {
      type,
      districts,
      rate_type,
      available_today,
      amenities,
      is_instant_booking,
      from_price,
      to_price,
      windowWidth,
      price_range,
      price_range_default,
      area_range,
      area_range_default,
      area_filter_text,
      capacity_range,
      capacity_range_default,
      capacity_filter_text,
    } = this.state
    const {
      districtList,
      t,
      showChangeMap,
      isAvailableToday,
      spaceServiceAmenity,
      isSearchAmenity,
      isInstantBooking,
      isSearchPrice,
      isSearchLocation,
      isFilterArea,
      isFilterCapacity,
      searchPage,
    } = this.props
    return (
      <div className="advance-search-wrap">
        <div className="advance-search">
          <Container className="search__wrap h-100 align-item-center j-space-between">
            <div className="search__content">
              {isSearchLocation && (
                <div className="search__item">
                  <Dropdown
                    isOpen={this.state.dropdownOpen && type === 'LOCATION'}
                    toggle={() => this.toggle('LOCATION')}
                    className="search__dropdown"
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <Button
                        outline
                        color="gray"
                        className={classnames('btn-custom search__button', {
                          active: districts.length > 0,
                        })}
                      >
                        {t('area')}
                        {districts.length > 0 && (
                          <span className="seach__count">
                            {` · `}
                            {districts.length}
                          </span>
                        )}
                        {districts.length > 0 && (
                          <span
                            className="search__delete"
                            onClick={this.handleResetDistrictForm}
                          >
                            <img src="/static/images/close-search.svg" />
                          </span>
                        )}
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                      {windowWidth < 767 && (
                        <SearchHeader
                          toggle={this.toggle}
                          clear={this.handleResetDistrictForm}
                          disabledClearButton={
                            districts && districts.length === 0
                          }
                        />
                      )}
                      <LocationFilter
                        districts={districts}
                        districtList={districtList}
                        handleChange={this.handleChange}
                      />

                      <SearchFooter
                        search={this.handleSearch}
                        clear={this.handleResetDistrictForm}
                        disabledClearButton={
                          districts && districts.length === 0
                        }
                        windowWidth={windowWidth}
                      />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}

              {isAvailableToday && (
                <div className="search__item">
                  <Button
                    outline
                    color="gray"
                    className={classnames('btn-custom search__button', {
                      active: available_today,
                    })}
                    onClick={this.searchAvailable}
                  >
                    {t('available-today')}
                    {available_today && (
                      <span className="search__delete">
                        <img src="/static/images/close-search.svg" />
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {isInstantBooking && (
                <div className="search__item">
                  <Button
                    outline
                    color="gray"
                    className={classnames('btn-custom search__button', {
                      active: is_instant_booking,
                    })}
                    onClick={this.searchInstantBooking}
                  >
                    {t('instant-book')}
                    {is_instant_booking && (
                      <span className="search__delete">
                        <img src="/static/images/close-search.svg" />
                      </span>
                    )}
                  </Button>
                </div>
              )}
              {isSearchPrice && (
                <div className="search__item">
                  <Dropdown
                    isOpen={this.state.dropdownOpen && type === 'PRICE'}
                    toggle={() => this.toggle('PRICE')}
                    className="search__dropdown"
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <Button
                        outline
                        color="gray"
                        className={classnames('btn-custom search__button', {
                          active: rate_type || price_range_default,
                        })}
                      >
                        {!this.state.price_range ? (
                          <span>{t('service-price')}</span>
                        ) : (
                          <span>{this.state.price_filter_text}</span>
                        )}

                        {(rate_type || price_range_default) && (
                          <span
                            className="search__delete"
                            onClick={this.handleResetRateTypeForm}
                          >
                            <img src="/static/images/close-search.svg" />
                          </span>
                        )}
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                      {windowWidth < 767 && (
                        <SearchHeader
                          toggle={this.toggle}
                          clear={this.handleResetRateTypeForm}
                        />
                      )}

                      <PriceFilter
                        searchPage={searchPage}
                        rateTypeList={rateTypeList}
                        from_price={from_price}
                        to_price={to_price}
                        rate_type={rate_type}
                        price_range={price_range}
                        priceList={priceList}
                        handleChangeInput={this.handleChangeInput}
                        handleChangeFromPrice={this.handleChangeFromPrice}
                        handleChangeToPrice={this.handleChangeToPrice}
                        t={t}
                      />
                      <SearchFooter
                        search={this.handleSearch}
                        clear={this.handleResetRateTypeForm}
                        windowWidth={windowWidth}
                      />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}

              {isFilterCapacity && (
                <div className="search__item">
                  <Dropdown
                    isOpen={this.state.dropdownOpen && type === 'CAPACITY'}
                    toggle={() => this.toggle('CAPACITY')}
                    className="search__dropdown"
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <Button
                        outline
                        color="gray"
                        className={classnames('btn-custom search__button', {
                          active: capacity_range_default,
                        })}
                      >
                        {!capacity_range ? (
                          <React.Fragment>
                            {searchPage === SpaceServiceType.DEDICATED_SPACE ? (
                              <span>Quy mô</span>
                            ) : (
                              <span>Nhân viên</span>
                            )}
                          </React.Fragment>
                        ) : (
                          <span>{capacity_filter_text}</span>
                        )}
                        {capacity_range_default && (
                          <span
                            className="search__delete"
                            onClick={this.handleResetCapacityForm}
                          >
                            <img src="/static/images/close-search.svg" />
                          </span>
                        )}
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                      {windowWidth < 767 && (
                        <SearchHeader
                          toggle={this.toggle}
                          clear={this.handleResetCapacityForm}
                        />
                      )}
                      <CapacityFilter
                        capacity_range={capacity_range}
                        capacity_list={capacityList}
                        handleChangeInput={this.handleChangeInput}
                      />
                      <SearchFooter
                        search={this.handleSearch}
                        clear={this.handleResetCapacityForm}
                        windowWidth={windowWidth}
                      />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}

              {isFilterArea && (
                <div className="search__item">
                  <Dropdown
                    isOpen={this.state.dropdownOpen && type === 'AREA'}
                    toggle={() => this.toggle('AREA')}
                    className="search__dropdown"
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <Button
                        outline
                        color="gray"
                        className={classnames('btn-custom search__button', {
                          active: area_range_default,
                        })}
                      >
                        {!area_range ? (
                          <span>Diện tích</span>
                        ) : (
                          <span>{area_filter_text}</span>
                        )}
                        {area_range_default && (
                          <span
                            className="search__delete"
                            onClick={this.handleResetAreaForm}
                          >
                            <img src="/static/images/close-search.svg" />
                          </span>
                        )}
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                      {windowWidth < 767 && (
                        <SearchHeader
                          toggle={this.toggle}
                          clear={this.handleResetAreaForm}
                        />
                      )}
                      <AreaFilter
                        area_range={area_range}
                        area_list={areaList}
                        handleChangeInput={this.handleChangeInput}
                      />
                      <SearchFooter
                        search={this.handleSearch}
                        clear={this.handleResetAreaForm}
                        windowWidth={windowWidth}
                      />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}

              {isSearchAmenity && (
                <div className="search__item">
                  <Dropdown
                    isOpen={this.state.dropdownOpen && type === 'AMENITY'}
                    toggle={() => this.toggle('AMENITY')}
                    className="search__dropdown"
                  >
                    <DropdownToggle
                      tag="span"
                      onClick={this.toggle}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}
                    >
                      <Button
                        outline
                        color="gray"
                        className={classnames('btn-custom search__button', {
                          active: amenities.length > 0,
                        })}
                      >
                        {t('amenities')}
                        {amenities.length > 0 && (
                          <span className="seach__count">
                            {` · `}
                            {amenities.length}
                          </span>
                        )}
                        {amenities.length > 0 && (
                          <span
                            className="search__delete"
                            onClick={this.handleResetAmenityForm}
                          >
                            <img src="/static/images/close-search.svg" />
                          </span>
                        )}
                      </Button>
                    </DropdownToggle>
                    <DropdownMenu className="search__amenity">
                      {windowWidth < 767 && (
                        <SearchHeader
                          toggle={this.toggle}
                          clear={this.handleResetAmenityForm}
                          disabledClearButton={
                            amenities && amenities.length === 0
                          }
                          searchData={amenities}
                        />
                      )}
                      <AmenityFilter
                        spaceServiceAmenity={spaceServiceAmenity}
                        amenities={amenities}
                        handleChange={this.handleChange}
                      />

                      <SearchFooter
                        search={this.handleSearch}
                        clear={this.handleResetAmenityForm}
                        disabledClearButton={
                          amenities && amenities.length === 0
                        }
                        windowWidth={windowWidth}
                      />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              )}
            </div>

            {showChangeMap && (
              <div className="search__change-map align-item-center">
                <div className="mr-3 fw-7">{t('map')}</div>
                <Switch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#FF6F61"
                  onChange={this.handleSwitch}
                  checked={this.state.checked}
                />
              </div>
            )}
          </Container>
        </div>
        {this.state.dropdownOpen && <div className="overlay" />}
      </div>
    )
  }
}

AdvanceSearch.propTypes = {
  t: PropTypes.func,
  handleSwitch: PropTypes.func,
  districtList: PropTypes.array,
  router: PropTypes.object,
  showChangeMap: PropTypes.bool,
  searchPage: PropTypes.number,
  isAvailableToday: PropTypes.bool,
  spaceServiceAmenity: PropTypes.array,
  isSearchAmenity: PropTypes.bool,
  isInstantBooking: PropTypes.bool,
  isSearchPrice: PropTypes.bool,
  isSearchLocation: PropTypes.bool,
  isFilterArea: PropTypes.bool,
  isFilterCapacity: PropTypes.bool,
}

export default withTranslation('common')(withRouter(AdvanceSearch))
