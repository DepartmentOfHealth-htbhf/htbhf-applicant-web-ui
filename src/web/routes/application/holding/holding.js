const moment = require('moment')

const EXPECTED_DATETIME_FORMAT = 'HH:mm DD/MM/YYYY'
const DATE_FORMAT = 'hh:mm a, dddd DD MMMM YYYY'

const getServiceAvailableFromMessage = (date, translate) =>
  date ? `${translate('holding.useServiceFrom')} ${date}` : translate('holding.tryAgainLater')

const pageContent = ({ translate }, date) => ({
  title: translate('holding.title'),
  heading: translate('holding.heading'),
  serviceAvailableFromMessage: getServiceAvailableFromMessage(date, translate)
})

const formatDate = (date, language = 'en') => {
  if (!(date && moment(date, EXPECTED_DATETIME_FORMAT, true).isValid())) {
    return undefined
  }

  return moment(date, EXPECTED_DATETIME_FORMAT).locale(language).format(DATE_FORMAT)
}

const registerHoldingRoute = (config, app) => {
  const serviceAvailableDate = config.environment.SERVICE_AVAILABLE_DATE

  app.all('*', (req, res) => {
    const formattedDate = formatDate(serviceAvailableDate, req.language)
    res.render('holding', pageContent({ translate: req.t }, formattedDate))
  })
}

module.exports = {
  registerHoldingRoute,
  formatDate,
  getServiceAvailableFromMessage
}
