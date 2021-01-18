import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

function PriceFilter(props) {
  const {
    area_range,
    handleChangeInput,
    t,
    area_list,
  } = props

  return (
    <div className="search__body">
      <div className="title mt--12 mb--12">Diện tích</div>
      {area_list.map((val, key) => (
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="radio"
              id={val.name}
              name="area_range"
              value={val.id}
              checked={area_range == val.id}
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

PriceFilter.propTypes = {
  handleChangeInput: PropTypes.func,
  t: PropTypes.func,
  area_range: PropTypes.any,
  area_list: PropTypes.array
}

export default PriceFilter
