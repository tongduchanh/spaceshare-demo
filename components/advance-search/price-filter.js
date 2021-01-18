import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

import { SpaceServiceType } from '../../constants'

function PriceFilter(props) {
  const {
    searchPage,
    rate_type,
    rateTypeList,
    price_range,
    handleChangeInput,
    t,
    priceList,
  } = props

  return (
    <div className="search__body">
      {searchPage === SpaceServiceType.DEDICATED_SPACE && (
        <React.Fragment>
          <div className="title">{t('price-type')}</div>
          {rateTypeList &&
            rateTypeList.map((val, key) => (
              <FormGroup check key={key}>
                <Label check>
                  <Input
                    type="radio"
                    id={val.name}
                    name="rate_type"
                    value={val.id}
                    checked={rate_type == val.id}
                    onChange={handleChangeInput}
                  />{' '}
                  <span className="checkmark" />
                  {val.name}
                </Label>
              </FormGroup>
            ))}
        </React.Fragment>
      )}

      {searchPage === SpaceServiceType.DEDICATED_SPACE ? (
        <div className="title mt--12 mb--12">{t('price-level')}</div>
      ) : (
        <div className="title mt--12 mb--12">Mức giá 1 tháng</div>
      )}
        
      {priceList.map((val, key) => (
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="radio"
              id={val.name}
              name="price_range"
              value={val.id}
              checked={price_range == val.id}
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
  rateTypeList: PropTypes.array,
  rate_type: PropTypes.any,
  searchPage: PropTypes.any,
  price_range: PropTypes.any,
  priceList: PropTypes.array
}

export default PriceFilter
