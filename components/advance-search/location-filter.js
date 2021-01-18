import React from 'react'
import {FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

function LocationFilter(props) {
  const { districts, districtList, handleChange } = props
  return (
    <div className="search__body">
      {districtList &&
        districtList.map((val, key) => (
          <FormGroup check key={key}>
            <Label check>
              <Input
                type="checkbox"
                id={val.name}
                name="districts"
                value={val.id}
                checked={districts.includes(val.id.toString())}
                onChange={handleChange}
              />{' '}
              <span className="checkmark" />
              {val.name}
            </Label>
          </FormGroup>
        ))}
    </div>
  )
}

LocationFilter.propTypes = {
  handleChange: PropTypes.func,
  districts: PropTypes.array,
  districtList: PropTypes.array

}
export default LocationFilter
