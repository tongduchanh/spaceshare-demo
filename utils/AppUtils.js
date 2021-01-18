import {WeekDay, DefaultValue, SpaceServiceType} from '../constants'
import moment from 'moment'
import Cookies from 'js-cookie'
export default class AppUtils {
  static isAuthenticated(profile) {
    return profile ? Object.keys(profile).length > 0 : false
  }

  static getDayOfWeek(date, t) {
    var weekday = new Array(7)
    weekday[WeekDay.SUNDAY] = t('sunday')
    weekday[WeekDay.MONDAY] = t('monday')
    weekday[WeekDay.TUESDAY] = t('tuesday')
    weekday[WeekDay.WEDNESDAY] = t('wednesday')
    weekday[WeekDay.THURSDAY] = t('thursday')
    weekday[WeekDay.FRIDAY] = t('friday')
    weekday[WeekDay.SATURDAY] = t('saturday')
    return weekday[date.getDay()]
  }

  static convertStringToDate(date) {
    if (date) {
      return new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3 07:00'))
    } else {
      return null
    }
  }

  static convertStringTimeToDate(date) {
    if (date) {
      return new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
    } else {
      return null
    }
  }

  static checkDateInArray(date, array) {
    for (let item in array) {
      if (date.getTime() >= this.convertStringToDate(array[item].activated_date).getTime()
        && date.getTime() < this.convertStringToDate(array[item].expired_date).getTime() + DefaultValue.MPD
        && Math.round(date.getTime()/DefaultValue.MPD) >= Math.round(new Date().getTime()/DefaultValue.MPD)
        )
        return true
    }
    return false
  }

  static goTo = (props, path) => {
    props.router.push(path)
  }

  static getFormatedPhoneNumber(code, phoneNumber) {
    if (phoneNumber) {
      return `+(${code}) ${phoneNumber}`
    }
    return ''
  }

  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  static getPostUrl(post) {
    return `/blog/${post.slug}`
  }

  static getPostAs(post) {
    return `/blog/${post.slug}`
  }
  static getPostHref(post) {
    return `/post?slug=${post.slug}`
  }

  static getCoworkingAs(coworking) {
    return `/coworking/${coworking.id}`
  }

  static getCoworkingHref(coworking) {
    return `/coworking-detail?id=${coworking.id}`
  }

  // router to space detail page - as
  static routerSpaceDetailAsWithDistrict(type, space) {
    let router = ''
    switch (type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking/${space.id}?district=${space.space_meta?.district?.id}`
        break
      case SpaceServiceType.HOT_DESK:
        router = `/hot-desk/${space.id}`
        break
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-spaces/${space.id}?district=${space.space_meta?.district?.id}`
        break
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office/${space.id}?district=${space.space_meta?.district?.id}`
        break
    }
    return router
  }

  // router to space detail page - as
  static routerSpaceDetailAs(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking/${id}`
        break;
      case SpaceServiceType.HOT_DESK:
        router = `/hot-desk/${id}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-spaces/${id}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office/${id}`
        break;
    }
    return router
  }

