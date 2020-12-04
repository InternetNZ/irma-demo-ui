#!/bin/bash

set -e

echo "Deploying to $AWS_PROFILE"

aws s3 sync . s3://irma-demo-ui/src/

echo "Done!"
