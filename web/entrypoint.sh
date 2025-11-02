#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Build and start the Next.js app
yarn run build && yarn run start
