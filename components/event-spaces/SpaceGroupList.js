/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Card, CardBody, CardImg, CardText, CardTitle, Container} from 'reactstrap'
import Slider from 'react-slick'
import {RightArrow} from '../../icons'
import { withTranslation } from '../../i18n'
import {AppUtils} from '../../utils'

const dummy = '/static/images/dummy.png'
class SpaceGroupList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.spaces !== state.spaces) {
      return {
        spaces: props.spaces,
      }
    }

    return null
  }

  render() {
    const {spaces} = this.state
    const {currentLanguage, t} = this.props

    const settings = {
      infinite: false,
      slidesToShow: 5,
      speed: 800,
      swipe: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            swipe: true,
            slidesToShow: 1,
            variableWidth: true
          }
        }, 
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
          }
        }
      ]
    }
    return (
      <React.Fragment>
        <div className="space space__slider">
          <Container>
            {spaces && spaces.map((val, key) => (
              <div className="section" key={key}>
                <div className="section-title j-space-between">
                  <h3>{AppUtils.isLanguageVietnamese(currentLanguage) ? val.name : val.name_en}</h3>
                  <div className="section-title__description">
                    <div className="pc text-right see-more">
                      <Link
                        href={`/event-space-search?activity_types=${val.id}`} 
                        as={`/s/event/?activity_types=${val.id}`}
                      >
                        <a>
                          <span className="mr--6">
                            {t('view-more')}
                          </span>
                          <RightArrow
                            w={10}
                            h={10}
                            fill={'#fbc02d'}
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <Slider {...settings}>
                  {val.spaces && val.spaces.length > 0 && val.spaces.slice(0, 10).map((item, index) => (
                    <div key={index} style={{ width: `272px` }}>
                      <Card className="space__item">
                        <Link href={`/event-space-detail?id=${item.id}`} as={`/event-space/${item.id}`}>
                          <a className="space__img">
                            <CardImg alt={`space-${index}`} top src={item.thumbnail || dummy} />
                          </a>
                        </Link>
                        <CardBody className="space__info">
                          <Link href={`/event-space-detail?id=${item.id}`} as={`/event-space/${item.id}`}>
                            <a>
                              <CardTitle title={item.name} className="space__name has-right-icon" >
                                <h5>{item.name}</h5>
                              </CardTitle>
                            </a>
                          </Link>
                          <CardText className="space__address">
                            <span>
                              {item.shortened_address}
                            </span>
                          </CardText>
                          <div className="space--bottom is-flex">
                            <Link href={`/event-space-detail?id=${item.id}`} as={`/event-space/${item.id}`}>
                              <button>{this.props.t('booking-now')}</button>
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </Slider>
              </div>
            ))}
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

SpaceGroupList.propTypes = {
  getSpaceList: PropTypes.func,
  getSpaceByType: PropTypes.func,
  t: PropTypes.func,

  profile: PropTypes.object,
  spaces: PropTypes.array,
  screen: PropTypes.string,
  processing: PropTypes.bool,
  currentLanguage: PropTypes.string,
}

export default withTranslation('common')(SpaceGroupList)
