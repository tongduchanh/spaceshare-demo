import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
} from 'reactstrap'
import Router, { withRouter } from 'next/router'
import './FilterOffice.scss'

import FilterDropdown from '../FilterDropdown/FitlerDropdown'
import FilterInput from '../FilterInput/FilterInput'
import { MetaSearch } from '../../../constants'

const priceList = MetaSearch.PRICE_LIST
const capacityList = MetaSearch.CAPACITY_LIST
const areaList = MetaSearch.AREA_LIST

class FilterOffice extends React.Component {
  state = {
    price: null,
    capacity: null,
    area: null,
    amenities: [],
    search: '',
    dropdownPriceOpen: false,
    dropdownCapacityOpen: false,
    dropdownAreaOpen: false,
  }
  componentDidMount() {
    let query = Router.query
    const priceRange = query.price_range
    const capacityRange = query.capacity_range
    const areaRange = query.area_range
    const amenityParam = query.amenities
    const searchParam = query.search
    const price = priceList.find((el) => el.id == priceRange)
    const capacity = capacityList.find((el) => el.id == capacityRange)
    const area = areaList.find((el) => el.id == areaRange)
    this.setState({
      price: price ? price : null,
      capacity: capacity ? capacity : null,
      area: area ? area : null,
      search: searchParam,
      amenities: amenityParam ? amenityParam.split(',') : [],

    })
  }
  submitSearch = () => {
    let params = new URLSearchParams(this.props.router.query)
    const { price, capacity, area, amenities, search } = this.state
    const amenityParam = amenities.join(',')
    if (price) {
      params.set('from_price', price.from)
      params.set('to_price', price.to)
      params.set('price_range', price.id)
    }

    if (capacity) {
      params.set('from_capacity', capacity.from)
      params.set('to_capacity', capacity.to)
      params.set('capacity_range', capacity.id)
    }

    if (area) {
      params.set('from_area', area.from)
      params.set('to_area', area.to)
      params.set('area_range', area.id)
    }

    // set param amenities
    if (amenityParam.length > 0) {
      params.set('amenities', amenityParam)
    } else {
      params.delete('amenities')
    }
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search', search)
    }
    const href = `/office?${params.toString()}`
    const as = `/office?${params.toString()}`
    Router.push(href, as, { shallow: true })
  }
  selectPrice = (price) => {
    this.setState({ price: price }, () => {
      this.togglePrice()
      this.submitSearch()
    })
  }
  selectCapacity = (capacity) => {
    this.setState({ capacity: capacity }, () => {
      this.toggleCapacity()
      this.submitSearch()
    })
  }
  selectArea = (area) => {
    this.setState({ area: area }, () => {
      this.toggleArea()
      this.submitSearch()
    })
  }
  togglePrice = () => {
    this.setState({
      dropdownPriceOpen: !this.state.dropdownPriceOpen,
    })
  }
  toggleCapacity = () => {
    this.setState({
      dropdownCapacityOpen: !this.state.dropdownCapacityOpen,
    })
  }
  toggleArea = () => {
    this.setState({
      dropdownAreaOpen: !this.state.dropdownAreaOpen,
    })
  }
  handleCheck = (e) => {
    const name = e.target.name
    let itemChecked
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
    this.setState(
      {
        [e.target.name]: itemChecked,
      },
      () => {
        this.submitSearch()
      },
    )
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const {
      price,
      capacity,
      area,
      amenities,
      search,
      dropdownPriceOpen,
      dropdownCapacityOpen,
      dropdownAreaOpen,
    } = this.state
    const { amenityList } = this.props
    return (
      <div className="filter-box">
        <div className="filter-item">
          <div className="filter-item__label">Tìm kiếm địa điểm, dịch vụ</div>
          <FilterInput 
            name="search"
            value={search}
            onChange={this.handleChange}
            onSubmit={this.submitSearch}
          />
        </div>
        <div className="filter-item">
          <div className="filter-item__label">Lọc theo khoảng giá</div>
          <div className="filter-item__input input-select">
            <FilterDropdown
              toggle={this.togglePrice}
              dropdownOpen={dropdownPriceOpen}
              dropdownPlaceholder={'Lọc theo khoảng giá'}
              dropdownValue={price?.name || ''}
              dropdownList={priceList}
              selectValue={(val) => this.selectPrice(val)}
            />
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-item__label">Số lượng khách </div>
          <div className="filter-item__input input-select">
            <FilterDropdown
              toggle={this.toggleCapacity}
              dropdownOpen={dropdownCapacityOpen}
              dropdownPlaceholder={'Số lượng khách'}
              dropdownValue={capacity?.name || ''}
              dropdownList={capacityList}
              selectValue={(val) => this.selectCapacity(val)}
            />
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-item__label">Thêm diện tích</div>
          <div className="filter-item__input input-select">
            <FilterDropdown
              toggle={this.toggleArea}
              dropdownOpen={dropdownAreaOpen}
              dropdownPlaceholder={'Chọn diện tích phòng'}
              dropdownValue={area?.name || ''}
              dropdownList={areaList}
              selectValue={(val) => this.selectArea(val)}
            />
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-item__label">Tiện tích riêng</div>
          <div className="filter-item__body">
            {amenityList &&
              amenityList.map((val, key) => (
                <div key={key} className="filter-item__group">
                  <Row className="amenity-row">
                    <Col xs="12">
                      <span className="filter-item__group-title">{val.category}</span>
                    </Col>
                    <Col xs="12">
                      <Row style={{ marginTop: '6px' }}>
                        {val.amenity.map((val, key) => (
                          <Col xs="12" key={key}>
                            <FormGroup check key={key}>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  id={val.space_amenity_meta}
                                  name="amenities"
                                  value={val.space_amenity_meta}
                                  checked={amenities.includes(
                                    val.space_amenity_meta.toString(),
                                  )}
                                  onChange={this.handleCheck}
                                />{' '}
                                <span className="checkmark" />
                                {val.name}
                              </Label>
                            </FormGroup>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

FilterOffice.propTypes = {
  router: PropTypes.object,
  amenityList: PropTypes.array,
}

export default withRouter(FilterOffice)
