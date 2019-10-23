FROM node:12-alpine as server

WORKDIR /client
COPY client/package*.json ./
RUN yarn install -qy
COPY client/ ./
RUN yarn build


WORKDIR /server
COPY server/package*.json ./
RUN yarn install -qy
COPY server/ ./

RUN npx sequelize-cli db:migrate

EXPOSE 5000

CMD ["yarn", "start"]