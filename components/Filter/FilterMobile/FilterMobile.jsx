import React from 'react'
import { Container, Button } from 'reactstrap'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilterMobileAction from './FilterMobile.redux'
import FilterModal from '../FilterModal/FilterModal'

function FilterMobile(props) {
  const showPopupFilter = () => {
    props.setPopupFilterOpen(true)
  }
  return (
    <div className="advance-search-wrap">
      <div className="advance-search">
        <Container className="search__wrap h-100 align-item-center j-space-between">
          <Button
            outline
            color="gray"
            onClick={showPopupFilter}
            className="btn-custom search__button"
          >
            Chọn lọc
          </Button>
        </Container>
      </div>
      <FilterModal />
    </div>
  )
}

FilterMobile.propTypes = {
  setPopupFilterOpen: PropTypes.func,
  filterMobile: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    filterMobile: state.filterMobile.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPopupFilterOpen: (data) => dispatch(FilterMobileAction.setPopupFilterOpen(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FilterMobile))
