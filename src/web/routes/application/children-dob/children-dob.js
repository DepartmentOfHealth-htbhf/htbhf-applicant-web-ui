const pageContent = ({ translate }) => ({
  title: translate('childrenDob.title'),
  heading: translate('childrenDob.heading'),
  hint: translate('childrenDob.hint'),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('childrenDob.dayLabel'),
  monthLabel: translate('childrenDob.monthLabel'),
  yearLabel: translate('childrenDob.yearLabel'),
  explanation: translate('childrenDob.explanation'),
  nameLabel: translate('childrenDob.nameLabel'),
  dateOfBirth: translate('childrenDob.dateOfBirth'),
  aboutYourChild: translate('childrenDob.')
})

const childrenDob = {
  path: '/children-dob',
  next: () => '/are-you-pregnant',
  template: 'children-dob',
  pageContent
}

module.exports = {
  childrenDob
}
