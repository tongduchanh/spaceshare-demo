import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import FilterMobileAction from '../FilterMobile/FilterMobile.redux'
import SearchSpace from '../SearchSpace/SearchSpace'
import { MetaSearch, SpaceServiceType, OrderType } from '../../../constants'
import FilterGroupRadio from '../FilterGroupRadio/FilterGroupRadio'
import FilterGroupCheckbox from '../FilterGroupCheckbox/FilterGroupCheckbox'
import SortMobile from '../FilterMobile/SortMobile'
import FilterInput from '../FilterInput/FilterInput'

import { BackIcon } from '../../../icons'
import './FilterModal.style.scss'

const priceList = MetaSearch.PRICE_LIST
const capacityList = MetaSearch.CAPACITY_LIST
const areaList = MetaSearch.AREA_LIST

const optionsSort = [
  { value: OrderType.POPULAR, label: 'Nổi bật nhất' },
  { value: OrderType.DISTANCE, label: 'Gần tôi nhất ' },
  { value: OrderType.REVIEW, label: 'Lượt đánh giá' },
]

class FilterMobileModal extends Component {
  state = {
    districts: [],
    amenities: [],
    price: null,
    capacity: null,
    area: null,
    capacity_range: null,
    dropdownPriceOpen: false,
    dropdownCapacityOpen: false,
    dropdownAreaOpen: false,
    sort: null,
    search: '',
  }
  componentDidMount() {
    let query = Router.query
    const districtParam = query.districts
    const price_range = query.price_range
    const capacity_range = query.capacity_range
    const area_range = query.area_range
    const amenityParam = query.amenities
    const searchParam = query.search
    this.setState({
      search: searchParam,
      districts: districtParam ? districtParam.split(',') : [],
      priceFilter: price_range
        ? priceList.find((el) => el.id == price_range)
        : {},
      areaFilter: area_range ? areaList.find((el) => el.id == area_range) : {},
      capacityFilter: capacity_range
        ? capacityList.find((el) => el.id == capacity_range)
        : {},
      price_range: price_range ? price_range : null,
      capacity_range: capacity_range ? capacity_range : null,
      area_range: area_range ? area_range : null,
      amenities: amenityParam ? amenityParam.split(',') : [],
    })
  }

  submitSearch = () => {
    let params = new URLSearchParams(this.props.router.query)
    const {
      districts,
      amenities,
      price_range,
      priceFilter,
      search,
      area_range,
      areaFilter,
      capacity_range,
      capacityFilter,
    } = this.state
    const amenityParam = amenities.join(',')
    const districtParam = districts.join(',')
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search', search)
    }
    if (price_range) {
      params.set('from_price', priceFilter.from)
      params.set('to_price', priceFilter.to)
      params.set('price_range', price_range)
    } else {
      params.delete('price_range', price_range)
      params.delete('to_price')
      params.delete('from_price')
    }

    if (capacity_range) {
      params.set('from_capacity', capacityFilter.from)
      params.set('to_capacity', capacityFilter.to)
      params.set('capacity_range', capacity_range)
    } else {
      params.delete('capacity_range', capacity_range)
      params.delete('from_capacity')
      params.delete('to_capacity')
    }

    if (area_range) {
      params.set('from_area', areaFilter.from)
      params.set('to_area', areaFilter.to)
      params.set('area_range', area_range)
    } else {
      params.delete('area_range', area_range)
      params.delete('from_area')
      params.delete('to_area')
    }

