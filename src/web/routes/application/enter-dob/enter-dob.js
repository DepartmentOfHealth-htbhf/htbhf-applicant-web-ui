const { validate } = require('./validate')
const { transformData } = require('./transform-data')

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

const enterDob = {
  path: '/enter-dob',
  next: '/are-you-pregnant',
  template: 'enter-dob',
  pageContent,
  validate,
  transformData
}

module.exports = {
  enterDob
}
