/**
 * @author Nam NH
 * Function to create and configure ApiClient
 */

import Api from './api'

export default () => {
  let apiDefaultConfig = {
    headers: {
      'Accept': 'application/json'
    },
    credentials: 'include'
  }

  let api = new Api(apiDefaultConfig, preRequest)
  return api
}

const preRequest = (requestConfig, cookies) => {
  let extraHeaders = {}
  if (cookies && cookies.jwt_auth_token) {
    extraHeaders['Authorization'] = `JWT ${cookies.jwt_auth_token}`
  }
  requestConfig.headers = Object.assign(requestConfig.headers, extraHeaders)
  return requestConfig
}
