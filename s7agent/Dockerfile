FROM node:14-alpine

WORKDIR /usr/app

COPY ./package.json ./
COPY ./ ./
RUN apk add --no-cache python3 py3-pip make g++
RUN npm install

CMD ["npm", "start"]