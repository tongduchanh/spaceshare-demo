import Cookies from 'js-cookie'

export default class AuthsUtils {
  static isAuthenticated(req) {
    return req ? req.cookies.jwt_auth_token : Cookies.get('jwt_auth_token')
  }
}
