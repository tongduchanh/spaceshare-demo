import React from 'react'
import {Row, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import TimeModal from '../coworking/TimeModal'
import { withTranslation } from '../../i18n'

const arrIconFavourite = [
  {
    icon: 'fas fa-heart active',
    status: true,
  },
  {
    icon: 'far fa-heart',
    status: false,
  },
]

class SpaceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimeModal: false,
      isTogetherFavourite: false,
      id: '',
      iconFavourite: 'far fa-heart',
    }
  }

  componentDidMount() {
    const {isFavourite, space} = this.props
    if (isFavourite) {
      this.setState({
        id: space.id,
        isTogetherFavourite: space.is_favorite,
        iconFavourite: arrIconFavourite.filter(item => item.status === space.is_favorite)[0].icon,
      })
    }
  }

  toggleHandle = isOpen => {
    this.setState({
      showTimeModal: isOpen
    })
  }

  openTimeModal = () => {
    this.toggleHandle(true)
  }

  componentDidUpdate(prevProps) {
    const {isFavourite} = this.props
    const {id} = this.state

    if (isFavourite && id !== prevProps.space.id) {
      this.setState({
        id: prevProps.space.id,
        isTogetherFavourite: prevProps.space.is_favorite,
        iconFavourite: arrIconFavourite.filter(item => item.status === prevProps.space.is_favorite)[0].icon
      })
    }
  }

  isFavourite = () => {
    const {isTogetherFavourite, id} = this.state
    const {togetherFavourite} = this.props
    this.setState({
      iconFavourite: 'fas fa-circle-notch fa-spin'
    })
    togetherFavourite(
      {
        dataFavourite: {
            space_service_meta: id,
            is_favorite: !isTogetherFavourite
        },
        callback: (val) => {
          if (val){
            this.setState({
              isTogetherFavourite: !isTogetherFavourite,
              iconFavourite: arrIconFavourite.filter(item => item.status === !isTogetherFavourite)[0].icon
            })
          }
          if (!val){
            this.setState({
              iconFavourite: arrIconFavourite.filter(item => item.status === isTogetherFavourite)[0].icon
            })
          }
        }
      }
    )
  }

  render () {
    const {space, isFavourite} = this.props
    const {iconFavourite} = this.state
    return (
      <React.Fragment>
        <TimeModal
          isOpen={this.state.showTimeModal}
          toggle={isOpen => this.toggleHandle(isOpen)}
          hours={space.hours}
        />
        <div className="space-info__info">
          <Row>
            <Col md="12" xs="12">
              <div className="section-title section-title--big mb--12 d-flex justify-content-between">
                <div>
                  <h1>{space.name}</h1>
                </div>
                {
                  isFavourite &&
                  <div className="mt-auto mb-auto favourite">
                    <button
                      onClick={this.isFavourite}
                      className="d-flex btn-favourite"
                      disabled={iconFavourite === 'fas fa-circle-notch fa-spin'}
                    >
                        <i
                          className={iconFavourite}
                        />
                      <span className="pl-1">Yêu thích</span>
                    </button>
                  </div>
                }

              </div>
              <div className="space-info__address mb--6">
                <img className="mr-2" src="/static/images/location-icon.svg" />
                <span className="space-info__text">{space.space_meta && space.space_meta.address}</span>
              </div>

              <div className="space-info__address">
                <img className="mr-2" src="/static/images/call.svg" width="16" height="16" />
                <a className="space-info__link" href={`tel:${space.space_meta && space.space_meta.phone_number}`}>
                  <span className="space-info__text">{space.space_meta && space.space_meta.phone_number}</span>
                </a>
              </div>

              <div className="space-info__highlight mt--12">
                <ul className="list__inline is-flex">
                  <li>
                    <span className="space__rating is-flex mr-2">
                      {/* <Rating value={1} weight="12" color="#fbc02d" readonly /> */}
                      <img src="/static/images/star.svg" width="16" height="16" />
                    </span>
                    <span className="space-info__text">{space.rating}</span>
                  </li>
                  <li>
                    <span className="dot-devide mr--10 ml--10">•</span>
                    <span className="mr-1">{space.review}</span>
                    <span className="space-info__text">{this.props.t('review-detail')}</span>
                  </li>
                  <li>
                    <span className="dot-devide mr--10 ml--10">•</span>
                    <span className="mr-1">{space.checkin}</span>
                    <span className="space-info__text">{this.props.t('check-in-detail', {number: space.checkin})}</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

SpaceInfo.propTypes = {
  t: PropTypes.func,
  space: PropTypes.object,
  currentLanguage: PropTypes.string,
  togetherFavourite: PropTypes.func,
  isFavourite: PropTypes.bool
}

export default withTranslation('common')(SpaceInfo)
