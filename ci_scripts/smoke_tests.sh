#!/bin/bash

APP_HOST=https://$1
export APP_HOST
echo "Running smoke tests using APP_HOST=${APP_HOST}, APP_NAME=${APP_NAME}"


status=$(curl --write-out '%{http_code}' --silent --output /dev/null ${APP_HOST}/scotland)

if [[ "$status" != "200" ]]; then
  exit $status
fi