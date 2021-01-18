/**
 * @author HanhTD
 * Coworking favorite service
 */

import api from '../api'

export default class CoworkingFavoriteService {
  getCoworkingFavorite(data, cookies) {
    return api.get(`/space-service-favorite/v3/?lang=${data.lang}`, cookies)
  }

  togetherFavorite(data) {
    return api.post(`/space-service-favorite/v3/`, data)
  }
}
