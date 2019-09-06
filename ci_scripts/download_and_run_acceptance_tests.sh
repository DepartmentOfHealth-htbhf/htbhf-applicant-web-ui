#!/bin/bash

export WORKING_DIR=$(pwd)
if [ -z "$BIN_DIR" ]; then
  export BIN_DIR=${WORKING_DIR}/bin
fi

echo "WORKING_DIR=${WORKING_DIR}"
echo "BIN_DIR=${BIN_DIR}"

mkdir -p "${BIN_DIR}"

export FEATURE_TOGGLES=$(cat "${WORKING_DIR}"/features.json)

source "${WORKING_DIR}"/test_versions.properties
source "${WORKING_DIR}"/local_acceptance_tests.properties

check_variable_is_set(){
    if [[ -z ${!1} ]]; then
        echo "$1 must be set and non empty. ($2)"
        exit 1
    fi
}

download_acceptance_tests(){
    check_variable_is_set ACCEPTANCE_TESTS_VERSION "The version of the acceptance tests to run. This should be set in test_versions.properties."
    export ACCEPTANCE_TESTS_DIR=${BIN_DIR}/htbhf-acceptance-tests
    mkdir -p "${ACCEPTANCE_TESTS_DIR}"
    if [[ ! -e ${ACCEPTANCE_TESTS_DIR}/version_${ACCEPTANCE_TESTS_VERSION}.info ]]; then
      echo "Downloading acceptance tests version ${ACCEPTANCE_TESTS_VERSION}"
      rm -rf ${ACCEPTANCE_TESTS_DIR}
      mkdir ${ACCEPTANCE_TESTS_DIR}
      curl -L -o acceptance-tests-tmp.zip https://github.com/DepartmentOfHealth-htbhf/htbhf-acceptance-tests/archive/v${ACCEPTANCE_TESTS_VERSION}.zip
      unzip acceptance-tests-tmp.zip
      mv -f htbhf-acceptance-tests-${ACCEPTANCE_TESTS_VERSION}/* ${ACCEPTANCE_TESTS_DIR}
      rm -rf htbhf-acceptance-tests-${ACCEPTANCE_TESTS_VERSION}
      rm acceptance-tests-tmp.zip
      touch ${ACCEPTANCE_TESTS_DIR}/version_${ACCEPTANCE_TESTS_VERSION}.info
    fi
}

run_acceptance_tests() {
    check_variable_is_set SESSION_DETAILS_PORT "The port (on localhost) on which the session details app is running."
    check_variable_is_set ACCEPTANCE_TESTS_DIR
    TAGS=$(cat ${WORKING_DIR}/features.json | grep false | sed 's/": false//g' | sed 's/"/ and not @/g' | sed "s/,//g" | sed "s/_ENABLED//g" | tr '\n' ' ')
    ${ACCEPTANCE_TESTS_DIR}/ci_scripts/download_chromedriver.sh
    export SESSION_DETAILS_URL="http://localhost:${SESSION_DETAILS_PORT}/session-details/confirmation-code"
    cd ${ACCEPTANCE_TESTS_DIR}
    ./gradlew -Dcucumber.options="--tags 'not @Ignore ${TAGS}'" clean build
    RESULT=$?
    cd ${WORKING_DIR}
    # copy the reports to build/reports
    REPORTS_DIR="${WORKING_DIR}/build/reports"
    mkdir -p "${REPORTS_DIR}"
    mv "${ACCEPTANCE_TESTS_DIR}/build/reports/tests/test" "${REPORTS_DIR}/htbhf-acceptance-tests"
    if [[ "$RESULT" != "0" ]]; then
      cat "${REPORTS_DIR}/htbhf-acceptance-tests/classes/uk.gov.dhsc.htbhf.RunAcceptanceTests.html"
    fi
    return $RESULT
}

if [[ "$USE_LOCAL_ACCEPTANCE_TESTS" != "true" ]]; then
  download_acceptance_tests
fi

run_acceptance_tests
exit $?