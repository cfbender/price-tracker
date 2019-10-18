FROM node:12-alpine as client

WORKDIR /client

COPY package*.json ./

RUN yarn install -qy
COPY . .


EXPOSE 3000

CMD ["yarn", "start"]