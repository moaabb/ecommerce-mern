FROM node:16-alpine3.13@sha256:f5079a4f93c8e4fd07ffa93fc95f6484d7f4f40abd126c11810cb282483ab599

COPY . /app

WORKDIR /app

RUN npm install && npm ci --only=production --prefix frontend && npm run build --prefix frontend

EXPOSE 5000

ENTRYPOINT [ "node", "./backend/server.js" ]
