#!/bin/bash

APP_HOST=https://$1
export APP_HOST
echo "Running smoke tests using APP_HOST=${APP_HOST}, APP_NAME=${APP_NAME}"

npm run test:smoke
