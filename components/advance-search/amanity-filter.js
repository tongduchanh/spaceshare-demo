import React from 'react'
import { Row, Col, FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

function AmenityFilter(props) {
  const { amenities, spaceServiceAmenity, handleChange } = props
  return (
    <div className="search__body">
      {spaceServiceAmenity &&
        spaceServiceAmenity.map((val, key) => (
          <div key={key} className="filter_box">
            <Row className="amenity-row">
              <Col xs="12">
                <span className="title">{val.category}</span>
              </Col>
              <Col xs="12">
                <Row style={{ marginTop: '6px' }}>
                  {val.amenity.map((val, key) => (
                    <Col md="6" xs="12" key={key}>
                      <FormGroup check key={key}>
                        <Label check>
                          <Input
                            type="checkbox"
                            id={val.space_amenity_meta}
                            name="amenities"
                            value={val.space_amenity_meta}
                            checked={amenities.includes(val.space_amenity_meta.toString())}
                            onChange={handleChange}
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
  )
}

AmenityFilter.propTypes = {
  handleChange: PropTypes.func,
  amenities: PropTypes.array,
  spaceServiceAmenity: PropTypes.array,
}
export default AmenityFilter
