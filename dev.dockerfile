FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk add --no-cache git curl bash

COPY .babelrc /usr/src/app/
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY src /usr/src/app/src

RUN yarn


CMD ["npm", "start"]