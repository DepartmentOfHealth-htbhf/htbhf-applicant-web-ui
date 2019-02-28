#!/bin/bash

TEST_ONLY_COUNT=$(grep -ori test.only src | wc -l)
if [ ${TEST_ONLY_COUNT} -gt 0 ];then
    echo "'test.only' found in source code. Exiting the build."
    exit 1
fi

