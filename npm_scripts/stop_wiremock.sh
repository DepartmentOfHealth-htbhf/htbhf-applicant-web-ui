#!/bin/bash

wiremock_port=${WIREMOCK_PORT:-8090}

curl -d "{}" http://localhost:${wiremock_port}/__admin/shutdown
