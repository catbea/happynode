import router from '../router'

// Operation LocalStorage
export function setLocalStorage (key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule))
}

export function getLocalStorage (key) {
  const value = JSON.parse(localStorage.getItem(key))
  return value
}

// Operation Cookie
export function setCookie (cName, value, expireMinute) {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + expireMinute * 60 * 1000)
  document.cookie = cName +
    '=' +
    escape(value) +
    (expireMinute == null ? '' : ';expires=' + exdate.toGMTString()) +
    ';path=/'
}

export function getCookie (cName) {
  if (document.cookie.length > 0) {
    var cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      var cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

export function delCookie (name) {
  setCookie(name, '', -1)
}

// Auth redirect
export function redirecToLogin () {
  delCookie('token')
  router.push({
    name: 'Login'
  })
}
