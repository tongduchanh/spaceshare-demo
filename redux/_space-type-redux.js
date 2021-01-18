/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  saveSpaceTypeRequest: ['data'],
  getSpaceByType: ['data'],
  spaceTypeSuccess: ['data'],
  spaceTypeFailure: ['data'],
})

export const SpaceTypeTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  data: {},
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state}
}

export const success = (state, { data }) => {
  return { ...state, data }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SPACE_TYPE_REQUEST]: request,
  [Types.GET_SPACE_BY_TYPE]: request,
  [Types.SPACE_TYPE_SUCCESS]: success,
  [Types.SPACE_TYPE_FAILURE]: success,
})
