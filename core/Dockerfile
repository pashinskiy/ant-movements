FROM node:16.3.0-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci
ADD . /app

ENTRYPOINT ["npm", "start"]
