# syntax = docker/dockerfile:1
# Source: https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/

FROM node:23-alpine AS base

ARG GITHUB_SHA
ENV GITHUB_SHA=${GITHUB_SHA}

ENV NODE_ENV=production
ENV YARN_VERSION=4.2.2
#ENV NEXT_TELEMETRY_DISABLED=1

# update dependencies, add libc6-compat
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# add the user and group we'll need in our final image
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#
# Install dependencies
#
FROM base AS deps
WORKDIR /app

COPY . .
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

# Build the app in standalone mode (This must be set in `next.config.js`!)
# This will create a .next/standalone folder with the server.js file and all the dependencies
FROM deps AS build
WORKDIR /app

COPY --from=deps ./app .

RUN yarn build

#
# Production image
#
# This will copy the .next/standalone folder and the public folder to the final image
# and run the server.js file
FROM build AS prod
WORKDIR /app

# copy the public folder from the project as this is not included in the build process
COPY --from=build --chown=nextjs:nodejs /app/public ./public
# copy the standalone folder inside the .next folder generated from the build process
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
# copy the static folder inside the .next folder generated from the build process
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node","server.js"]

#
# Development image
#
FROM deps AS dev
WORKDIR /app

# Copy data from the deps stage
COPY --from=deps --chown=nextjs:nodejs /app .

USER nextjs

EXPOSE 3000

CMD ["yarn", "dev"]
