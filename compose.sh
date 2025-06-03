#!/bin/bash

# $1: The name of the service to run (e.g., "dev", "prod")
# $2: The action to perform (e.g., "up", "down", "logs")

export BUILD_TARGET=$1

docker compose --env-file .env.$1.local -f ./docker-compose/base.yml -f ./docker-compose/local.yml $2
