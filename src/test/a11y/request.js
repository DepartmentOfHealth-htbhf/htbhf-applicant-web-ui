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
    console.log('>>>>>>> url is', url)
    const options = {
      url
    }

    request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }``

      console.log('headers', response.headers)

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

module.exports = { getSIDCookieAndCSRFToken, postFormData }
