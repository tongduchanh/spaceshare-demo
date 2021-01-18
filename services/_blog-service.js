/**
 * @author HanhdTD
 * Blog service retrieves data from wordpress API
 */

import api from '../api'
import config from '../config/config'

export default class BlogService {
  getPostList(data, cookies, wordpressapi) {
    let page = data.page
    let per_page = data.per_page
    return api.get(`${config.WORDPRESS_API_ENDPOINT}posts/?page=${page}&per_page=${per_page}`, cookies, wordpressapi)
  }

  getPostByCategory(data, cookies, wordpressapi) {
    if (data.categories) {
      return api.get(`${config.WORDPRESS_API_ENDPOINT}posts/?categories=${data.categories}`, cookies, wordpressapi)
    } else {
      return api.get(`${config.WORDPRESS_API_ENDPOINT}posts/`, cookies, wordpressapi)
    }
  }

  getPostById(id) {
    return api.get(`${config.WORDPRESS_API_ENDPOINT}posts/${id}`)
  }

  getPostBySlug(slug, cookies, wordpressapi) {
    return api.get(`${config.WORDPRESS_API_ENDPOINT}posts/?slug=${slug}`, cookies, wordpressapi)
  }
}
