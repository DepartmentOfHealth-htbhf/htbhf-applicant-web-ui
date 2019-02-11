const { validate } = require('./validate')
const { formatDateForDisplay } = require('../common/formatters')

const pageContent = ({ translate }) => ({
  title: translate('enterDob.title'),
  heading: translate('enterDob.heading'),
  ninoLabel: translate('enterDob.ninoLabel'),
  hint: translate('enterDob.hint'),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('enterDob.dayLabel'),
  monthLabel: translate('enterDob.monthLabel'),
  yearLabel: translate('enterDob.yearLabel')
})

const contentSummary = (req, { claim }) => ({
  key: req.t('enterDob.summaryKey'),
  value: formatDateForDisplay(
    claim['dateOfBirth-day'],
    claim['dateOfBirth-month'],
    claim['dateOfBirth-year']
  )
})

const enterDob = {
  path: '/enter-dob',
  next: '/are-you-pregnant',
  template: 'enter-dob',
  pageContent,
  validate,
  contentSummary
}

module.exports = {
  enterDob
}
