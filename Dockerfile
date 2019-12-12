FROM node:13.3.0-alpine

WORKDIR /projects

RUN apk add --no-cache \
  python \
  g++ \
  make \
  alpine-sdk && \
  npm config set python /usr, 'generate-api-docs'/bin/python
