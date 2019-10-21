#!/bin/bash

APP_HOST=https://$1
export APP_HOST
export APP_BASE_URL=$APP_HOST
echo "Running smoke tests using APP_BASE_URL=${APP_BASE_URL}, APP_NAME=${APP_NAME}"

npm run test:integration
