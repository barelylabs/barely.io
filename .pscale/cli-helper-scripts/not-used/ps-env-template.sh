#!/bin/bash
export ORG_NAME="$ORG_NAME"
echo "ORG_NAME=$ORG_NAME" >> $GITHUB_OUTPUT

export DB_NAME="$DB_NAME"
echo "DB_NAME=$DB_NAME" >> $GITHUB_OUTPUT

export BRANCH_NAME="$BRANCH_NAME"
echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_OUTPUT

export DEPLOY_REQUEST_NUMBER="$DEPLOY_REQUEST_NUMBER"
echo "DEPLOY_REQUEST_NUMBER=$DEPLOY_REQUEST_NUMBER" >> $GITHUB_OUTPUT

export DEPLOY_REQUEST_URL="$DEPLOY_REQUEST_URL"
echo "DEPLOY_REQUEST_URL=$DEPLOY_REQUEST_URL" >> $GITHUB_OUTPUT

export BRANCH_URL="$BRANCH_URL"
echo "BRANCH_URL=$BRANCH_URL" >> $GITHUB_OUTPUT
