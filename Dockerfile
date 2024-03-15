FROM docker.io/library/node:21.7.1-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN npm install --dev && npm run build
FROM docker.io/library/node:21.7.1-alpine3.19 AS base
WORKDIR /app
COPY --from=builder /app/package*.json .
RUN npm install --omit=dev
COPY --from=builder /app/dist .
CMD [ "node", "." ]
