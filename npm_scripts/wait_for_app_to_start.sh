#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
source ${SCRIPT_DIR}/wait_for_url.sh

echo "Waiting for the app to start"

wait_for_url http://localhost:8080

echo "Application started"
