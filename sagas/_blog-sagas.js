/**
 * @author HanhTD
 * Blogs Sagas
 */

import { put, call } from 'redux-saga/effects'

import { blogService } from '../services'
import BlogActions from '../redux/_blog-redux'
import { HttpStatus } from '../constants'

const BlogSagas = {
  * getPostList({ data, cookies, type_api }) {
      let response = yield call(blogService.getPostList, data, cookies, type_api)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.getPostList = true
        responsedata.totalPost = response.headers.get('x-wp-total')
        yield put(BlogActions.blogSuccess(responsedata))
      } else {
        yield put(BlogActions.blogFailure(responsedata, response.status))
      }
  },

  * getPostBySlug({slug, cookies, type_api}) {
      let response = yield call(blogService.getPostBySlug, slug, cookies, type_api)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.getPostBySlug = true
        yield put(BlogActions.blogSuccess(responsedata))
      } else {
        yield put(BlogActions.blogFailure(responsedata, response.status))
      }
  },

  * getPostByCategory({data, cookies, type_api}) {
      let response = yield call(blogService.getPostByCategory, data, cookies, type_api)
      let responsedata = yield response.json()
      if (response.status < HttpStatus.BAD_REQUEST) {
        responsedata.getPostByCategory = true
        yield put(BlogActions.blogSuccess(responsedata))
      } else {
        yield put(BlogActions.blogFailure(responsedata, response.status))
      }
  },
}

export default BlogSagas
