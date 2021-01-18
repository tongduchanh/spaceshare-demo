import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Router, { withRouter } from 'next/router'

import { SpaceServiceType, OrderType } from '../../../constants'

class Sort extends React.Component {
  getOrderOption = () => {
    const { searchPage } = this.props
    let results = []
    if (searchPage === SpaceServiceType.FLEXIBLE_DESK) {
      results = [
        { value: OrderType.POPULAR, label: 'Nổi bật nhất' },
        { value: OrderType.DISTANCE, label: 'Gần tôi nhất ' },
        { value: OrderType.REVIEW, label: 'Lượt đánh giá' },
      ]
    } else if (searchPage === SpaceServiceType.DEDICATED_SPACE) {
      results = [
        { value: OrderType.POPULAR, label: 'Nổi bật nhất' },
        { value: OrderType.DISTANCE, label: 'Gần tôi nhất ' },
        { value: OrderType.PRICING_DESC, label: 'Giá cao nhất' },
        { value: OrderType.PRICING_ASC, label: 'Giá thấp nhất' },
        { value: OrderType.CAPACITY_DESC, label: 'Sức chứa cao nhất' },
        { value: OrderType.CAPACITY_ASC, label: 'Sức chứa thấp nhất' },
        { value: OrderType.AREA_DESC, label: 'Diện tích lớn nhất' },
        { value: OrderType.AREA_ASC, label: 'Diện tích nhỏ nhất' },
      ]
    } else if (
      searchPage === SpaceServiceType.OFFICE_SPACE ||
      searchPage === SpaceServiceType.HOT_DESK
    ) {
      results = [
        { value: OrderType.POPULAR, label: 'Nổi bật nhất' },
        { value: OrderType.DISTANCE, label: 'Gần tôi nhất ' },
        { value: OrderType.PRICING_DESC, label: 'Giá cao nhất' },
        { value: OrderType.PRICING_ASC, label: 'Giá thấp nhất' },
      ]
    }
    return results
  }

  handleSelect = (selectedOption) => {
    const value = selectedOption.value
    if (value == OrderType.DISTANCE) {
      this.orderByDistance(value)
    } else {
      this.ordering(value)
    }
  }

  ordering = (value) => {
    let params = new URLSearchParams(this.props.router.query)
    params.set('ordering', value)
    params.delete('latitude')
    params.delete('longitude')
    const { searchPage } = this.props
    this.pushParams(params, searchPage)
  }

  orderByDistance() {
    const success = (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      let params = new URLSearchParams(this.props.router.query)
      params.set('ordering', 'distance')
      params.set('latitude', latitude)
      params.set('longitude', longitude)
      const { searchPage } = this.props
      this.pushParams(params, searchPage)
    }

    function error() {
      console.warn('Unable to retrieve your location')
    }

    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  pushParams = (params, searchPage) => {
    if (searchPage === SpaceServiceType.FLEXIBLE_DESK) {
      const href = `/coworking-search?${params.toString()}`
      const as = `/s/coworking?${params.toString()}`
      Router.push(href, as, { shallow: true }).then(() => window.scrollTo(0, 0))
    } else if (searchPage === SpaceServiceType.DEDICATED_SPACE) {
      const href = `/dedicated-space-search?${params.toString()}`
      const as = `/s/event-spaces?${params.toString()}`
      Router.push(href, as, { shallow: true })
    } else if (searchPage === SpaceServiceType.PARTY_SPACE) {
      const href = `/party?${params.toString()}`
      const as = `/party?${params.toString()}`
      Router.push(href, as, { shallow: true })
    } else if (searchPage === SpaceServiceType.OFFICE_SPACE) {
      const href = `/office?${params.toString()}`
      const as = `/office?${params.toString()}`
      Router.push(href, as, { shallow: true })
    } else if (searchPage === SpaceServiceType.HOT_DESK) {
      const href = `/hot-desk-search?${params.toString()}`
      const as = `/s/hot-desk?${params.toString()}`
      Router.push(href, as, { shallow: true })
    }
  }

  render() {
    const options = this.getOrderOption()
    const defaultOption = options.filter(
      (el) => el.value == this.props.router.query.ordering,
    )

    return (
      <div className="ordering" style={{ width: '200px' }}>
        <Select
          className="react-select"
          classNamePrefix="react-select-input"
          options={options}
          onChange={this.handleSelect}
          placeholder="Sắp xếp theo"
          defaultValue={defaultOption}
        />
      </div>
    )
  }
}

Sort.propTypes = {
  router: PropTypes.object,
  searchPage: PropTypes.any,
}

export default withRouter(Sort)
