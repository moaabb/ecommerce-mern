FROM node:latest AS build

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm ci --only=production && \
  npm ci --only=production --prefix frontend && \
  npm run build --prefix frontend

FROM node:lts-alpine@sha256:514057228491197ab8c8a6858e5e142f4de4ea013ac1813596d605952e0cb842

ENV PORT=5000
ENV NODE_ENV=production

RUN apk add dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app /usr/src/app

USER node

EXPOSE 5000

ENTRYPOINT [ "dumb-init" ]
CMD [ "node", "./backend/server.js" ]
