/**
 * @author HanhTD
 * Space service
 */

import api from '../api'

export default class PartnerService {
  partnerList() {
    return api.get(`/space-general/v3/list-partner/`)
  }
}
