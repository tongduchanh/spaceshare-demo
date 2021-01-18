import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import classnames from 'classnames'
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery'
import { withTranslation } from '../../i18n'
// import 'lightgallery.js/dist/css/lightgallery.css'
class Gallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      isHovered: false,
      hoverSelected: ''
    }
  }

  handleHover = key => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverSelected: key
    }))
  }

  renderGallery () {
    const { images } = this.props
    if (!images) return
    let count = 0

    if (images) {
      count = images.length
    }
    let gallery
    let image_0 = images[0]
    let image_1 = images[1]
    let image_2 = images[2]
    let image_3 = images[3]
    let image_4 = images[4]
    let image_5 = images[5]

    if (count == 1) {
      gallery = (
        <React.Fragment>
          <div className="item-img-wrap item-lv-1">
            <LightgalleryItem src={image_0.src} group="coworking">
              <img 
                src={image_0.src} 
                className={classnames(
                  'item-img',
                  {
                  'is-hover': this.state.isHovered && this.state.hoverSelected === 0
                  })
                }
                onClick={(e) => this.openLightbox(0, e)}
                onMouseEnter={() => this.handleHover(0)}
                onMouseLeave={() => this.handleHover(0)}
              />
            </LightgalleryItem>
          </div>
        </React.Fragment>
      )
    }
    if (count == 2) {
      gallery = (
        <React.Fragment>
          <div className="item-img-wrap item-lv-1 left">
            <LightgalleryItem src={image_0.src} group="coworking">
              <img 
                src={image_0.src} 
                className={classnames(
                  'item-img',
                  {
                  'is-hover': this.state.isHovered && this.state.hoverSelected === 0
                  })
                }
                onClick={(e) => this.openLightbox(0, e)}
                onMouseEnter={() => this.handleHover(0)}
                onMouseLeave={() => this.handleHover(0)}
              />
            </LightgalleryItem>
          </div>
          <div className="item-img-wrap item-lv-1 right">
            <LightgalleryItem src={image_1.src} group="coworking" >
              <img 
                src={image_1.src} 
                className={classnames(
                  'item-img',
                  {
                  'is-hover': this.state.isHovered && this.state.hoverSelected === 1
                  })
                }
                onClick={(e) => this.openLightbox(1, e)} 
                onMouseEnter={() => this.handleHover(1)}
                onMouseLeave={() => this.handleHover(1)}
              />
            </LightgalleryItem>
          </div>
        </React.Fragment>
      )
    }
    if (count == 3) {
      gallery = (
        <React.Fragment>
          <div className="item-img-wrap item-lv-1 left">
            <LightgalleryItem src={image_0.src} group="coworking">
              <img 
                src={image_0.src} 
                className={classnames(
                  'item-img',
                  {
                  'is-hover': this.state.isHovered && this.state.hoverSelected === 0
                  })
                }
                onClick={(e) => this.openLightbox(0, e)}
                onMouseEnter={() => this.handleHover(0)}
                onMouseLeave={() => this.handleHover(0)}
              />
            </LightgalleryItem>
          </div>
          <div className="item-lv-1 right">
            <div className="item-img-wrap item-lv-2 top">
              <LightgalleryItem src={image_1.src} group="coworking" >
                <img 
                  src={image_1.src} 
                  className={classnames(
                    'item-img',
                    {
                    'is-hover': this.state.isHovered && this.state.hoverSelected === 1
                    })
                  }
                  onClick={(e) => this.openLightbox(1, e)} 
                  onMouseEnter={() => this.handleHover(1)}
                  onMouseLeave={() => this.handleHover(1)}
                />
              </LightgalleryItem>
            </div>
            <div className="item-img-wrap item-lv-2 bottom">
              <LightgalleryItem src={image_2.src} group="coworking" >
                <img 
                  src={image_2.src} 
                  className={classnames(
                    'item-img',
                    {
                    'is-hover': this.state.isHovered && this.state.hoverSelected === 2
                    })
                  }
                  onClick={(e) => this.openLightbox(2, e)}
                  onMouseEnter={() => this.handleHover(2)}
                  onMouseLeave={() => this.handleHover(2)}
                />
              </LightgalleryItem>
            </div>
          </div>
        </React.Fragment>
      )
    }
    if (count == 4) {
      gallery = (
        <React.Fragment>
          <div className="item-img-wrap item-lv-1 left">
            <LightgalleryItem src={image_0.src} group="coworking">
              <img 
                src={image_0.src} 
                className={classnames(
                  'item-img',
                  {
                  'is-hover': this.state.isHovered && this.state.hoverSelected === 0
                  })
                }
                onClick={(e) => this.openLightbox(0, e)}
                onMouseEnter={() => this.handleHover(0)}
                onMouseLeave={() => this.handleHover(0)}
              />
            </LightgalleryItem>
          </div>
          <div className="item-lv-1 right">
            <div className="item-lv-2 top">
              <div className="item-img-wrap item-lv-3 left">
                  <LightgalleryItem src={image_1.src} group="coworking" >
                    <img 
                      src={image_1.src} 
                      className={classnames(
                        'item-img',
                        {
                        'is-hover': this.state.isHovered && this.state.hoverSelected === 1
                        })
                      }
                      onClick={(e) => this.openLightbox(1, e)} 
                      onMouseEnter={() => this.handleHover(1)}
                      onMouseLeave={() => this.handleHover(1)}
                    />
                  </LightgalleryItem>
              </div>
              <div className="item-img-wrap item-lv-3 right">
                <LightgalleryItem src={image_2.src} group="coworking" >
                  <img 
                    src={image_2.src} 
                    className={classnames(
                      'item-img',
                      {
                      'is-hover': this.state.isHovered && this.state.hoverSelected === 2
                      })
                    }
                    onClick={(e) => this.openLightbox(2, e)}
                    onMouseEnter={() => this.handleHover(2)}
                    onMouseLeave={() => this.handleHover(2)}
                  />
                </LightgalleryItem>
              </div>
            </div>
            <div className="item-lv-2 bottom">
              <div className="item-img-wrap item-lv-3 left">
                <LightgalleryItem src={image_3.src} group="coworking" >
                  <img 
                    src={image_3.src} 
                    className={classnames(
                      'item-img',
                      {
                      'is-hover': this.state.isHovered && this.state.hoverSelected === 3
                      })
                    }
                    onClick={(e) => this.openLightbox(3, e)}
                    onMouseEnter={() => this.handleHover(3)}
                    onMouseLeave={() => this.handleHover(3)} 
                  />
                </LightgalleryItem>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }
    
    if (count >= 5) {
      gallery = 
        (
          <React.Fragment >
            <div className="item-img-wrap item-lv-1 left">
              <LightgalleryItem src={image_0.src} group="coworking">
                <img 
                  src={image_0.src} 
                  className={classnames(
                    'item-img',
                    {
                    'is-hover': this.state.isHovered && this.state.hoverSelected === 0
                    })
                  }
                  onClick={(e) => this.openLightbox(0, e)}
                  onMouseEnter={() => this.handleHover(0)}
                  onMouseLeave={() => this.handleHover(0)}
                />
              </LightgalleryItem>
            </div>
            <div className="item-lv-1 right">
              <div className="item-lv-2 top">
                <div className="item-img-wrap item-lv-3 left">
                  <LightgalleryItem src={image_1.src} group="coworking" >
                    <img 
                      src={image_1.src} 
                      className={classnames(
                        'item-img',
                        {
                        'is-hover': this.state.isHovered && this.state.hoverSelected === 1
                        })
                      }
                      onClick={(e) => this.openLightbox(1, e)} 
                      onMouseEnter={() => this.handleHover(1)}
                      onMouseLeave={() => this.handleHover(1)}
                    />
                  </LightgalleryItem>
                </div>
                <div className="item-img-wrap item-lv-3 right">
                  <LightgalleryItem src={image_2.src} group="coworking" >
                    <img 
                      src={image_2.src} 
                      className={classnames(
                        'item-img',
                        {
                        'is-hover': this.state.isHovered && this.state.hoverSelected === 2
                        })
                      }
                      onClick={(e) => this.openLightbox(2, e)}
                      onMouseEnter={() => this.handleHover(2)}
                      onMouseLeave={() => this.handleHover(2)}
                    />
                  </LightgalleryItem>
                </div>
              </div>
              <div className="item-lv-2 bottom">
                <div className="item-img-wrap item-lv-3 left">
                  <LightgalleryItem src={image_3.src} group="coworking" >
                    <img 
                      src={image_3.src} 
                      className={classnames(
                        'item-img',
                        {
                        'is-hover': this.state.isHovered && this.state.hoverSelected === 3
                        })
                      }
                      onClick={(e) => this.openLightbox(3, e)}
                      onMouseEnter={() => this.handleHover(3)}
                      onMouseLeave={() => this.handleHover(3)} 
                    />
                  </LightgalleryItem>
                </div>
                <div className="item-img-wrap item-lv-3 right last">
                  <LightgalleryItem src={image_4.src} group="coworking">
                    <img 
                      src={image_4.src} 
                      className={classnames(
                        'item-img',
                        {
                        'is-hover': this.state.isHovered && this.state.hoverSelected === 4
                        })
                      }
                      onClick={(e) => this.openLightbox(3, e)}
                      onMouseEnter={() => this.handleHover(4)}
                      onMouseLeave={() => this.handleHover(4)} 
                    />
                  </LightgalleryItem>
                  {count > 5 && (
                    <React.Fragment>
                      <LightgalleryItem src={image_5.src} group="coworking" >
                        <div className="more-image" >
                          <Button color="custom" className="btn-white">
                            {this.props.t('view-photo')}
                          </Button>
                        </div>
                      </LightgalleryItem>
                      {images && images.filter((_, index) => index > 5).map((val, key) => (
                        <div key={key}>
                          <LightgalleryItem src={val.src} group="coworking" />
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                  
                </div>
              </div>
            </div>
          </React.Fragment>
        )
    }

    return (
      <div 
        className={classnames(
          'gallery', 
          {
          'is-hovering': this.state.isHovered
          })
        }
      >
        <LightgalleryProvider 
          lightgallerySettings={
            {
              download: false,
            }
          }
        >
          {gallery}
        </LightgalleryProvider>
      </div>
    )
  }

  openLightbox = (index, event) => {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    })
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }

  render () {
    return (
      <div>
        {this.renderGallery()}
      </div>
    )
  }
}

Gallery.propTypes = {
  heading: PropTypes.string,
  images: PropTypes.array,
  showThumbnails: PropTypes.bool,
  subheading: PropTypes.string,
  t: PropTypes.func
}

export default withTranslation('common')(Gallery)
