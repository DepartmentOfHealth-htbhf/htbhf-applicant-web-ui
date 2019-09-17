#!/bin/bash

bin_dir=${BIN_DIR:-./bin}
claimant_service_port=${CLAIMANT_SERVICE_PORT:-8090}
os_places_port=${OS_PLACES_PORT:-8150}

SCRIPT_DIR=$(dirname "$0")
source ${SCRIPT_DIR}/wait_for_url.sh

mkdir -p ${bin_dir}
if [ ! -f ${bin_dir}/wiremock.jar ]; then
  wget http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.21.0/wiremock-standalone-2.21.0.jar -O ${bin_dir}/wiremock.jar
fi

echo "Starting Wiremock on port ${claimant_service_port} for claimant service"
java -Xmx64m -jar ${bin_dir}/wiremock.jar --port ${claimant_service_port} &

echo "Starting Wiremock on port ${os_places_port} for OS places"
java -Xmx64m -jar ${bin_dir}/wiremock.jar --port ${os_places_port} &

echo "Waiting for wiremock to start"

wait_for_url http://localhost:${claimant_service_port}/__admin

wait_for_url http://localhost:${os_places_port}/__admin

echo "Wiremock started"
