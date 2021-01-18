import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BookingFooter extends React.Component {
  render() {
    const coworking = this.props.coworking?.data
    return (
      <div className="d-flex align-items-center">
        <div className="host-avatar">
          <img
            className="image--circle"
            src={coworking.space_meta && coworking.space_meta.logo}
          />
        </div>
        <div className="host-info ml-3 font-weight-bolder">
          {coworking.space_meta && coworking.space_meta.name}
        </div>
      </div>
    )
  }
}

BookingFooter.propTypes = {
  coworking: PropTypes.object,
}

const mapStateToProps = (state) => ({
  coworking: state.coworking.flexibleDeskDetail,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BookingFooter)
