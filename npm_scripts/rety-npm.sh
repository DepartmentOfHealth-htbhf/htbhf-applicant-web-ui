#!/bin/bash
# Script that retries an NPM script several times, until it is successful or the maximum retry count is reached
# the return value will be that of the most recent attempt to run the script

maxAttempts=3
echo "Invoking 'npm run $@' up to ${maxAttempts} times"
for (( i=1; i<=${maxAttempts}; i++ ))
do
  npm run $@
  result=$?
  if [[ ${result} == 0 ]]; then
	break
  fi
  echo "Failed attempt #${i} of ${maxAttempts} at: 'npm run $@'"
done

exit $result