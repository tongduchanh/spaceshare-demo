import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'

function FitlerDropdown(props) {
  const {toggle, dropdownOpen, dropdownList, selectValue, dropdownValue, dropdownPlaceholder} = props
  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag="div">
          <Input
            type="text"
            placeholder={dropdownPlaceholder}
            value={dropdownValue}
          />
        </DropdownToggle>
        <DropdownMenu className="filter-dropdown">
          <ul className="list-style-none filter-menu__group">
            {dropdownList.map((val, key) => (
              <li
                className="filter-menu__item"
                key={key}
                onClick={() => selectValue(val)}
              >
                {val.name}
              </li>
            ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

FitlerDropdown.propTypes = {
  toggle: PropTypes.func,
  selectValue: PropTypes.func,
  dropdownOpen: PropTypes.bool,
  dropdownList: PropTypes.array,
  dropdownValue: PropTypes.string,
  dropdownPlaceholder: PropTypes.string,
}

export default FitlerDropdown
