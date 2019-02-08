require('dotenv')
const download = require('download')
const fs = require('fs')
const { exec } = require('child_process')
const request = require('request')
const retry = require('retry')

const WIREMOCK_URL = 'http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.21.0/wiremock-standalone-2.21.0.jar'
const WIREMOCK_LOCATION = `${process.env.BIN_DIR}/wiremock.jar`
const WIREMOCK_PORT = process.env.WIREMOCK_PORT || 8090

const getWiremock = () => {
  if (!fs.existsSync(WIREMOCK_LOCATION)) {
    download(WIREMOCK_URL).then(data => {
      fs.writeFileSync(WIREMOCK_LOCATION, data)
    })
  }
}

const isWiremockRunning = (operation) => {
  request.get(`http://localhost:${WIREMOCK_PORT}/__admin`, function (err, response) {
    if (operation.retry(err)) {
      return
    }

    if (response.status === 200) {
      return ''
    }
  })
}

const waitForWiremockToStart = () => {
  const operation = retry.operation({
    retries: 10,
    factor: 1,
    minTimeout: 100
  })

  operation.attempt(function (currentAttempt) {
    isWiremockRunning(operation)
  })
}

const startWiremock = () => {
  getWiremock()
  exec(`java -jar ${WIREMOCK_LOCATION} --port ${WIREMOCK_PORT}`)
  waitForWiremockToStart()
  console.log('Started wiremock')
}

const stopWiremock = () => {
  request.post(`http://localhost:${WIREMOCK_PORT}/__admin/shutdown`, function (err, response) {
    if (err || response.statusCode !== 200) {
      return console.error('Failed to shutdown wiremock')
    }

    console.log('Shutdown wiremock')
  })
}

module.exports = {
  startWiremock,
  stopWiremock
}
