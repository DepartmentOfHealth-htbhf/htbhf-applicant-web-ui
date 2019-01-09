#!/bin/bash

APP_HOST=$1
export APP_HOST
echo "Running smoke tests using APP_HOST=${APP_HOST}, APP_NAME=${APP_NAME}"
echo "test/smoke/environment.js:"
cat test/smoke/environment.js

npm run test:smoke
