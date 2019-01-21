#!/bin/bash

attempt_counter=0
max_attempts=10

echo "Waiting for the app to start"

until $(curl --output /dev/null --silent --head --fail http://localhost:8080); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "App did not start within ${max_attempts} seconds"
      exit 1
    fi

    attempt_counter=$(($attempt_counter+1))
    sleep 1
done

echo "Application started"
