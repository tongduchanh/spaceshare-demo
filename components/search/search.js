import React from 'react';
import { connect } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Input } from 'reactstrap';

import { SpaceServiceType } from '../../constants';
import SearchActions from '../../redux/_search-redux';
import { AppUtils } from '../../utils';
import { withTranslation } from '../../i18n';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: null,
      search: '',
      districts: null,
      spaceType: this.props.spaceType
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suggestion !== this.props.suggestion) {
      if (this.state.search !== '') {
        this.setState({
          districts:
            this.props.suggestion &&
            this.props.suggestion.data &&
            this.props.suggestion.data.district
        });
        if (this.props.spaceType.type === SpaceServiceType.FLEXIBLE_DESK) {
          this.setState({
            suggestion:
              this.props.suggestion &&
              this.props.suggestion.data &&
              this.props.suggestion.data.flexible_desk
          });
        } else if (
          this.props.spaceType.type === SpaceServiceType.DEDICATED_SPACE
        ) {
          this.setState({
            suggestion:
              this.props.suggestion &&
              this.props.suggestion.data &&
              this.props.suggestion.data.event_space
          });
        } else if (
          this.props.spaceType.type === SpaceServiceType.DEDICATED_DESK
        ) {
          this.setState({
            suggestion:
              this.props.suggestion &&
              this.props.suggestion.data &&
              this.props.suggestion.data.dedicated_desk
          });
        }
      } else {
        this.setState({
          suggestion: null
        });
      }
    }

    if (prevProps.spaceType != this.props.spaceType) {
      this.setState({ spaceType: this.props.spaceType });
    }
  }

  handleChangeInputSearch = event => {
    const self = this;
    // if (self.state.typingTimeout) {
    //   clearTimeout(self.state.typingTimeout)
    // }

    self.setState({
      search: event.target.value
    });

    self.handleSuggestion(event.target.value);
  };

  handleSuggestion = query => {
    const data = {
      service_type: this.props.spaceType.type,
      query: query
    };
    this.props.suggestionRequest(data);
  };

  handleClickOutsiteSuggestion = () => {
    this.setState({
      clickOutsideSuggestion: true
    });
  };

  handleClickInsideInput = () => {
    this.setState({
      clickOutsideSuggestion: false,
      clickInsideInput: true,
      clickOutsideInput: false
    });
  };

  handleClickOutsideInput = () => {
    this.setState({
      clickOutsideInput: true,
      clickInsideInput: false
    });
  };

  render() {
    const { suggestion, districts, search } = this.state;
    return (
      <div className="search__input" style={{ position: 'relative' }}>
        <OutsideClickHandler onOutsideClick={this.handleClickOutsideInput}>
          <Input
            autoComplete="off"
            type="text"
            name="email"
            placeholder="Tìm kiếm không gian, địa điểm..."
            onChange={this.handleChangeInputSearch}
            value={this.state.search}
            onClick={this.handleClickInsideInput}
          />
        </OutsideClickHandler>

        {search !== '' && suggestion && !this.state.clickOutsideSuggestion && (
          <OutsideClickHandler
            onOutsideClick={this.handleClickOutsiteSuggestion}
          >
            <div className="search-suggestion scroll-custom">
              {suggestion &&
                suggestion.map((val, key) => {
                  let href = AppUtils.routerCowokingHref(
                    this.state.spaceType.type,
                    val.id
                  );
                  let as = AppUtils.routerCowokingAs(
                    this.state.spaceType.type,
                    val.id
                  );
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={href} as={as} key={key}>
                      <div>
                        <div
                          className="search-suggestion__item is-flex"
                        >
                          <div className="search-suggestion__item-logo logo">
                            <img className="logo" src={val.logo} />
                          </div>
                          <div className="search-suggestion__item-info">
                            <div className="search-suggestion__item-name">
                              {val.name}
                            </div>
                            <div className="search-suggestion__item-address">
                              {val.district}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              {districts &&
                districts.map((val, key) => (
                  <div className="search-suggestion__item is-flex" key={key}>
                    <div className="search-suggestion__item-logo icon">
                      <img
                        className="icon"
                        src="/static/images/maps-and-flags.svg"
                      />
                    </div>
                    <div className="search-suggestion__item-info">
                      <div className="search-suggestion__item-name normal">
                        {val.name}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </OutsideClickHandler>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  t: PropTypes.func,
  spaceType: PropTypes.object,
  suggestion: PropTypes.object,
  suggestionRequest: PropTypes.func
};

const mapStateToProps = state => {
  return {
    suggestion: state.search.data,
    spaceType: state.spaceType.data
  };
};

const mapDispatchToProps = dispatch => ({
  suggestionRequest: data => dispatch(SearchActions.suggestionRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('common')(withRouter(Search)));
