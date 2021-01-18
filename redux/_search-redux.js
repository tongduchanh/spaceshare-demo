/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'
import { SpaceServiceType } from '../constants'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  suggestionRequest: ['data'],
  setServiceType: ['data'],
  searchSuccess: ['data'],
  searchFailure: ['error'],
  setDialogSearchOpen: ['data'],
  setDropdownProvinceOpen: ['data'],
  setDropdownDistrictOpen: ['data'],
  setDropdownPriceOpen: ['data'],
  setDropdownAreaOpen: ['data'],
  setDropdownCapacityOpen: ['data'],
  setProvinceSelect: ['data'],
  setDistrictSelect: ['data'],
  setPriceSelect: ['data'],
  setAreaSelect: ['data'],
  setCapacitySelect: ['data'],
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  service_type: SpaceServiceType.FLEXIBLE_DESK,
  service_placeholder: 'Tên Coworking Space hoặc quận/huyện',
  dialogSearchOpen: false,
  dropdownProvinceOpen: false,
  dropdownDistrictOpen: false,
  dropdownPriceOpen: false,
  dropdownAreaOpen: false,
  dropdownCapacityOpen: false,
  provinceSelect: null,
  districtSelect: null,
  priceSelect: null,
  areaSelect: null,
  capacitySelect: null
}

/* ------------- Reducers ------------- */
export const request = (state) => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data }
}

export const failure = (state) => {
  return { ...state, processing: false }
}

export const setServiceType = (state, { data }) => {
  const getPlaceHolderByType = (type) => {
    let result = ''
    switch (type) {
      case SpaceServiceType.FLEXIBLE_DESK:
        result = `Tên Coworking Space hoặc quận/huyện`
        break
      case SpaceServiceType.OFFICE_SPACE:
        result = `Tên văn phòng hoặc quận/huyện`
        break
      case SpaceServiceType.DEDICATED_SPACE:
        result = `Tổ chức sự kiện, Phòng họp,... hoặc quận/ huyện`
        break
    }
    return result
  }
  return { ...state, service_type: data, service_placeholder: getPlaceHolderByType(data) }
}

export const setDialogSearchOpen = (state, { data }) => {
  return { ...state, dialogSearchOpen: data }
}

export const setDropdownProvinceOpen = (state, { data }) => {
  return { ...state, dropdownProvinceOpen: data }
}

export const setDropdownDistrictOpen = (state, { data }) => {
  return { ...state, dropdownDistrictOpen: data }
}

export const setDropdownPriceOpen = (state, { data }) => {
  return { ...state, dropdownPriceOpen: data }
}

export const setDropdownAreaOpen = (state, { data }) => {
  return { ...state, dropdownAreaOpen: data }
}

export const setDropdownCapacityOpen = (state, { data }) => {
  return { ...state, dropdownCapacityOpen: data }
}

export const setProvinceSelect = (state, { data }) => {
  return { ...state, provinceSelect: data }
}
export const setDistrictSelect = (state, { data }) => {
  return { ...state, districtSelect: data }
}
export const setPriceSelect = (state, { data }) => {
  return { ...state, priceSelect: data }
}
export const setAreaSelect = (state, { data }) => {
  return { ...state, areaSelect: data }
}
export const setCapacitySelect = (state, { data }) => {
  return { ...state, capacitySelect: data }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUGGESTION_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
  [Types.SET_SERVICE_TYPE]: setServiceType,
  [Types.SET_DIALOG_SEARCH_OPEN]: setDialogSearchOpen,
  [Types.SET_DROPDOWN_PROVINCE_OPEN]: setDropdownProvinceOpen,
  [Types.SET_DROPDOWN_DISTRICT_OPEN]: setDropdownDistrictOpen,
  [Types.SET_DROPDOWN_PRICE_OPEN]: setDropdownPriceOpen,
  [Types.SET_DROPDOWN_AREA_OPEN]: setDropdownAreaOpen,
  [Types.SET_DROPDOWN_CAPACITY_OPEN]: setDropdownCapacityOpen,
  [Types.SET_PROVINCE_SELECT]: setProvinceSelect,
  [Types.SET_DISTRICT_SELECT]: setDistrictSelect,
  [Types.SET_PRICE_SELECT]: setPriceSelect,
  [Types.SET_AREA_SELECT]: setAreaSelect,
  [Types.SET_CAPACITY_SELECT]: setCapacitySelect,
})
