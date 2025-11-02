# syntax = docker/dockerfile:1
# Source: https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/

FROM node:24.9-alpine AS base

ARG GITHUB_SHA
ENV GITHUB_SHA=${GITHUB_SHA}

#ENV NEXT_TELEMETRY_DISABLED=1

# update dependencies, add libc6-compat
RUN apk update \
  && apk upgrade \
  && apk add --no-cache libc6-compat dumb-init 

# add the user and group we'll need in our final image
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#
# Install dependencies
#
FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && corepack prepare

RUN yarn install --immutable

#
# Production image
# build & run the app
#
FROM deps AS prod
WORKDIR /app

# Make sure root folder is owned by nextjs user, otherwise next can't build
RUN chown nextjs:nodejs .

# Copy deps
COPY --from=deps --chown=nextjs:nodejs /app ./

# Copy project files
COPY --chown=nextjs:nodejs . .

# Enable corepack
RUN corepack enable && corepack prepare

USER nextjs
EXPOSE 3000

# Build & start
CMD ["dumb-init", "./entrypoint.sh"]

#
# Development image
# Run the app in dev mode
#
FROM deps AS dev
WORKDIR /app

# Work dir must be owned by the nextjs user,
# because otherwise next can't create `.next` folder
RUN chown nextjs:nodejs .

# Copy data from the deps stage
COPY --from=deps --chown=nextjs:nodejs /app ./

# Copy repo data
COPY --chown=nextjs:nodejs . .

USER nextjs
EXPOSE 3000
RUN corepack enable && corepack prepare
CMD ["yarn", "dev"]

#
# Typecheck image
# Run the `typecheck` command
#
FROM dev AS typecheck
WORKDIR /app

COPY --from=dev --chown=nextjs:nodejs /app ./

RUN corepack enable && corepack prepare
RUN yarn next typegen

CMD ["yarn", "typecheck"]
