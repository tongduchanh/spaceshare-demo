import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import SearchActions from '../../redux/_search-redux'
import LocationActions from '../../redux/_location-redux'

import { withTranslation } from '../../i18n'
import { SpaceServiceType, MetaSearch } from '../../constants'

const useStyles = makeStyles({
  searchInputGroup: {
    display: 'flex',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.22)',
    background: '#fff',
    borderRadius: '4px',
    height: '72px',
    marginBottom: '12px',
  },
  searchInput: {
    backgroundColor: '#fff',
    border: 'none',
    width: '100%',
    fontSize: '18px',
    cursor: 'pointer',
  },
  searchInputWrap: {
    flex: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  searchInputWrapLast: {
    position: 'relative',
    '&::after': {
      content: '""',
      borderRight: '1px solid #ccc',
      position: 'absolute',
      top: '10px',
      bottom: '10px',
      left: 0,
    },
  },
  searchIcon: {
    width: '20px',
    marginRight: '16px',
    marginLeft: '8px',
  },
  arrowIcon: {
    width: '20px',
    position: 'absolute',
    right: '24px',
  },
  dropdown: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  dropdownLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
  },
  dropdownMenu: {
    width: '100%',
    border: 0,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.22)',
    zIndex: 1,
    transform: 'unset !important',
    top: '80px !important',
    '&::before': {
      content: '""',
      width: '10px',
      height: '10px',
      borderLeft: '1px solid',
      borderTop: '1px solid',
      display: 'block',
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: '-5px',
      left: '30px',
      borderLeftColor: '#fff',
      borderTopColor: '#fff',
      backgroundColor: '#fff',
    },
  },
  dropdownMenuItem: {
    padding: '10px 12px',
    cursor: 'pointer',
    lineHeight: '32px',
    transitionDuration: '0.3s',
    '&:hover': {
      background: '#ffbd30',
      color: '#fff',
    },
  },
  dropdownToggle: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  contentScroll: {
    maxHeight: '420px',
    overflow: 'auto',
  },
  btnSearch: {
    height: '72px',
    paddingLeft: '40px !important',
    paddingRight: '40px !important',
  },
})

const priceList = MetaSearch.PRICE_LIST
const areaList = MetaSearch.AREA_LIST
const capacityList = MetaSearch.CAPACITY_LIST

