#!/bin/bash

claimant_service_port=${CLAIMANT_SERVICE_PORT:-8090}
os_places_port=${OS_PLACES_PORT:-8150}

curl -d "{}" http://localhost:${claimant_service_port}/__admin/shutdown

curl -d "{}" http://localhost:${os_places_port}/__admin/shutdown
