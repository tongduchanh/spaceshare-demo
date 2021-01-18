/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators} = createActions({
  setPopupFilterOpen: ['data']
})

export const FilterMobile = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  popupFilterOpen: false
}

/* ------------- Reducers ------------- */
export const setPopupFilterOpen = (state, {data}) => {
  return {...state, popupFilterOpen: data}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_POPUP_FILTER_OPEN]: setPopupFilterOpen
})
