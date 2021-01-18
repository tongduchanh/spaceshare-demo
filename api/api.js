/**
 * @author Nam NH
 * ApiClient to interact with api server
 */

import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

export default class Api {
  constructor(defaultConfig, preRequest) {
    this.defaultConfig = defaultConfig
    this.preRequest = preRequest
  }

  request(url, cookies, type_api) {
    this.defaultConfig = this.preRequest(this.defaultConfig, cookies)
    const { serverRuntimeConfig } = getConfig()
    if (type_api == 'WORDPRESS' || type_api == 'MOCKUP') {
      return fetch(url)
    } else {
      let prefix = serverRuntimeConfig.onServer ? process.env.REACT_APP_BASE_URL : '/api'
      return fetch(prefix + url, this.defaultConfig)
    }
  }

  get(url, cookies, type_api) {
    this.defaultConfig.method = 'GET'
    this.defaultConfig.body = undefined
    this.defaultConfig.headers['Content-Type'] = 'application/json'
    return this.request(url, cookies, type_api)
  }

  post(url, data) {
    this.defaultConfig.method = 'POST'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    } else {
      delete this.defaultConfig.headers['Content-Type']
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  put(url, data) {
    this.defaultConfig.method = 'PUT'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    } else {
      delete this.defaultConfig.headers['Content-Type']
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  patch(url, data) {
    this.defaultConfig.method = 'PATCH'
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
      this.defaultConfig.headers['Content-Type'] = 'application/json'
    } else {
      delete this.defaultConfig.headers['Content-Type']
    }
    this.defaultConfig.body = data
    return this.request(url)
  }

  delete(url) {
    this.defaultConfig.method = 'DELETE'
    return this.request(url)
  }
}
