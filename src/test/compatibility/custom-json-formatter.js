const { JsonFormatter } = require('cucumber')

require('dotenv').config()

class CustomJsonFormatter extends JsonFormatter {
  getFeatureData (feature, uri) {
    const featureData = super.getFeatureData(feature, uri)
    const metadata = {
      'browser': {
        'name': this.fixBrowserName(),
        'version': process.env.BROWSER_STACK_BROWSER_VERSION
      },
      'device': process.env.BROWSER_STACK_DEVICE || process.env.BROWSER_STACK_OS,
      'platform': {
        'name': this.fixPlatformName(),
        'version': process.env.BROWSER_STACK_OS_VERSION
      }
    }
    featureData.metadata = metadata
    return featureData
  }

  getScenarioData ({
    featureId,
    pickle,
    scenarioLineToDescriptionMap
  }) {
    const scenarioData = super.getScenarioData({ featureId: featureId, pickle: pickle, scenarioLineToDescriptionMap: scenarioLineToDescriptionMap })
    scenarioData.sessionId = pickle.sessionID
    scenarioData.name = `${scenarioData.name} (BrowserStack session id: ${pickle.sessionID})`
    return scenarioData
  }

  fixBrowserName () {
    let fixed = process.env.BROWSER_STACK_BROWSER.toString().toLowerCase()
    if (fixed === 'ie') {
      fixed = 'internet explorer'
    }
    return fixed
  }

  fixPlatformName () {
    let fixed = (process.env.BROWSER_STACK_OS || process.env.BROWSER_STACK_BROWSER).toString().toLowerCase()
    if (fixed === 'os x') {
      fixed = 'osx'
    }
    if (fixed === 'iphone') {
      fixed = 'ios'
    }
    return fixed
  }
}
module.exports = CustomJsonFormatter
