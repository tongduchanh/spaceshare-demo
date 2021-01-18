import React from 'react'
import PropTypes from 'prop-types'
import Router, { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import OutsideClickHandler from 'react-outside-click-handler'
import LazyLoad from 'react-lazyload'
import { isBrowser } from 'react-device-detect'

import SearchActions from '../../redux/_search-redux'

import { SpaceServiceType } from '../../constants'
import { withTranslation } from '../../i18n'
import { AppUtils } from '../../utils'
import SearchResult from '../search/suggestion-result'
import SearchType from '../search/search-type'
import SearchOffice from '../search/search-office'

class Background extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
      search: '',
      suggestion: null,
      districts: null,
    }
  }

  toggle = (type) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      dropdownType: type,
    })
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
  }

  onKeyUpSearch = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch()
    }
  }

  render() {
    const { suggestion, districts, search } = this.state
    const { service_placeholder, service_type } = this.props
    return (
      <div className="background is-relative">
        <div className="background__image">
          <LazyLoad
            once
            placeholder={<img src="/static/images/tini.png" />}
            height={600}
          >
            <img src="/static/images/background/background-compressor.png" />
          </LazyLoad>
        </div>
        <div className="search-box-wrap pc">
          <Container className="container--medium">
            <Row>
              <Col md={10} className="home-search">
                <h1 className="home-search__title">
                  TÌM KIẾM KHÔNG GIAN MỌI LÚC MỌI NƠI
                </h1>
                <div className="home-search__subtitle">
                  Đặt chỗ dễ dàng hơn với SpaceShare | 400+ đối tác và 1000+
                  không gian
                  <br />
                  Tìm kiếm và trải nghiệm ngay
                </div>
                <div className="px-4 home-search__box-wrap">
                  <div className="home-search__type">
                    <SearchType />
                  </div>

                  <div className="home-search__form">
                    {this.state.clickInsideInput &&
                      !this.state.clickOutsideInput && (
                        <div className="overlay" />
                      )}
                    <div className="flex-auto">
                      <OutsideClickHandler
                        onOutsideClick={this.clickOutsideInput}
                      >
                        {(service_type === SpaceServiceType.FLEXIBLE_DESK || service_type === SpaceServiceType.DEDICATED_SPACE) && (
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
                        )}
                        {service_type === SpaceServiceType.OFFICE_SPACE && isBrowser && (
                          <SearchOffice />
                        )}
                      </OutsideClickHandler>
                      {search !== '' &&
                        ((suggestion && suggestion.length > 0) ||
                          (districts && districts.length > 0)) &&
                        !this.state.clickOutsideSuggestion && (
                          <OutsideClickHandler
                            onOutsideClick={this.clickOutsiteSuggestion}
                          >
                            <div className="search-suggestion scroll-custom">
                              <SearchResult
                                suggestion={suggestion}
                                districts={districts}
                                serviceType={service_type}
                              />
                            </div>
                          </OutsideClickHandler>
                        )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

Background.propTypes = {
  suggestionRequest: PropTypes.func,
  t: PropTypes.func,

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
)(withTranslation('common')(withRouter(Background)))