  // router to space detail page - href
  static routerSpaceDetailHref(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking-detail?id=${id}`
        break;
      case SpaceServiceType.HOT_DESK:
        router = `/hot-desk-detail?id=${id}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/dedicated-space-detail?id=${id}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office-detail?id=${id}`
        break;
    }
    return router
  }

  // router to space page - href
  static routerSpaceHref(type) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking`
        break;
      case SpaceServiceType.HOT_DESK:
        router = `/hot-desk`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-spaces`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office`
        break;
    }
    return router
  }

  // router to space search page - as
  static routerSpaceSearhAs(type) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/s/coworking`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/s/office`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/s/event-spaces`
        break;
    }
    return router
  }

  // router to space search page - href
  static routerSpaceSearhHref(type) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking-search`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office-search`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/dedicated-space-search`
        break;
    }
    return router
  }

  static routerCowokingAs(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking/${id}`
        break;
      case SpaceServiceType.DEDICATED_DESK:
        router = `/hot-desk/${id}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-spaces/${id}`
        break;
    }
    return router
  }

  static routerCowokingHref(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking-detail?id=${id}`
        break;
      case SpaceServiceType.DEDICATED_DESK:
        router = `/hot-desk-detail?id=${id}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-space-detail?id=${id}`
        break;
    }
    return router
  }

    static routerDistrictAs(type, id) {
      let router = ''
      switch(type) {
        case SpaceServiceType.FLEXIBLE_DESK:
          router = `/s/coworking?districts=${id}`
          break;
        case SpaceServiceType.HOT_DESK:
          router = `/s/hot-desk?dedicated_desk_types=2&districts=${id}`
          break;
        case SpaceServiceType.DEDICATED_SPACE:
          router = `/s/event-spaces?districts=${id}`
          break;
        case SpaceServiceType.OFFICE_SPACE:
          router = `/s/office?districts=${id}`
          break;
      }
      return router
    }
  
  static routerDistrictHref(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking-search?districts=${id}`
        break;
      case SpaceServiceType.HOT_DESK:
        router = `/hot-desk-search?dedicated_desk_types=2&districts=${id}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/dedicated-space-search?districts=${id}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office-search?districts=${id}`
        break;
    }
    return router
  }

  static routerSearchServiceHref(type) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking`
        break;
      case SpaceServiceType.DEDICATED_DESK:
        router = `/hot-desk?`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/event-spaces`
        break;
    }
    return router
  }

  static routerSearchStringHref(type, search) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/coworking-search?search=${search}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/office-search&search=${search}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/dedicated-space-search?search=${search}`
        break;
    }
    return router
  }

  static routerSearchStringAs(type, search) {
    let router = ''
    switch(type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        router = `/s/coworking?search=${search}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/s/office?search=${search}`
        break;
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/s/event-spaces?search=${search}`
        break;
    }
    return router
  }

  static routerSpaceTypeHref(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/dedicated-space-search?activity_types=${id}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/hot-desk-search?dedicated_desk_types=${id}`
        break;
    }
    return router
  }

  static routerSpaceTypeAs(type, id) {
    let router = ''
    switch(type) {
      case SpaceServiceType.DEDICATED_SPACE:
        router = `/s/event-spaces/?activity_types=${id}`
        break;
      case SpaceServiceType.OFFICE_SPACE:
        router = `/s/hot-desk?OFFICE_SPACE_types=${id}`
        break;
    }
    return router
  }
  static handleKeyPress = e => {
    const keyCode = e.which
    if (!((keyCode >= 48 && keyCode <= 57) // 1-9
      || (keyCode >= 65 && keyCode <= 90) // A-Z
      || (keyCode >= 97 && keyCode <= 122) // a-z
      || keyCode === 46 || keyCode === 95)) { // _ and .
      e.preventDefault()
    }
  }

  static escapeChars = (str) => {
    return str.replace(/&#8211;/g, '-').replace(/&#8221;/g, '"').replace(/&#8220;/g, '"')
  }

  static redirectToHomePage = () => {
    window.location.href = '/'
  }

  static reloadPage = () => {
    location.reload()
  }

  static getSelectedLanguage = () => {
    return Cookies.get('next-i18next')
  }

  static removeLastXChar = (x, str) => {
    return str.toString().slice(0, 0 - x)
  }

  static isLanguageVietnamese(lang) {
    return lang ==='vi' || lang === null
  }

  static isFreePlan(plan) {
    return plan.name === 'Gói trải nghiệm free'
  }

  static autoFillCampaign(plan) {
    let code = ''
    if (plan && plan.campaign) {
      let campaign = plan.campaign
      campaign.map((val) => {
        if (val.auto_fill) {
          code = val.code
        }
      })
    }
    return code
  }

  static number_format( num) {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    } else return 0
  }

  static currencyFormat( num) {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    } else return 0
  }

  static time_format(time) {
    return moment(`1970-01-01 ${time}`).format('HH:mm')
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  static dateFormat(date) {
    return moment(date).format('DD-MM-YYYY')
  }
}
