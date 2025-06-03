#!/bin/bash

# $1: The name of the service to run (e.g., "dev", "prod")
# $2: The action to perform (e.g., "up", "down", "logs")

docker compose -f ./docker-compose/core.yml -f ./docker-compose/$1.yml $2
