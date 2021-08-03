<h1 align="center">
  <br>
  <a href="https://www.energyweb.org/"><img src="https://www.energyweb.org/wp-content/uploads/2019/04/logo-brand.png" alt="EnergyWeb" width="150"></a>
  <br>
  EnergyWeb Zero
  <br>
  <br>
</h1>

**Zero** description.

<p align="center">
  <img src="https:s//github.com/energywebfoundation/zero/actions/workflows/deploy-master.yml/badge.svg" />
</p>

:construction: Documentation available at [https://energy-web-foundation-zero.readthedocs-hosted.com/en/latest/](https://energy-web-foundation-zero.readthedocs-hosted.com/en/latest/) :construction:

## Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Packages](#packages)
    -   [Applications, Infrastructure and Demo](#applications-infrastructure-and-demo)
    -   [Packages types](#packages-types)
        -   [Stable](#stable)
        -   [Canary](#canary)
        -   [Preview](#preview)
-   [Installation](#installation)
-   [Build](#build)
-   [Test](#test)
-   [Run demo](#run-demo)
    -   [Preparation](#preparation)
    -   [Running](#running)
    -   [Heroku environment provisioning](#heroku-environment-provisioning)
-   [Energy Attribute Certificates](#energy-attribute-certificates)
-   [Key modules and components](#key-modules-and-components)
    -   [Key repositories](#key-repositories)
    -   [Other components](#other-components)
-   [Deployment](#deployment)
-   [Contribution guidelines](#contribution-guidelines)



#### Stable

Stable versions of Zero are built during `release` branch build.

#### Canary

Canary versions of Zero are are built during `master` branch builds. Canary reflects current state of the `master` branch, they should be a working versions considers as `alpha`

Install using `yarn add @energyweb/{package}@canary`

#### Preview

Preview versions of  Zero are built on a special `preview` branch, this is mostly used as interal tool for tests, demos, discussions.

Install using `yarn add @energyweb/{package}@preview`

## Preparation

1. Make sure you are using latest Node LTS 
2. Make sure you have Java runtime installed
3. Install [Postgres](https://www.postgresql.org/download/) 12.x+ and create a new database named `zero`.

   We recommend using Docker based setup as follows (requires psql command line tool installed):

```
docker pull postgres
docker run --name zero-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=zero -d -p 5432:5432 postgres
```

4. Use your preferred SMTP server and set SMTP_URL environment variable accordingly, or run local SMTP mocking server as
   a Docker container: `docker run --name zero-smtp -d -p 1025:1025 -p 8025:8025 mailhog/mailhog:latest` and
   set `SMTP_URL=smtp://localhost:1025`.
   You can access the web interface exposed by it on http://localhost:8025/ to see what emails are sent by EW Zero
   backend.


6. Make sure you have created a `.env` file in the root of the monorepo and that all necessary variables are set.
   Use [`.env.example`](.env.example) as an example of how the `.env` file should look.

## Installation

```shell
yarn
```

## Build

```shell
yarn build
```

## Test

```shell
yarn e2e
```

## Run demo
```shell
yarn start
```

Visit the UI at: http://localhost:3000.


## Deployment

For deployment instructions please refer to [Deployment](https://github.com/energywebfoundation/zero/wiki/Zero-Deployment) wiki page.

## Contribution guidelines

If you want to contribute to Zero, be sure to follow classic open source contribution guidelines (described below).

1. Commiting a change
    - Fork the repository
    - Make a change to repo code
    - Commit the change to the `master` branch
2. Pull request
    - Open a pull request from your fork `master` branch
    - Request code reviews from [@arkadiuszsz](https://github.com/arkadiuszsz)
    - Once the PR is approved and the build passes, it will be merged to the master branch
