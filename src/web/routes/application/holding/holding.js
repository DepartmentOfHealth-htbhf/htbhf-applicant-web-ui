const moment = require('moment')
const { getVCAPServicesVariable } = require('../../../../config/vcap-services')

const EXPECTED_DATETIME_FORMAT = 'HH:mm DD/MM/YYYY'
const TIME_FORMAT = 'hh:mm a'
const DATE_FORMAT = 'dddd DD MMMM YYYY'

const pageContent = ({ translate }, date) => ({
  title: translate('holding.title'),
  heading: translate('holding.heading'),
  serviceAvailableFromMessage: date ? `${translate('holding.useServiceFrom')} ${date}` : undefined
})

const formatDate = (dateStr, { translate }, language = 'en') => {
  if (!(dateStr && moment(dateStr, EXPECTED_DATETIME_FORMAT, true).isValid())) {
    return translate('holding.tryAgainLater')
  }

  const date = moment(dateStr, EXPECTED_DATETIME_FORMAT).locale(language)
  const formattedTime = date.format(TIME_FORMAT)
  const formattedDate = date.format(DATE_FORMAT)
  return `${formattedTime}, ${formattedDate}`
}

const registerHoldingRoute = (app) => {
  const serviceAvailableDate = getVCAPServicesVariable('SERVICE_AVAILABLE_DATE')

  app.all('*', (req, res) => {
    const formattedDate = formatDate(serviceAvailableDate, { translate: req.t }, req.language)
    res.render('holding', pageContent({ translate: req.t }, formattedDate))
  })
}

module.exports = {
  registerHoldingRoute,
  formatDate
}
