# me-journal

## Project description

Me-journal is a [Next.js](https://nextjs.org) project to create journals about your day. The project is made as a zero-trust app which means that the server doesn't know anything about your data and never get your data.

## Setup

To setup this project, you need to install dependencies with `pnpm install` and then run [the database](#database). The setup of the database is described below.

To run this app you need to create a `.env` file, an example is available in the [.env.example file](./.env.example). Please replace `username`, `password` and `database` with the correct informations.

To run the development web server, simply run `pnpm dev`

## DataBase

We decided to use PostgreSQL on our project, to run the database you need to create a docker volume `me-journal-db-data` and simply run `docker compose up` or `docker compose up -d` if you want to start it in detached mode.

The database can be started on another server as well, if you want to, you need to change `localhost` on your `.env` file by the ip address of the server hosting your database. Please check your firewall.
