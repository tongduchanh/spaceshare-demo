import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import OutsideClickHandler from 'react-outside-click-handler'

import SearchActions from '../../../redux/_search-redux'
import { withTranslation } from '../../../i18n'
import SearchResult from '../../search/suggestion-result'
import { SpaceServiceType } from '../../../constants'

class SearchSpace extends React.Component {
  state = {
    search: '',
    dropdownOpen: false,
    suggestion: null,
    districts: null,
  }
  handleChangeInputSearch = (event) => {
    const self = this
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout)
    }

    self.setState({
      search: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleSuggestion(self.state.search)
      }, 200),
    })
  }

  handleSuggestion = (query) => {
    const data = {
      service_type: this.props.serviceType,
      query: query,
    }
    this.props.suggestionRequest(data)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suggestion !== this.props.suggestion) {
      if (this.state.search !== '') {
        this.setState({
          districts: this.props.suggestion?.data?.district,
          suggestion: this.props.suggestion?.data?.space_service,
        })
      } else {
        this.setState({
          suggestion: null,
        })
      }
    }
  }
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  clickOutsiteSuggestion = () => {
    this.setState({
      clickOutsideSuggestion: true,
    })
  }

  clickInsideInput = () => {
    this.setState({
      clickOutsideSuggestion: false,
      clickInsideInput: true,
      clickOutsideInput: false,
    })
  }

  clickOutsideInput = () => {
    this.setState({
      clickOutsideInput: true,
      clickInsideInput: false,
    })
  }
  render() {
    const { search, dropdownOpen, suggestion, districts } = this.state
    return (
      <div className="filter-item">
        <div className="filter-item__label">Tim kiếm địa điểm, dịch vụ</div>
        <div className="filter-item__input">
          {/* <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle tag="div">
              <Input
                className="seach-flexible"
                type="text"
                placeholder="Nhập tên địa điểm, dịch vụ"
                value={search}
                onChange={this.handleChangeInputSearch}
                onClick={this.clickInsideInput}
                onKeyUp={this.onKeyUpSearch}
              />
            </DropdownToggle>
            <DropdownMenu className="w-100">
              <SearchResult
                suggestion={suggestion}
                districts={districts}
                serviceType={SpaceServiceType.OFFICE_SPACE}
              />
            </DropdownMenu>
          </Dropdown> */}
          <OutsideClickHandler onOutsideClick={this.clickOutsideInput}>
            <Input
              className="seach-flexible"
              type="text"
              placeholder="Nhập tên địa điểm, dịch vụ"
              value={search}
              onChange={this.handleChangeInputSearch}
              onClick={this.clickInsideInput}
              onKeyUp={this.onKeyUpSearch}
            />
          </OutsideClickHandler>
          {search !== '' &&
            ((suggestion && suggestion.length > 0) ||
              (districts && districts.length > 0)) &&
            !this.state.clickOutsideSuggestion && (
              <OutsideClickHandler onOutsideClick={this.clickOutsiteSuggestion}>
                <div className="filter-item__result scroll-custom-small">
                  <SearchResult
                    suggestion={suggestion}
                    districts={districts}
                    serviceType={SpaceServiceType.OFFICE_SPACE}
                  />
                </div>
              </OutsideClickHandler>
            )}
        </div>
      </div>
    )
  }
}
SearchSpace.propTypes = {
  suggestionRequest: PropTypes.func,
  t: PropTypes.func,

  router: PropTypes.object,
  suggestion: PropTypes.object,
  serviceType: PropTypes.any,
  service_placeholder: PropTypes.string,
  service_type: PropTypes.number,
}

const mapStateToProps = (state) => {
  return {
    suggestion: state.search.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  suggestionRequest: (data) => dispatch(SearchActions.suggestionRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(SearchSpace)))
