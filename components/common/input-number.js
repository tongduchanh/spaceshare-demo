import React from 'react'
import { MinusIcon, PlusIcon } from '../../icons'
import {Button} from 'reactstrap'

function InputNumber(props) {
  const { number, decrement, increment, max } = props
  return (
    <div className="d-flex">
      <Button
        className="number-input"
        disabled={number === 1 ? true : false}
        onClick={decrement}
        color="custom"
      >
        <MinusIcon />
      </Button>
      <input className="quantity-input__screen" type="text" value={number} />
      <Button
        className="number-input"
        disabled={number === max ? true : false}
        onClick={increment}
        color="custom"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}

export default InputNumber
