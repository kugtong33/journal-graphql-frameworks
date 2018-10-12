# scaffoldjs

[![CircleCI](https://circleci.com/gh/kugtong33/scaffoldjs.svg?style=svg)](https://circleci.com/gh/kugtong33/scaffoldjs) [![codecov](https://codecov.io/gh/kugtong33/scaffoldjs/branch/master/graph/badge.svg)](https://codecov.io/gh/kugtong33/scaffoldjs) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Greenkeeper badge](https://badges.greenkeeper.io/kugtong33/scaffoldjs.svg)](https://greenkeeper.io/)

Just a bunch of stack that runs with [**GraphQL**](https://graphql.org/) and [**Typescript**](https://www.typescriptlang.org/)

## Getting Started

You can directly start hacking out this project in just 5 easy commands.

```bash
$ npm install
$ npx lerna bootstrap
$ npm run pg-setup

# ohh... I forgot you need docker, pull the latest postgres image and run it

$ npx lerna run lint
$ npx lerna run test
```

## Running the PostgreSQL instance

Install the latest [stable docker version](https://docs.docker.com/release-notes/docker-ce/) on [ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

Assuming you figured the installation out, next is to run the postgres container.

```bash
$ docker image pull postgres:latest
$ docker run --name postgres-scaffoldjs -e POSTGRES_PASSWORD=ZceIdtdqt4wvjmQQvWdO -p 5432:5432 -d postgres
```

### API Frameworks

- [x] Express
- [x] Koa
- [x] Nest
- [ ] Micro
- [ ] Serverless
- [ ] Meteor

### Dedicated ORMs

- [x] Typeorm
- [x] Sequelize