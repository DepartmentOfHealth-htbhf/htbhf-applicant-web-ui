const isStatusCodeInSuccessRange = statusCode => statusCode >= 200 && statusCode <= 299

const isSuccessStatusCode = statusCode => isStatusCodeInSuccessRange(statusCode) || statusCode === 404

const isErrorStatusCode = statusCode => !isSuccessStatusCode(statusCode)

module.exports = {
  isErrorStatusCode
}