    // set param amenities
    if (amenityParam.length > 0) {
      params.set('amenities', amenityParam)
    } else {
      params.delete('amenities')
    }
    // set param districts
    if (districtParam.length > 0) {
      params.set('districts', districtParam)
    } else {
      params.delete('districts')
    }
    this.props.setPopupFilterOpen(false)
    const href = `/office?${params.toString()}`
    const as = `/office?${params.toString()}`
    Router.push(href, as, { shallow: true })
  }
  handleClear = () => {
    this.setState(
      {
        districts: [],
        amenities: [],
        price_range: null,
        capacity_range: null,
        area_range: null,
      },
      () => {
        this.submitSearch()
      },
    )
  }
  handleCheck = (e) => {
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

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
    if (name === 'price_range') {
      let priceFilter = priceList.find((el) => el.id == value)
      this.setState({
        priceFilter: priceFilter,
      })
    }
    if (name === 'capacity_range') {
      let capacityFilter = capacityList.find((el) => el.id == value)
      this.setState({
        capacityFilter: capacityFilter,
      })
    }
    if (name === 'area_range') {
      let areaFilter = areaList.find((el) => el.id == value)
      this.setState({
        areaFilter: areaFilter,
      })
    }
  }

  handleSelect = (val) => {
    this.setState({ sort: val })
  }

  componentDidUpdate(props) {
    if (props.popupFilterOpen !== this.props.popupFilterOpen) {
      if (this.props.popupFilterOpen) {
        document.body.classList.add('body-overflow-hidden')
      } else {
        document.body.classList.remove('body-overflow-hidden')
      }
    }
  }
  closePopup = () => {
    this.props.setPopupFilterOpen(false)
  }
  render() {
    const { popupFilterOpen } = this.props
    const {
      districts,
      price_range,
      capacity_range,
      area_range,
      amenities,
      sort,
      search
    } = this.state
    const districtList = this.props.district?.data?.results
    const spaceServiceAmenity = this.props.spaceServiceAmenity?.data
    return (
      <React.Fragment>
        {popupFilterOpen && (
          <div className="modal-filter">
            <div className="modal-filter__header">
              <div
                className="modal-filter__header-icon"
                onClick={this.closePopup}
              >
                <BackIcon />
              </div>
              <div className="modal-filter__header-title">
                Bộ lọc và sắp xếp
              </div>
            </div>
            <div className="modal-filter__body">
              <div className="modal-filter__group">
                <div className="modal-filter__group-head">Sắp xếp theo</div>
                <SortMobile
                  options={optionsSort}
                  onChange={this.handleSelect}
                  defaultValue={sort}
                  placeholder="Sắp xếp theo"
                />
              </div>
              <div className="modal-filter__group">
                <div className="modal-filter__group-head">Chọn lọc theo:</div>
                <div className="filterItem__group">
                  <div className="filterItem__title">
                    Tìm kiếm địa điểm, dịch vụ
                  </div>
                  <FilterInput
                    name="search"
                    value={search}
                    onChange={this.handleChange}
                    onSubmit={this.submitSearch}
                  />
                </div>
                {/* <FilterGroupCheckbox
                  title="Khu vực"
                  name="districts"
                  dataList={districtList}
                  value={districts}
                  onChange={this.handleCheck}
                /> */}
                <FilterGroupRadio
                  title="Giá dịch vụ"
                  checkBoxList={priceList}
                  name="price_range"
                  value={price_range}
                  onChange={this.handleChange}
                />
                <FilterGroupRadio
                  title="Số lượng khách"
                  checkBoxList={capacityList}
                  name="capacity_range"
                  value={capacity_range}
                  onChange={this.handleChange}
                />
                <FilterGroupRadio
                  title="Diện tích"
                  checkBoxList={areaList}
                  name="area_range"
                  value={area_range}
                  onChange={this.handleChange}
                />
                {spaceServiceAmenity.map((val, key) => (
                  <FilterGroupCheckbox
                    title={val.category}
                    name="amenities"
                    dataList={val.amenity.map((item) => {
                      return {
                        id: item.space_amenity_meta,
                        name: item.name,
                      }
                    })}
                    value={amenities}
                    onChange={this.handleCheck}
                    key={key}
                  />
                ))}
              </div>
            </div>
            <div className="modal-filter__footer">
              <Button
                className="filterButton__apply"
                color="warning"
                onClick={this.submitSearch}
              >
                Xác nhận
              </Button>
              <Button
                className="filterButton__cancel"
                color="warning"
                outline
                onClick={this.handleClear}
              >
                Xóa
              </Button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

FilterMobileModal.propTypes = {
  setPopupFilterOpen: PropTypes.func,
  district: PropTypes.object,
  spaceServiceAmenity: PropTypes.object,
  popupFilterOpen: PropTypes.bool,
  router: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    popupFilterOpen: state.filterMobile.popupFilterOpen,
    district: state.location.data,
    spaceServiceAmenity: state.spaceServiceAmenity.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPopupFilterOpen: (data) =>
    dispatch(FilterMobileAction.setPopupFilterOpen(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FilterMobileModal))
