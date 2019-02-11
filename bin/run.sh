#!/usr/bin/env bash

if [[ "$APP_ENV" = production ]]
then
    npm run build
else
    npm run watch
fi
