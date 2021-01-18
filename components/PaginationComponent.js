import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'next/router'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'
import {DefaultValue} from '../constants'

class PaginationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: DefaultValue.PAGE,
      limit: DefaultValue.LIMIT,
      count: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.count !== state.count) {
      return {
        count : props.count,
        page: 1
      }
    }
    return null
  }

  componentDidMount() {
    let params = this.props.router.query
    this.setState({
      page: params.page * 1 || params[this.props.pageParam] * 1 || DefaultValue.PAGE,
      limit: this.props.perPage || DefaultValue.LIMIT,
      count: this.props.count
    })
  }

  onPageChange = page => {
    if (this.props.typePaginate === 'NO_PARAMS') {
      this.setState({
        page
      }, () => {
        this.props.onPageChange(page)
      })
    } else {
      let params = new URLSearchParams(this.props.router.query)
      params.set('page', page)
      this.setState({
        page
      })
      if (this.props.asUrl) {
        this.props.router.push(`${this.props.router.pathname}?${params.toString()}`, `${this.props.asUrl}?${params.toString()}`).then(() => window.scrollTo(0, 0))
      } else {
        this.props.router.push(`${this.props.router.pathname}?${params.toString()}`).then(() => window.scrollTo(0, 0))
      }
    }
  }

  render() {
    let { page, limit, count } = this.state
    let pagesCount = count === 0 ? 1 : Math.ceil(count / limit)
    return (
      <div>
        {count > limit && (
          <div className="paginate mt--12">
              <UltimatePagination
                currentPage={page}
                totalPages={pagesCount}
                onChange={this.onPageChange}
              />
          </div>
        )}
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  history: PropTypes.object,
  count: PropTypes.number,
  onPageChange:  PropTypes.func,
  pageParam: PropTypes.string,
  activeTab: PropTypes.string,
  perPage: PropTypes.number,
  router: PropTypes.object,
  typePaginate: PropTypes.string,
  asUrl: PropTypes.string,
}

export default connect()(withRouter(PaginationComponent))
