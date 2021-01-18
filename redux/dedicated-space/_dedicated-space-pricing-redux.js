import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  dedicatedSpacePricingCalculate: ['data'],
  dedicatedSpacePricingSuccess: ['data'],
  dedicatedSpacePricingFailure: ['error', 'status'],
  dedicatedSpacePricingError: ['dataError', 'status'],
})

export const DedicatedSpacePricingTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {}
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, dataError: null }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const error = (state, { dataError }) => {
  return { ...state, processing: false, dataError, data: null}
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.DEDICATED_SPACE_PRICING_CALCULATE]: request,
    [Types.DEDICATED_SPACE_PRICING_SUCCESS]: success,
    [Types.DEDICATED_SPACE_PRICING_FAILURE]: failure,
    [Types.DEDICATED_SPACE_PRICING_ERROR]: error
})
