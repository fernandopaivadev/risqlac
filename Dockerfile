ARG APP_NAME=risqlac

FROM node:latest as build

WORKDIR /usr/app
COPY . .

WORKDIR /usr/app/frontend
RUN npm ci && \
	npm run build

FROM golang:latest as compile

ARG APP_NAME
ENV APP_NAME=$APP_NAME
ENV CGO_ENABLED=1

COPY --from=build /usr/app /usr/app
WORKDIR /usr/app

RUN	go mod download && \
	go build -o $APP_NAME

FROM busybox:latest

ARG APP_NAME
ENV APP_NAME=$APP_NAME

COPY --from=compile /usr/app /usr/app
WORKDIR /usr/app

EXPOSE 3000

CMD ./$APP_NAME
