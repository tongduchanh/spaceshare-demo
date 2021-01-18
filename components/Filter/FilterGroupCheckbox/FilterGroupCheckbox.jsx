import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Label } from 'reactstrap'

FilterGroupCheckbox.propTypes = {
  title: PropTypes.string,
  dataList: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
}
function FilterGroupCheckbox({ title, dataList, name, value, onChange }) {
  const [list, setList] = useState(dataList.slice(0, 5))
  const [showFullList, setShowFullList] = useState(false)
  const show = () => {
    setList(dataList)
    setShowFullList(true)
  }
  const hide = () => {
    setList(dataList.slice(0, 5))
    setShowFullList(false)
  }
  return (
    <div className="filterItem__group">
      <div className="filterItem__title">{title}</div>
      <div className="filterItem__body">
        {list.map((val, key) => (
          <FormGroup check key={key}>
            <Label check>
              <Input
                type="checkbox"
                id={val.id}
                name={name}
                value={val.id}
                checked={value.includes(val.id.toString())}
                onChange={onChange}
              />{' '}
              <span className="checkmark" />
              {val.name}
            </Label>
          </FormGroup>
        ))}
        {dataList.length > 5 && (
          <React.Fragment>
            {!showFullList ? (
              <div className="filterItem__showmore" onClick={show}>
                Xem thêm
              </div>
            ) : (
              <div className="filterItem__showmore" onClick={hide}>
                Thu gọn
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default FilterGroupCheckbox
