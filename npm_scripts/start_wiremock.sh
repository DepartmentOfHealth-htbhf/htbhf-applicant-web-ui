#!/bin/bash

bin_dir=${BIN_DIR:-./bin}
wiremock_port=${WIREMOCK_PORT:-8090}

SCRIPT_DIR=$(dirname "$0")
source ${SCRIPT_DIR}/wait_for_url.sh

mkdir -p ${bin_dir}
if [ ! -f ${bin_dir}/wiremock.jar ]; then
  wget http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.21.0/wiremock-standalone-2.21.0.jar -O ${bin_dir}/wiremock.jar
fi

java -jar ${bin_dir}/wiremock.jar --port ${wiremock_port} &

echo "Waiting for wiremock to start"

wait_for_url http://localhost:${wiremock_port}/__admin

echo "Wiremock started"
