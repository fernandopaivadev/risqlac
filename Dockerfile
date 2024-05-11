ARG APP_NAME=risqlac

# stage 1: build frontend
FROM node:latest as build-frontend

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN npm ci && \
	npm run build
#-----------------------------------

# stage2: build backend
FROM golang:latest as build-backend

ARG APP_NAME
ENV APP_NAME=$APP_NAME
ENV CGO_ENABLED=1

COPY --from=build-frontend /app /app
WORKDIR /app

RUN	go mod download && \
	go build -o $APP_NAME
#-----------------------------------

# final stage: run application
FROM busybox:latest

# create group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# switch to user
USER appuser

ARG APP_NAME
ENV APP_NAME=$APP_NAME

COPY --from=build-backend /app /app
WORKDIR /app

EXPOSE 3000

CMD ./$APP_NAME
