import React from 'react';
import PropTypes from 'prop-types';
import {Input, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import classnames from 'classnames'

const propTypes = {
  toggleTime: PropTypes.func,
  end: PropTypes.string,
  format: PropTypes.number,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  start: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  time: PropTypes.object,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  time_data: PropTypes.array
};

class TimePicker extends React.Component {
  state = {
    end: this.props.end || '23:59',
    start: this.props.start || '00:00',
    defaultValue: this.props.defaultValue || '00:00',
    step: this.props.step || 30,
    value: null,
    name: null,
    time: null,
    format: this.props.format || 12,
    dropdownOpen: false,
    disabled: this.props.disabled,
    time_data: []
  }

  toggleTime = () => {
    if (this.props.disabled) {
      return ;
    }
    this.props.toggleTime()
  };

  handleChange = (val) => {
    this.props.toggleTime()
    this.props.handleChange(val)
  }

  componentDidUpdate() {
    if (this.props.time !== this.state.time) {
      this.setState({
        time: this.props.time
      })
    }
    if (this.props.dropdownOpen !== this.state.dropdownOpen) {
      this.setState({
        dropdownOpen: this.props.dropdownOpen
      })
    }
    if (this.props.time_data !== this.state.time_data) {
      this.setState({
        time_data: this.props.time_data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.start !== state.start) {
      return {
        start: props.start
      }
    }
    if (props.end !== state.end) {
      return {
        end: props.end
      }
    }
    return null
  }

  render () {
    const times = this.state.time_data
    return (
      <div>
          <Dropdown
            className="booking__subscription"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleTime}
          >
            <DropdownToggle
              tag="span"
              onClick={this.toggleTime}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
              className="d-flex"
            >
              <Input
                autoComplete="off"
                type="text"
                placeholder={this.props.placeholder}
                defaultValue={(this.props.value) || ''}
                onClick={this.toggleTime}
                className="form-control dropdown__input form-time"
                disabled={this.props.disabled}
              />
              <img
                className={classnames('dropdown-arrow', {
                  'disabled' : this.props.disabled
                })}
                src="/static/images/down-arrow.svg" 
                width="16" 
                height="16" 
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-time">
              <ul className="list-style-none">
                {times && times.map((val, key) => (
                  <DropdownItem 
                    key={key} 
                    onClick={() => this.handleChange(val)}
                    disabled={!val.is_available}
                  >
                    {val.time}
                  </DropdownItem>
                ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
      </div>
    )
  }
}

TimePicker.propTypes = propTypes;

export default TimePicker
