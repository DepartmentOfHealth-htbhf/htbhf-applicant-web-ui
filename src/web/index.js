const express = require('express')
const config = require('../config')
const server = require('./server')

const app = express()

server.initialise(config, app)
