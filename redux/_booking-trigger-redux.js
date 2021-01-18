/**
 * @author NamNH
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  onEdit: ['data'],
  onRemove: ['data'],
  clearTrigger: []
})

export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  data: {},
  edit: false,
  remove: false
}

/* ------------- Reducers ------------- */
export const edit = (state, { data }) => {
  return { ...state, edit: true, data }
}

export const remove = (state, { data }) => {
  return { ...state, remove: true, data }
}

export const clear = (state) => {
  return { ...state, remove: false, edit: false }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_EDIT]: edit,
  [Types.ON_REMOVE]: remove,
  [Types.CLEAR_TRIGGER]: clear
})
