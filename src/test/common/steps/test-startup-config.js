require('dotenv').config()

const { ACCEPTANCE_BASE_URL } = require('../../acceptance/config/constants')
const { SMOKE_BASE_URL } = require('../../smoke/config/environment')

const TESTS = process.env.TESTS

const URL = (TESTS === 'acceptance' ? ACCEPTANCE_BASE_URL : SMOKE_BASE_URL)

module.exports.URL = URL
