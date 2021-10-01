#!/bin/bash

#Reads environment file, and replaces local index.html with variables

#Read `.env` file
export $(echo $(cat ./.env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)

envsubst < ./apps/zero-ui/src/index.html.template > ./apps/zero-ui/src/index.html
