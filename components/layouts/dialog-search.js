import React from 'react'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import OutsideClickHandler from 'react-outside-click-handler'

import SearchActions from '../../redux/_search-redux'

import { SpaceServiceType } from '../../constants'
import { withTranslation } from '../../i18n'
import { AppUtils } from '../../utils'
import { CloseIcon } from '../../icons'
import SearchResult from '../search/suggestion-result'
import SearchType from '../search/search-type'
import SearchOffice from '../search/search-office'

class DialogSearch extends React.Component {
  state = {
    search: '',
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
      service_type: this.props.service_type,
      query: query,
    }
    this.props.suggestionRequest(data)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction)
  }

  componentWillMount() {
    document.removeEventListener('keydown', this.escFunction)
  }

  escFunction = (e) => {
    if (e.keyCode === 27) {
      this.props.close()
    }
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

  handleSearchDistrict = (val) => {
    let href = AppUtils.routerDistrictHref(this.state.service_type, val.id)
    let as = AppUtils.routerDistrictAs(this.state.service_type, val.id)
    Router.push(href, as, { shallow: true })
  }

  handleSearch = () => {
    const { search } = this.state
    const { service_type } = this.props
    if (search === '') {
      Router.push(AppUtils.routerSearchServiceHref(service_type))
    } else {
      let href = AppUtils.routerSearchStringHref(service_type, search)
      let as = AppUtils.routerSearchStringAs(service_type, search)
      Router.push(href, as, { shallow: true })
    }
    this.props.close()
  }

  onKeyUpSearch = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch()
    }
  }

  render() {
    const { suggestion, districts, search } = this.state
    const { service_type, service_placeholder } = this.props
    return (
      <div className="dialog dialog__wrap">
        <OutsideClickHandler onOutsideClick={this.props.close}>
          <div className="dialog__search">
            <Container className="container--medium">
              <Row>
                <Col md="10" className="home-search" style={{ color: '#484848' }}>
                  <div
                    className="px-4 home-search__wrap"
                    style={{ paddingTop: '48px', paddingBottom: '60px' }}
                  >
                    <div className="close-dialog">
                      <div onClick={this.props.close}>
                        <CloseIcon />
                      </div>
                    </div>
                    <div className="home-search__type">
                      <SearchType />
                    </div>

                    <div className="home-search__form">
                      <div className="position-relative home-search__form--left">
                        {(service_type === SpaceServiceType.FLEXIBLE_DESK ||
                          service_type === SpaceServiceType.DEDICATED_SPACE) && (
                          <React.Fragment>
                            <div className="d-flex">
                              <div className="flex-auto mr1 position-relative">
                                <span className="icon-search-map" />
                                <Input
                                  className="seach-flexible"
                                  type="text"
                                  placeholder={service_placeholder}
                                  value={search}
                                  onChange={this.handleChangeInputSearch}
                                  onClick={this.clickInsideInput}
                                  onKeyUp={this.onKeyUpSearch}
                                />
                              </div>
                              <Button
                                color="custom"
                                className="btn-main"
                                onClick={this.handleSearch}
                              >
                                Tìm kiếm
                              </Button>
                            </div>

                            <div className="mt--12">
                              {search !== '' &&
                                ((suggestion && suggestion.length > 0) ||
                                  (districts && districts.length > 0)) && (
                                  <div className="search-suggestion--block scroll-custom">
                                    <SearchResult suggestion={suggestion} districts={districts} serviceType={service_type} />
                                  </div>
                                )}
                            </div>
                          </React.Fragment>
                        )}

                        {service_type === SpaceServiceType.OFFICE_SPACE && <SearchOffice />}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </OutsideClickHandler>
      </div>
    )
  }
}

DialogSearch.propTypes = {
  suggestionRequest: PropTypes.func,
  t: PropTypes.func,
  close: PropTypes.func,

  router: PropTypes.object,
  suggestion: PropTypes.object,
  service_placeholder: PropTypes.string,
  service_type: PropTypes.number,
}

const mapStateToProps = (state) => {
  return {
    suggestion: state.search.data,
    service_placeholder: state.search.service_placeholder,
    service_type: state.search.service_type,
  }
}

const mapDispatchToProps = (dispatch) => ({
  suggestionRequest: (data) => dispatch(SearchActions.suggestionRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(DialogSearch)))
