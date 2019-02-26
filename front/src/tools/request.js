import { fetch } from 'whatwg-fetch'
import { Message } from 'element-ui'
import { getCookie, redirecToLogin } from './helper'

function parseJSON (response) {
  return response.json()
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'token': getCookie('token')
    }
  }
  const newOptions = { ...defaultOptions, ...options }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (data && data.code === 490) {
        const msg = data ? data.msg : '网络发生错误'
        Message({ message: msg, type: 'error' })
        redirecToLogin()
        const error = new Error(data.msg)
        throw error
      }
      return { data }
    })
    .catch(err => {
      Message({
        message: err.toString(),
        type: 'error'
      })
      return { err }
    })
}
