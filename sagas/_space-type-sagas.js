/**
 * @author HanhTD
 * Space type sagas
 */

import { call, put } from 'redux-saga/effects'
import { spaceService } from '../services'
import { HttpStatus } from '../constants'
import SpaceTypeActions from '../redux/_space-type-redux'


const SpaceTypeSagas = {
  * saveSpaceType({data}) {
        yield put(SpaceTypeActions.spaceTypeSuccess(data))
  },
  *getSpaceByType({ data }) {
    let response = yield call(spaceService.getSpaceByType, data)
    let responsedata = yield response.json()
    if (response.status < HttpStatus.BAD_REQUEST) {
      responsedata.getSpaceByType = true
      yield put(SpaceTypeActions.spaceTypeSuccess(responsedata))
    } else {
      yield put(SpaceTypeActions.spaceTypeFailure(responsedata, response.status))
    }
  }
}

export default SpaceTypeSagas
