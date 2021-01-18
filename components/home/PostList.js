/**
 * @author HanhTD
 * PostList component
 */

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import PostItem from '../blog/post-item'

import { withTranslation } from '../../i18n'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      dragging: false,
      windowWidth: 0
    }
  }

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth
    })
    window.addEventListener('resize', function () {
      this.setState({
        windowWidth: window.innerWidth
      })
    }.bind(this))
  }

  static getDerivedStateFromProps(props, state) {
    if (props.posts !== state.posts) {
      return {
        posts: props.posts,
      }
    }

    return null
  }

  beforeChange = () => {
    this.setState({
      dragging: true
    })
  }

  afterChange = () => {
    this.setState({
      dragging: false
    })
  }

  render() {
    const { posts, dragging, windowWidth } = this.state
    const settings = {
      infinite: false,
      slidesToShow: 4,
      speed: 800,
      swipe: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 767,
          settings: {
            swipe: true,
            slidesToShow: 1,
            variableWidth: true,
          }
        }
      ]
    }

    return (
      <div>
        <div className="homepage-events">
          <div className="cwk-blog-wrap">
            <div className="blog">
              {windowWidth > 767 && (
                <Slider {...settings}>
                  {posts && posts.length > 0 && posts.map((val, key) => {
                    return (
                      <div key={key} style={{ width: `300px`}}>
                        <PostItem
                          post={val}
                          dragging={dragging}
                        />
                      </div>
                    )
                  })}
                </Slider>
              )}
              {windowWidth <= 767 && (
                <div className="slider-scroll">
                  {posts && posts.length > 0 && posts.map((val, key) => (
                    <div key={key} className="service__item--slider" style={{ width: `300px`, minWidth: `300px`}}>
                      <PostItem
                        post={val}
                        dragging={dragging}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostList.propTypes = {
  t: PropTypes.func,
  history: PropTypes.object,
  data: PropTypes.array,
  posts: PropTypes.array,
}

export default withTranslation('common')(PostList)
