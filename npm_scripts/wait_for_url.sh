#!/bin/bash

wait_for_url() {
  attempt_counter=0
  max_attempts=10
  url=$1

  until $(curl --output /dev/null --silent --head --fail ${url}); do
      if [ ${attempt_counter} -eq ${max_attempts} ];then
        echo "${url} did not return a successful response within ${max_attempts} seconds"
        exit 1
      fi

      attempt_counter=$(($attempt_counter+1))
      sleep 1
  done
}
