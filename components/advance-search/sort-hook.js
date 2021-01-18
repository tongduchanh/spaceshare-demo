import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { withRouter } from 'next/router'

import { SpaceServiceType, OrderType } from '../../constants'

function Sort(props) {
  const [defaultOption, setDefaultOption] = useState(null)
  const options = () => {
    const { searchPage } = props
    let results = []
    if (searchPage === SpaceServiceType.FLEXIBLE_DESK) {
      results = [
        { value: OrderType.DISTANCE, label: 'Gần bạn' },
        { value: OrderType.REVIEW, label: 'Lượt đánh giá' },
        { value: OrderType.NAMESPACE, label: 'Tên không gian' },
      ]
    } else if (searchPage === SpaceServiceType.DEDICATED_SPACE) {
      results = [
        { value: OrderType.DISTANCE, label: 'Gần bạn' },
        { value: OrderType.REVIEW, label: 'Lượt đánh giá' },
        { value: OrderType.NAMESPACE, label: 'Tên không gian' },
        { value: OrderType.CAPACITY_DESC, label: 'Sức chứa cao nhất' },
        { value: OrderType.CAPACITY_ASC, label: 'Sức chứa thấp nhất' },
        { value: OrderType.AREA_DESC, label: 'Diện tích lớn nhất' },
        { value: OrderType.AREA_ASC, label: 'Diện tích nhỏ nhất' },
      ]
    } else if (searchPage === SpaceServiceType.OFFICE_SPACE) {
      results = [
        { value: OrderType.DISTANCE, label: 'Gần bạn' },
        { value: OrderType.REVIEW, label: 'Lượt đánh giá' },
        { value: OrderType.NAMESPACE, label: 'Tên không gian' },
        { value: OrderType.CAPACITY_DESC, label: 'Sức chứa cao nhất' },
        { value: OrderType.CAPACITY_ASC, label: 'Sức chứa thấp nhất' },
        { value: OrderType.AREA_DESC, label: 'Diện tích lớn nhất' },
        { value: OrderType.AREA_ASC, label: 'Diện tích nhỏ nhất' },
      ]
    }
    return results
  }

  useEffect(() => {
    const defaultOpt = options().filter((el) => el.value == props.router.query.ordering)[0]
    setDefaultOption({ value: OrderType.CAPACITY_DESC, label: 'Sức chứa cao nhất' })
  }, [props.router.query])

  const handleSelect = (selectedOption) => {
    if (selectedOption.value == OrderType.DISTANCE) {
      // orderByDistance()
    } else {
      ordering(selectedOption.value)
    }
  }

  const ordering = (type) => {
    let params = new URLSearchParams(props.router.query)
    const { searchPage } = props
    params.set('ordering', type)
    params.delete('latitude')
    params.delete('longitude')
    props.pushParams(params, searchPage)
  }

  return (
    <div className="order">
      <Select
        id="select"
        className="react-select"
        classNamePrefix="react-select-input"
        options={options()}
        onChange={handleSelect}
        placeholder="Sắp xếp theo"
        isSearchable={false}
        defaultValue={defaultOption}
      />
    </div>
  )
}

Sort.propTypes = {
  pushParams: PropTypes.func,
  router: PropTypes.object,
  searchPage: PropTypes.any,
}

export default withRouter(Sort)
