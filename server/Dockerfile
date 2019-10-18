FROM node:10.16.3-alpine as server

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install -qy

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]