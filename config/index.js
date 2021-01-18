/**
 * @author HanhTD
 * Config loader
 */

const config = require('./config.json')
config.BASE_URL = process.env.REACT_APP_BASE_URL
config.FACEBOOK_LOGIN_URL = process.env.REACT_APP_FACEBOOK_LOGIN_URL

export default config
