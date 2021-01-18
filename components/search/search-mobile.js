import React from 'react'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import SearchType from './search-type'
import SearchActions from '../../redux/_search-redux'
import { withTranslation } from '../../i18n'
import SearchResult from './suggestion-result'
import { SpaceServiceType, MetaSearch } from '../../constants'
import { AppUtils } from '../../utils'
import SearchOfficeMobile from '../search/search-office-mobile'

const priceList = MetaSearch.PRICE_LIST
const areaList = MetaSearch.AREA_LIST
const capacityList = MetaSearch.CAPACITY_LIST

class SearchMobile extends React.Component {
  state = {
    search: '',
    suggestion: null,
    districts: null,
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
      service_type: this.props.service_type,
      query: query,
    }
    this.props.suggestionRequest(data)
  }

  handleSearch = () => {
    const { search } = this.state
    const { service_type } = this.props
    this.props.close()
    if (search === '') {
      Router.push(AppUtils.routerSearchServiceHref(service_type))
    } else {
      let href = AppUtils.routerSearchStringHref(service_type, search)
      let as = AppUtils.routerSearchStringAs(service_type, search)
      Router.push(href, as, { shallow: true })
    }
  }

  handleSearchOffice = () => {
    let params = new URLSearchParams('')
    const { provinceSelect, areaSelect, districtSelect, priceSelect, capacitySelect } = this.props
    if (provinceSelect) {
      params.set('provinces', provinceSelect.id)
    }
    if (districtSelect) {
      params.set('districts', districtSelect.id)
    }
    if (priceSelect) {
      let price = priceList.filter((el) => el.id == priceSelect.id)[0]
      params.set('price_range', price.id)
      params.set('from_price', price.from)
      params.set('to_price', price.to)
    }
    if (areaSelect) {
      let area = areaList.filter((el) => el.id == areaSelect.id)[0]
      params.set('area_range', area.id)
      params.set('from_area', area.from)
      params.set('to_area', area.to)
    }
    if (capacitySelect) {
      let capacity = capacityList.filter((el) => el.id == capacitySelect.id)[0]
      params.set('capacity_range', capacity.id)
      params.set('from_capacity', capacity.from)
      params.set('to_capacity', capacity.to)
    }
    this.props.close()
    const href = `/office-search?${params.toString()}`
    const as = `/s/office?${params.toString()}`
    this.props.router.push(href, as, { shallow: true })
  }
  render() {
    const { suggestion, districts, search } = this.state
    const { service_type, service_placeholder } = this.props
    return (
      <div className="search-mobile-wrap">
        <div className="search-dialog">
          <div className="search-dialog__body">
            <div className="home-search__type">
              <SearchType />
            </div>

            <div className="home-search__form flex-column">
              {(service_type === SpaceServiceType.FLEXIBLE_DESK ||
                service_type === SpaceServiceType.DEDICATED_SPACE) && (
                <React.Fragment>
                  <div className="position-relative w-100">
                    <span className="icon-search-map" />
                    <input
                      className="form-control home-search__input seach-flexible"
                      type="text"
                      placeholder={service_placeholder}
                      value={search}
                      onChange={this.handleChangeInputSearch}
                      onClick={this.clickInsideInput}
                      onKeyUp={this.onKeyUpSearch}
                    />
                  </div>
                  <div className="mt--12">
                    {search !== '' &&
                      ((suggestion && suggestion.length > 0) ||
                        (districts && districts.length > 0)) && (
                        <div className="search-suggestion--block">
                          <SearchResult suggestion={suggestion} districts={districts} serviceType={service_type} />
                        </div>
                      )}
                  </div>
                </React.Fragment>
              )}
              {service_type === SpaceServiceType.OFFICE_SPACE && <SearchOfficeMobile />}
            </div>
          </div>

          <div className="search-dialog__footer">
            <Button color="custom" className="btn-main btn-full" onClick={service_type === SpaceServiceType.OFFICE_SPACE ? this.handleSearchOffice: this.handleSearch}>
              Tìm kiếm
            </Button>
          </div>
        </div>

        <style jsx>
          {`
            .search-mobile-wrap {
              top: 102%;
              right: 0;
              position: absolute;
              z-index: 3;
            }

            .search-dialog {
              position: relative !important;
              height: 100% !important;
              max-height: calc(100vh - 64px) !important;
              width: 100vw !important;
              max-width: 100vw !important;
              display: flex !important;
              flex-direction: column !important;
              animation-duration: 400ms !important;
              animation-iteration-count: 1 !important;
              animation-fill-mode: both !important;
              background: rgb(255, 255, 255) !important;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
            }

            .search-dialog__body {
              padding: 12px 24px !important;
              overflow: auto !important;
              flex: 1 1 auto !important;
            }
            .search-dialog__footer {
              display: flex !important;
              padding-top: 16px !important;
              padding-bottom: 16px !important;
              padding-left: 24px !important;
              padding-right: 24px !important;
              justify-content: space-between !important;
              font-size: 16px !important;
              line-height: 20px !important;
              flex: 0 0 auto !important;
              border-top: 1px solid rgb(235, 235, 235) !important;
            }
            .search-suggestion--block {
              max-height: 400px;
              overflow-y: scroll;
            }
            .home-search__input {
              font-size: 18px;
              height: 42px;
            }
          `}
        </style>
      </div>
    )
  }
}

SearchMobile.propTypes = {
  suggestionRequest: PropTypes.func,
  t: PropTypes.func,
  close: PropTypes.func,

  router: PropTypes.object,
  suggestion: PropTypes.object,
  provinceSelect: PropTypes.object,
  districtSelect: PropTypes.object,
  priceSelect: PropTypes.object,
  areaSelect: PropTypes.object,
  capacitySelect: PropTypes.object,

  service_placeholder: PropTypes.string,
  service_type: PropTypes.number,
}

const mapStateToProps = (state) => {
  return {
    suggestion: state.search.data,
    service_placeholder: state.search.service_placeholder,
    service_type: state.search.service_type,
    provinceSelect: state.search.provinceSelect,
    districtSelect: state.search.districtSelect,
    priceSelect: state.search.priceSelect,
    areaSelect: state.search.areaSelect,
    capacitySelect: state.search.capacitySelect,
  }
}

const mapDispatchToProps = (dispatch) => ({
  suggestionRequest: (data) => dispatch(SearchActions.suggestionRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(SearchMobile)))
