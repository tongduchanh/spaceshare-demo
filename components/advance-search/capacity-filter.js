import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

function CapacityFilter(props) {
  const {
    capacity_range,
    handleChangeInput,
    t,
    capacity_list,
  } = props

  return (
    <div className="search__body">
      <div className="title mt--12 mb--12">Nhân viên</div>
      {capacity_list.map((val, key) => (
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="radio"
              id={val.name}
              name="capacity_range"
              value={val.id}
              checked={capacity_range == val.id}
              onChange={handleChangeInput}
            />{' '}
            <span className="checkmark" />
            {val.name}
          </Label>
        </FormGroup>
      ))}
    </div>
  )
}

CapacityFilter.propTypes = {
  handleChangeInput: PropTypes.func,
  t: PropTypes.func,
  capacity_range: PropTypes.any,
  capacity_list: PropTypes.array
}

export default CapacityFilter
