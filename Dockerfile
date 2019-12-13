FROM node:13.3.0-alpine

WORKDIR /projects

COPY package.json package-lock.json ./

RUN apk add --no-cache \
  python \
  g++ \
  make \
  alpine-sdk && \
  npm config set python /usr/bin/python && \
  npm install
