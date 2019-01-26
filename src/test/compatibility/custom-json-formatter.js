const { JsonFormatter } = require('cucumber')

require('dotenv').config()

class CustomJsonFormatter extends JsonFormatter {
  getFeatureData (feature, uri) {
    const features = super.getFeatureData(feature, uri)
    const metadata = {
      'browser': {
        'name': process.env.BROWSER_STACK_BROWSER,
        'version': process.env.BROWSER_STACK_BROWSER_VERSION
      },
      'device': process.env.BROWSER_STACK_DEVICE || process.env.BROWSER_STACK_OS,
      'platform': {
        'name': process.env.BROWSER_STACK_OS || process.env.BROWSER_STACK_DEVICE,
        'version': process.env.BROWSER_STACK_OS_VERSION
      }
    }
    features.metadata = metadata
    return features
  }
}
module.exports = CustomJsonFormatter
