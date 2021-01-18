import React from 'react'
import { Input, Button } from 'reactstrap'
import { SearchIcon } from '../../../icons'

import './FilterInput.style.scss'

function FilterInput({ name, value, onChange, onSubmit }) {
  const onKeyUpSearch = (e) => {
    if (e.keyCode === 13) {
      onSubmit()
    }
  }
  return (
    <div className="filterText__wrapper">
      <div className="filterText__input-wrapper">
        <div className="filterText__icon">
          <SearchIcon />
        </div>
        <Input
          className="form-control filterText__input"
          name={name}
          onChange={onChange}
          autoComplete="off"
          value={value}
          onKeyUp={onKeyUpSearch}
          placeholder="Địa điểm, dịch vụ"
          size="sm"
        />
      </div>
      <div className="filterText__button">
        <Button color="btn" className="button__secondary" size="sm" onClick={onSubmit}>Tìm</Button>
      </div>
    </div>
  )
}

export default FilterInput
