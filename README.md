# Dealio
A site to track prices for your most wanted items! Utilizes React and Express for the frontend and backend, Auth0 for authentication, Puppeteer to pull prices, and Sequelize as an ORM for MySQL to store data. All written in TypeScript!

## Local Install

To install and run locally, you will need [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/), [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/), and [Docker Compose](https://docs.docker.com/compose/).

Clone into this repo using:
 ``` bash
 $ git clone https://github.com/cfbender/dealio.git && cd dealio
```
Start up the server by building the container with:
```bash
 $ docker-compose up 
OR
 $ sudo docker-compose up
```

This application can also be run container-less, by executing `yarn build` or `npm run build` in `/client` and then `yarn start` or `npm run start` in `/server`

# Usage

Login using Auth0 with your Google account, and then start adding links to items! The application only supports the applications displayed on the landing page, but feel free to submit an issue or PR on GitHub to add more CSS selectors for Puppeteer!

On every item add or refresh, the application will pull the current prices to all items. If the price is lower, it will update the lowest price to the current price and store that.

# Future Ideas

- Email alerts
    + Would need scheduled refreshes




