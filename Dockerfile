FROM node:11-alpine

WORKDIR /usr/src/app

COPY server/yarn.lock ./
COPY server/package.json ./

RUN yarn

COPY server .

EXPOSE 3000
CMD [ "yarn", "start" ]