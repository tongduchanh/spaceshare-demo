import React from 'react'
import {
  Input,
  FormGroup,
  Label,
} from 'reactstrap'

import './FilterGroupRadio.style.scss'

function FilterGroupRadio({ title, checkBoxList, name, value, onChange }) {
  return (
    <div className="filterItem__group">
      <div className="filterItem__title">{title}</div>
      <div className="filterItem__body">
        {checkBoxList.map((val, key) => (
          <FormGroup check key={key}>
            <Label check>
              <Input
                type="radio"
                id={val.id}
                name={name}
                value={val.id}
                checked={value == val.id}
                onChange={onChange}
              />{' '}
              <span className="checkmark" />
              {val.name}
            </Label>
          </FormGroup>
        ))}
      </div>
    </div>
  )
}

export default FilterGroupRadio
