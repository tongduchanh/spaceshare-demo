export default class SlickSliderSettings {
  static DEDICATED_SPACE_SETTINGS = {
    infinite: false,
    slidesToShow: 4,
    speed: 800,
    swipe: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          swipe: true,
          slidesToShow: 1,
          variableWidth: true,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
    ]
  }

  static FLEXIBLE_DESK_SETTINGS = {
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
          variableWidth: true,
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

  static SERVICE_SETTINGS = {
    infinite: false,
      slidesToShow: 6,
      speed: 800,
      swipe: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            variableWidth: true
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
          }
        }
      ]
  }
}
