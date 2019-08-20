const { get } = require('../../common/request')
const { dateIn3Months, dateLastYear } = require('../../common/dates')
const { VALID_ELIGIBLE_NINO, PHONE_NUMBER, EMAIL_ADDRESS, TEXT } = require('../../common/steps/constants')
const { SESSION_CONFIRMATION_CODE_URL } = require('../../common/config')
const { URLS } = require('../paths')

const APPLICATION_COMPLETE_TITLE = 'GOV.UK - Application complete'

const apply = [
  {
    url: URLS['DO_YOU_LIVE_IN_SCOTLAND'],
    formData: () => ({
      scotland: 'no'
    })
  },
  {
    url: URLS['ENTER_DOB'],
    formData: () => ({
      'dateOfBirth-day': '1',
      'dateOfBirth-month': '10',
      'dateOfBirth-year': '1980'
    })
  },
  {
    url: URLS['DO_YOU_HAVE_CHILDREN'],
    formData: () => ({
      doYouHaveChildren: 'yes'
    })
  },
  {
    url: URLS['CHILDREN_DOB'],
    formData: () => {
      const childDob = dateLastYear()
      return {
        'childName-1': 'Bart',
        'childDob-1-day': childDob.getDate(),
        'childDob-1-month': childDob.getMonth() + 1,
        'childDob-1-year': childDob.getFullYear()
      }
    }
  },
  {
    url: URLS['ARE_YOU_PREGNANT'],
    formData: () => {
      const dueDate = dateIn3Months()
      return {
        areYouPregnant: 'yes',
        'expectedDeliveryDate-day': dueDate.getDate(),
        'expectedDeliveryDate-month': dueDate.getMonth() + 1,
        'expectedDeliveryDate-year': dueDate.getFullYear()
      }
    }
  },
  {
    url: URLS['ENTER_NAME'],
    formData: () => ({
      firstName: 'Lisa',
      lastName: 'Simpson'
    })
  },
  {
    url: URLS['ENTER_NINO'],
    formData: () => ({
      nino: VALID_ELIGIBLE_NINO
    })
  },
  {
    url: URLS['POSTCODE'],
    formData: () => ({
      'postcode': 'AA1 1AA'
    }),
    toggle: 'ADDRESS_LOOKUP_ENABLED'
  },
  {
    url: URLS['MANUAL_ADDRESS'],
    formData: () => ({
      'addressLine1': 'Flat B',
      'addressLine2': 'Baker Street',
      'townOrCity': 'London',
      'county': 'Greater London',
      'postcode': 'AA1 1AA'
    })
  },
  {
    url: URLS['PHONE_NUMBER'],
    formData: () => ({
      phoneNumber: PHONE_NUMBER
    })
  },
  {
    url: URLS['EMAIL_ADDRESS'],
    formData: () => ({
      emailAddress: EMAIL_ADDRESS
    })
  },
  {
    url: URLS['SEND_CODE'],
    formData: () => ({
      channelForCode: TEXT
    })
  },
  {
    url: URLS['ENTER_CODE'],
    formData: async (requestCookie) => {
      const confirmationCode = await get(SESSION_CONFIRMATION_CODE_URL, requestCookie)
      console.log(`Retrieved confirmation code ${confirmationCode} from ${SESSION_CONFIRMATION_CODE_URL}`)
      return { confirmationCode }
    }
  },
  {
    url: URLS['CHECK']
  },
  {
    url: URLS['TERMS_AND_CONDITIONS'],
    formData: () => ({
      agree: 'agree'
    })
  },
  {
    url: URLS['CONFIRM'],
    formData: () => ({}),
    issueChecks: [
      (url, result) => result.documentTitle !== APPLICATION_COMPLETE_TITLE
        ? `Expected title to be ${APPLICATION_COMPLETE_TITLE}, instead got ${result.documentTitle}`
        : null
    ]
  }
]

module.exports = {
  apply
}
