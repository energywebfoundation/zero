<h1 align="center">
  <br>
  <a href="https://www.energyweb.org/"><img src="https://www.energyweb.org/wp-content/uploads/2019/04/logo-brand.png" alt="EnergyWeb" width="150"></a>
  <br>
  EnergyWeb Zero
  <br>
  <br>
</h1>

<p align="center">
  <img src="https:s//github.com/energywebfoundation/zero/actions/workflows/deploy-master.yml/badge.svg" />
</p>

:construction: Documentation available at [https://energy-web-foundation-zero.readthedocs-hosted.com/en/latest/](https://energy-web-foundation-zero.readthedocs-hosted.com/en/latest/) :construction:

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Versions](#versions)
  * [Stable](#stable)
  * [Canary](#canary)
  * [Preview](#preview)
- [Running locally](#running-locally)
  * [Preparation](#preparation)
  * [Install dependencies](#install-dependencies)
  * [Test](#test)
  * [Run demo](#run-demo)
  * [Build](#build)
- [Docker](#docker)
  * [Images building](#images-building)
  * [Running containers](#running-containers)
  * [Database schema setup](#database-schema-setup)
    + [Deploying schema migrations](#deploying-schema-migrations)
    + [Resetting the database schema](#resetting-the-database-schema)
- [Contribution guidelines](#contribution-guidelines)

# Versions

## Stable

Stable versions of Zero are built during `release` branch build.

## Canary

Canary versions of Zero are are built during `master` branch builds. Canary reflects current state of the `master` branch, they should be a working versions considers as `alpha`

Install using `yarn add @energyweb/{package}@canary`

## Preview

Preview versions of  Zero are built on a special `preview` branch, this is mostly used as interal tool for tests, demos, discussions.

Install using `yarn add @energyweb/{package}@preview`

# Running locally

## Preparation

- Make sure you are using latest Node LTS
- Install [Postgres](https://www.postgresql.org/download/) 13.x+ and create a new database named `zero`.

   We recommend using Docker based setup as follows (requires psql command line tool installed):

```
docker run --name zero-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=zero -d -p 5432:5432 postgres:13.3-alpine
```

4. Use your preferred SMTP server and set SMTP_URL environment variable accordingly, or run local SMTP mocking server as
   a Docker container: `docker run --name zero-smtp -d -p 1025:1025 -p 8025:8025 mailhog/mailhog:latest` and
   set `SMTP_URL=smtp://localhost:1025`.
   You can access the web interface exposed by it on http://localhost:8025/ to see what emails are sent by EW Zero
   backend.


6. Make sure you have created a `.env` file in the root of the monorepo and that all necessary variables are set.
   Use [`.env.example`](.env.example) as an example of how the `.env` file should look.

## Install dependencies

```shell
yarn
```

## Test

```shell
yarn e2e
```

## Run demo
```shell
yarn start
```

## Build

```shell
yarn build
```

Visit the UI at: http://localhost:3000 to access user interface or http://localhost:3333/swagger to access Swagger
rendered document.


# Docker
## Images building

Two docker images are created after executing the command below: `zero-api`, `zero-ui`

```shell
yarn build:docker
```

Both frontend and backend applications will be built int /dest folder and then docker images created.

## Running containers

The following services needs to be created to run EW Zero stack:

```
version: '3'

services:
  ui:
    image: zero-ui
    ports:
      - 8080:80
    environment:
      API_BASE_URL: http://localhost:3333

  api:
    image: zero-api
    ports:
      - '3333:3333'
    volumes:
      - qa-backend-temp:/tmp # this is a temporary folder content does not need to be saved when container restarted
      - qa-backend-uploaded_files:/uploaded-files #this folder needs to be shared between instances if multiple
    environment:
      # LOG_LEVELS: "log,error,warn,debug,verbose" # useful for debugging/QA environment
      LOG_LEVELS: "log,error,warn" # recommended for production
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/zero" # user and password need to be in sync to the db service settings below
      SMTP_URL: "smtp://mailserver:1025"
      UI_BASE_URL: "http://localhost:8080"
      JWT_SECRET: "secret"
      JWT_TTL: "24h"
      CORS_ORIGIN: "http://localhost:8080"
      CORS_MAX_AGE: 60
    networks:
      zero:

  db:
    image: postgres:13.3-alpine
    volumes:
      - qa-db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: zero
    networks:
      zero:

  # this is a fake mailserver useful for testing/debugging/learing/making demos
  mailserver:
    image: mailhog/mailhog:latest
    restart: unless-stopped
    ports:
      - 8025:8025
    networks:
      zero:

volumes:
  qa-db-data:
  qa-backend-temp:
  qa-backend-uploaded_files:

networks:
  zero:
```
## Database schema setup

After having all stack running, a database schema needs to be set. According to your needs, there are two options here:

### Deploying schema migrations
Execute the following when your api service is running. You need to check name of the container. In this case it is `zero_api_1`.
```shell
# zero_api_1 is a name of your running instance of "api" service defined above. it may depend on folder name your docker-compose file is executed in
docker exec -it zero_api_1 prisma migrate deploy
```

### Resetting the database schema
Execute the following when your api service is running. You need to check name of the container. In this case it is `zero_api_1`.
```shell
# zero_api_1 is a name of your running instance of "api" service defined above. it may depend on folder name your docker-compose file is executed in
docker exec -it zero_api_1 prisma migrate reset --force --skip-seed --skip-generate
```

# Contribution guidelines

If you want to contribute to Zero, be sure to follow classic open source contribution guidelines (described below).

1. Commiting a change
    - Fork the repository
    - Make a change to repo code
    - Commit the change to the `master` branch
2. Pull request
    - Open a pull request from your fork `master` branch
    - Request code reviews from [@arkadiuszsz](https://github.com/arkadiuszsz)
    - Once the PR is approved and the build passes, it will be merged to the master branch
