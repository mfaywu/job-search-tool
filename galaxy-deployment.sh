#!/bin/sh

if [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "Deploying master branch to Galaxy"
    DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy job-search.meteorapp.com
else
    echo "No deployment. Branch is not master."
fi