const { UK_POSTCODE_PATTERN, CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN } = require('./constants')

const checkPostcodeIsValid = (_, { req }) => UK_POSTCODE_PATTERN.test(req.body.sanitizedPostcode)

const checkPostcodeIsNotInChannelOrIslandOrIOM = (_, { req }) => !CHANNEL_ISLANDS_AND_IOM_POSTCODE_PATTERN.test(req.body.sanitizedPostcode)

module.exports = {
  checkPostcodeIsValid,
  checkPostcodeIsNotInChannelOrIslandOrIOM
}
