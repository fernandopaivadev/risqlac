FROM ubuntu:latest

ENV APP_NAME=risqlac
ENV CGO_ENABLED=1
ENV GO_VERSION=1.20.3

RUN apt update -y && \
	apt install -y tar && \
	apt install -y wget && \
	apt install -y gcc && \
	wget https://go.dev/dl/go$GO_VERSION.linux-amd64.tar.gz && \
	tar -C /usr/local -xzf go$GO_VERSION.linux-amd64.tar.gz && \
	export PATH=$PATH:/usr/local/go/bin && \
	go version

WORKDIR /usr/server/$APP_NAME
COPY . .

RUN export PATH=$PATH:/usr/local/go/bin && \
	go mod tidy && \
	go build -o $APP_NAME

EXPOSE 3000

CMD ./$APP_NAME
