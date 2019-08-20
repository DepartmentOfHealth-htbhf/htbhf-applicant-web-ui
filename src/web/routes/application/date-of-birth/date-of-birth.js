const { validate } = require('./validate')
const { formatDateForDisplay } = require('../common/formatters')

const pageContent = ({ translate }) => ({
  title: translate('dateOfBirth.title'),
  heading: translate('dateOfBirth.heading'),
  hint: translate('dateOfBirth.hint'),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('dateOfBirth.dayLabel'),
  monthLabel: translate('dateOfBirth.monthLabel'),
  yearLabel: translate('dateOfBirth.yearLabel'),
  explanation: translate('dateOfBirth.explanation')
})

const contentSummary = (req) => ({
  key: req.t('dateOfBirth.summaryKey'),
  value: formatDateForDisplay(
    req.session.claim['dateOfBirth-day'],
    req.session.claim['dateOfBirth-month'],
    req.session.claim['dateOfBirth-year']
  )
})

const dateOfBirth = {
  path: '/date-of-birth',
  template: 'date-of-birth',
  pageContent,
  validate,
  contentSummary
}

module.exports = {
  dateOfBirth
}