function SearchOffice(props) {
  const classes = useStyles()
  const { dropdownProvinceOpen, setDropdownProvinceOpen } = props
  const { dropdownDistrictOpen, setDropdownDistrictOpen } = props
  const { dropdownPriceOpen, setDropdownPriceOpen } = props
  const { dropdownAreaOpen, setDropdownAreaOpen } = props
  const { dropdownCapacityOpen, setDropdownCapacityOpen } = props
  const { provinceSelect, setProvinceSelect } = props
  const { districtSelect, setDistrictSelect } = props
  const { priceSelect, setPriceSelect } = props
  const { areaSelect, setAreaSelect } = props
  const { capacitySelect, setCapacitySelect } = props

  const toggleProvince = () => setDropdownProvinceOpen(!dropdownProvinceOpen)
  const toggleDistrict = () => setDropdownDistrictOpen(!dropdownDistrictOpen)
  const togglePrice = () => setDropdownPriceOpen(!dropdownPriceOpen)
  const toggleArea = () => setDropdownAreaOpen(!dropdownAreaOpen)
  const toggleCapacity = () => setDropdownCapacityOpen(!dropdownCapacityOpen)

  const selectProvince = (province) => {
    setDropdownProvinceOpen(false)
    setDropdownDistrictOpen(true)
    setProvinceSelect(province)
    const data = {
      province: province.id,
      service_type: SpaceServiceType.OFFICE_SPACE,
    }
    props.getAvailableDistricts(data)
  }

  const selectDistrict = (district) => {
    setDistrictSelect(district)
    setDropdownDistrictOpen(false)
  }

  const selectPrice = (price) => {
    setPriceSelect(price)
    setDropdownPriceOpen(false)
  }

  const selectArea = (area) => {
    setAreaSelect(area)
    setDropdownAreaOpen(false)
  }

  const selectCapacity = (capacity) => {
    setCapacitySelect(capacity)
    setDropdownCapacityOpen(false)
  }

  useEffect(() => {
    if (dropdownProvinceOpen) {
      props.getAvailableProvinces({
        service_type: SpaceServiceType.OFFICE_SPACE,
      })
    }
  }, [dropdownProvinceOpen])
  const provinces = props.provinces?.data?.results
  const districts = props.districts?.data?.results
  return (
    <div className="search-box">
      <div className={classes.searchInputGroup}>
        <div className={classes.searchInputWrap}>
          <Dropdown
            isOpen={dropdownProvinceOpen}
            toggle={toggleProvince}
            className={classes.dropdown}
          >
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownProvinceOpen}
              className={classes.dropdownToggle}
            >
              <div className={classes.dropdownLabel}>
                <img className={classes.searchIcon} src="/static/images/icons/map.svg" />
                <input
                  className={classes.searchInput}
                  placeholder="Chọn tỉnh / thành phố"
                  value={provinceSelect?.name}
                />
                <img className={classes.arrowIcon} src="/static/images/icons/down-arrow.svg" />
              </div>
            </DropdownToggle>
            <DropdownMenu className={classes.dropdownMenu}>
              <ul style={{ listStyle: 'none' }}>
                {provinces &&
                  provinces.map((val, key) => (
                    <li className={classes.dropdownMenuItem} key={key}>
                      <div onClick={() => selectProvince(val)}>{val.name}</div>
                    </li>
                  ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={classes.searchInputGroup}>
        <div className={`${classes.searchInputWrap}`}>
          <Dropdown
            isOpen={dropdownDistrictOpen}
            toggle={toggleDistrict}
            className={classes.dropdown}
          >
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownDistrictOpen}
              className={classes.dropdownToggle}
            >
              <div className={classes.dropdownLabel}>
                <img className={classes.searchIcon} src="/static/images/icons/map.svg" />
                <input
                  className={classes.searchInput}
                  placeholder="Chọn quận / huyện"
                  value={districtSelect?.name}
                />
                <img className={classes.arrowIcon} src="/static/images/icons/down-arrow.svg" />
              </div>
            </DropdownToggle>
            <DropdownMenu className={classes.dropdownMenu}>
              <ul style={{ listStyle: 'none' }} className={classes.contentScroll}>
                {districts &&
                  districts.map((val, key) => (
                    <li className={classes.dropdownMenuItem} key={key}>
                      <div onClick={() => selectDistrict(val)}>{val.name}</div>
                    </li>
                  ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={classes.searchInputGroup}>
        <div className={classes.searchInputWrap}>
          <Dropdown isOpen={dropdownPriceOpen} toggle={togglePrice} className={classes.dropdown}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownProvinceOpen}
              className={classes.dropdownToggle}
            >
              <div className={classes.dropdownLabel}>
                <img className={classes.searchIcon} src="/static/images/icons/price.svg" />
                <input
                  className={classes.searchInput}
                  placeholder="Chọn khoảng giá"
                  value={priceSelect?.name}
                />
                <img className={classes.arrowIcon} src="/static/images/icons/down-arrow.svg" />
              </div>
            </DropdownToggle>
            <DropdownMenu className={classes.dropdownMenu}>
              <ul style={{ listStyle: 'none' }}>
                {priceList.map((val, key) => (
                  <li className={classes.dropdownMenuItem} key={key}>
                    <div onClick={() => selectPrice(val)}>{val.name}</div>
                  </li>
                ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={classes.searchInputGroup}>
        <div className={`${classes.searchInputWrap}`}>
          <Dropdown isOpen={dropdownAreaOpen} toggle={toggleArea} className={classes.dropdown}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownAreaOpen}
              className={classes.dropdownToggle}
            >
              <div className={classes.dropdownLabel}>
                <img className={classes.searchIcon} src="/static/images/icons/area1.svg" />
                <input
                  className={classes.searchInput}
                  placeholder="Thêm diện tích"
                  value={areaSelect?.name}
                />
                <img className={classes.arrowIcon} src="/static/images/icons/down-arrow.svg" />
              </div>
            </DropdownToggle>
            <DropdownMenu className={classes.dropdownMenu}>
              <ul style={{ listStyle: 'none' }}>
                {areaList.map((val, key) => (
                  <li className={classes.dropdownMenuItem} key={key}>
                    <div onClick={() => selectArea(val)}>{val.name}</div>
                  </li>
                ))}
              </ul>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={`${classes.searchInputGroup}`}>
        <Dropdown
          isOpen={dropdownCapacityOpen}
          toggle={toggleCapacity}
          className={classes.dropdown}
        >
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={dropdownCapacityOpen}
            className={classes.dropdownToggle}
          >
            <div className={classes.dropdownLabel}>
              <img className={classes.searchIcon} src="/static/images/icons/user.svg" />
              <input
                className={classes.searchInput}
                name="capacity"
                placeholder="Thêm số nhân viên"
                value={capacitySelect?.name}
              />
              <img className={classes.arrowIcon} src="/static/images/icons/down-arrow.svg" />
            </div>
          </DropdownToggle>
          <DropdownMenu className={classes.dropdownMenu}>
            <ul style={{ listStyle: 'none' }}>
              {capacityList.map((val, key) => (
                <li className={classes.dropdownMenuItem} key={key}>
                  <div onClick={() => selectCapacity(val)}>{val.name}</div>
                </li>
              ))}
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
SearchOffice.propTypes = {
  setDropdownProvinceOpen: PropTypes.func,
  setDropdownDistrictOpen: PropTypes.func,
  getAvailableProvinces: PropTypes.func,
  getAvailableDistricts: PropTypes.func,
  setDropdownPriceOpen: PropTypes.func,
  setDropdownAreaOpen: PropTypes.func,
  setDropdownCapacityOpen: PropTypes.func,
  setProvinceSelect: PropTypes.func,
  setDistrictSelect: PropTypes.func,
  setPriceSelect: PropTypes.func,
  setAreaSelect: PropTypes.func,
  setCapacitySelect: PropTypes.func,
  router: PropTypes.func,

  dropdownProvinceOpen: PropTypes.bool,
  dropdownDistrictOpen: PropTypes.bool,
  dropdownPriceOpen: PropTypes.bool,
  dropdownAreaOpen: PropTypes.bool,
  dropdownCapacityOpen: PropTypes.bool,
  provinces: PropTypes.object,
  districts: PropTypes.object,
  provinceSelect: PropTypes.object,
  districtSelect: PropTypes.object,
  priceSelect: PropTypes.object,
  areaSelect: PropTypes.object,
  capacitySelect: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    dropdownProvinceOpen: state.search.dropdownProvinceOpen,
    dropdownDistrictOpen: state.search.dropdownDistrictOpen,
    dropdownPriceOpen: state.search.dropdownPriceOpen,
    dropdownAreaOpen: state.search.dropdownAreaOpen,
    dropdownCapacityOpen: state.search.dropdownCapacityOpen,
    provinceSelect: state.search.provinceSelect,
    districtSelect: state.search.districtSelect,
    priceSelect: state.search.priceSelect,
    areaSelect: state.search.areaSelect,
    capacitySelect: state.search.capacitySelect,
    provinces: state.location.provinces,
    districts: state.location.districts,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDropdownProvinceOpen: (data) => dispatch(SearchActions.setDropdownProvinceOpen(data)),
  setDropdownDistrictOpen: (data) => dispatch(SearchActions.setDropdownDistrictOpen(data)),
  setDropdownPriceOpen: (data) => dispatch(SearchActions.setDropdownPriceOpen(data)),
  setDropdownAreaOpen: (data) => dispatch(SearchActions.setDropdownAreaOpen(data)),
  setDropdownCapacityOpen: (data) => dispatch(SearchActions.setDropdownCapacityOpen(data)),
  setProvinceSelect: (data) => dispatch(SearchActions.setProvinceSelect(data)),
  setDistrictSelect: (data) => dispatch(SearchActions.setDistrictSelect(data)),
  setPriceSelect: (data) => dispatch(SearchActions.setPriceSelect(data)),
  setAreaSelect: (data) => dispatch(SearchActions.setAreaSelect(data)),
  setCapacitySelect: (data) => dispatch(SearchActions.setCapacitySelect(data)),
  getAvailableProvinces: (data) => dispatch(LocationActions.getAvailableProvinces(data)),
  getAvailableDistricts: (data) => dispatch(LocationActions.getAvailableDistricts(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(SearchOffice)))
