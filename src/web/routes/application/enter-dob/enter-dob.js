const { validate } = require('./validate')
const { formatDateForDisplay } = require('../common/formatters')

const pageContent = ({ translate }) => ({
  title: translate('enterDob.title'),
  heading: translate('enterDob.heading'),
  hint: translate('enterDob.hint'),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('enterDob.dayLabel'),
  monthLabel: translate('enterDob.monthLabel'),
  yearLabel: translate('enterDob.yearLabel'),
  explanation: translate('enterDob.explanation')
})

const contentSummary = (req) => ({
  key: req.t('enterDob.summaryKey'),
  value: formatDateForDisplay(
    req.session.claim['dateOfBirth-day'],
    req.session.claim['dateOfBirth-month'],
    req.session.claim['dateOfBirth-year']
  )
})

const enterDob = {
  path: '/enter-dob',
  template: 'enter-dob',
  pageContent,
  validate,
  contentSummary
}

module.exports = {
  enterDob
}
