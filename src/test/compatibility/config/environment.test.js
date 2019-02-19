require('dotenv').config()

const { getBrowserVersion } = require('./environment')

const test = require('tape')
const after = require('tape')

function setDeviceVersion (version) {
  process.env.BROWSER_STACK_DEVICE = version
}

function setBrowserVersion (version) {
  process.env.BROWSER_STACK_BROWSER_VERSION = version
}

function resetEnvironment () {
  delete process.env.BROWSER_STACK_DEVICE
  delete process.env.BROWSER_STACK_BROWSER_VERSION
}

test('getBrowserVersion browser version only', (t) => {
  setBrowserVersion('1.0')
  t.equal(getBrowserVersion(), '1.0', 'should match browser version only')
  resetEnvironment()
  t.end()
})

test('getBrowserVersion device version only', (t) => {
  setDeviceVersion('2.0')
  t.equal(getBrowserVersion(), '', 'should match device version only which yields a blank string')
  resetEnvironment()
  t.end()
})

test('getBrowserVersion both set', (t) => {
  setBrowserVersion('1.0')
  setDeviceVersion('2.0')
  t.equal(getBrowserVersion(), '1.0', 'should match browser version if both set')
  resetEnvironment()
  t.end()
})

test('getBrowserVersion neither set', (t) => {
  t.equal(getBrowserVersion(), 'latest', 'should match browser version if both set')
  resetEnvironment()
  t.end()
})

after('teardown', (t) => {
  resetEnvironment()
  t.end()
})
