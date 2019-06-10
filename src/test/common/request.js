'use strict'

const request = require('request')

const getSIDCookie = response => {
  const value = response.headers['set-cookie'].toString().match('htbhf.sid=(.*?);')[1]
  return {
    key: 'htbhf.sid',
    value: value
  }
}

const getCSRFToken = body => body.match('"_csrf" value="(.*)"')[1]

const getSIDCookieAndCSRFToken = (url) =>
  new Promise((resolve, reject) => {
    const options = {
      url
    }

    request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }

      const cookie = getSIDCookie(response)
      resolve({
        requestCookie: `${cookie.key}=${cookie.value}`,
        csrfToken: getCSRFToken(body)
      })
    })
  })

const postFormData = (url, form, cookie) =>
  new Promise((resolve, reject) => {
    request.post({
      url,
      form,
      headers: {
        Cookie: cookie
      }
    }, (error) => {
      if (error) {
        return reject(error)
      }

      resolve()
    })
  })

const postJsonData = (url, body) =>
  new Promise((resolve, reject) => {
    request.post({
      url,
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }, (error, httpResponse, body) => {
      if (error) {
        return reject(error)
      }

      resolve(body)
    })
  })

const performDelete = (url) =>
  new Promise((resolve, reject) => {
    request.delete({ url }, (error) => {
      if (error) {
        return reject(error)
      }

      resolve()
    })
  })

module.exports = {
  getSIDCookieAndCSRFToken,
  postFormData,
  postJsonData,
  performDelete
}
