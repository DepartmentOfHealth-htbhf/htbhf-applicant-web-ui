#!/bin/bash
# Identifies the new version number, creates a git tag and pushes changes back to github
# Based on http://phdesign.com.au/programming/auto-increment-project-version-from-travis/

# quit at the first error
set -e

# if this is a pull request or branch (non-master) build, then just exit
echo "TRAVIS_PULL_REQUEST=$TRAVIS_PULL_REQUEST, TRAVIS_BRANCH=$TRAVIS_BRANCH"
if [[ "$TRAVIS_PULL_REQUEST" != "false"  || "$TRAVIS_BRANCH" != "master" ]]; then
    echo "Not tagging pull request or branch build"
    exit
fi

# make sure we know about all tags
git fetch --tags -q

# First, determine the new version number
# Read the current major and minor version from package.json (e.g. 1.2.):
PACKAGE_VERSION=$(sed -nE 's/^[ \\t]*"version": "([0-9]{1,}\.[0-9]{1,}\.)[0-9x]{1,}",$/\1/p' package.json;)
# Get the latest git tag (e.g. v1.2.43)
GIT_LATEST_TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
# Split out the major and minor version and the patch version into separate parts (e.g. 1.2. 43):
GIT_VERSION=$(echo "$GIT_LATEST_TAG" | sed -E 's/^v?([0-9]{1,}\.[0-9]{1,}\.)([0-9]{1,})$/\1 \2/g';)
# If PACKAGE_VERSION matches the first part of GIT_VERSION (major.minor.), just increment the patch version, otherwise use major.minor from package.json and reset patch to 1
NEW_VERSION=$(echo "$PACKAGE_VERSION $GIT_VERSION" | awk '{printf($1==$2?$2$3+1:$1"1")}')
echo "PACKAGE_VERSION=$PACKAGE_VERSION, GIT_VERSION=$GIT_VERSION, NEW_VERSION=$NEW_VERSION"

# we're currently in a detached head - checkout master so we can push our new version back
git checkout master

# tell npm to update the version and create a tag
npm version ${NEW_VERSION} -m "Set version to %s [ci skip]"

# push the new tag and updated master back to github
git config --local user.email "travis@travis-ci.org"
git config --local user.name "Travis CI"

NEW_VERSION=$(echo "v$NEW_VERSION")

echo "Last 2 commits:"
git log -n 2 --oneline

echo "git push https://[SECRET]@github.com/${TRAVIS_REPO_SLUG}.git ${NEW_VERSION} master"
git push https://${GH_WRITE_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git ${NEW_VERSION} master
