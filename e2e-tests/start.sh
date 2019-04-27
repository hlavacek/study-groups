#!/bin/sh

yarn start
TEST_EXIT=$?

yarn html-report

echo "Exiting with exit code $TEST_EXIT"
exit $TEST_EXIT
