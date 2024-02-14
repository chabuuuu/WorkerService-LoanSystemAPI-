# WORKER SERVICE
## A Service In Loan MIcroservice System

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Worker Service là một service thuộc hệ thống Loan Microservice System, được viết bằng NestJS và giao tiếp với các Service khác thông qua RabbitMQ để thực hiện ghi log, sync database, tạo database backup, gửi thông tin hệ thống đến Admin.

## Features
- Quản lý thông tin Admin
- Quản lý SyncDB Log
- Quản lý Message Log
- Quản lý System Mornitor Log
- Lập lịch thực hiện các task như:
    + Ghi log message
    + Sync và ghi log sync database
    + Gửi message đến các service khác thông qua RabbitMQ
    + Tạo database backup và gửi đến Telegram của Admin được yêu cầu
    + Gửi thông tin hệ thống của server (Ram usage, CPU usage,...) đến Telegram của Admin được yêu cầu
    
## Tech

- [NestJS] - for API building
- [Postgresql] - Database
- [Redis] - for caching
- [Prisma] - ORM

## Enviroment variables
Xem file .env.example
```env
RABBITMQ_CLOUD="" //RabbitMQ Cloud Connectsion String
RABBITMQ_DOCKER="" //RabbitMQ Docker Connectsion String

DATABASE_URL="" //PostgreSQL Connection String:

REDIS_HOST="" //Redis HOST
REDIS_PORT="" //Redis PORT

JWT_SECRET ="" //JWT Secret Key
JWT_EXPIRES_IN="" //JWT Expire 

TELE_BOT_TOKEN="" //Telegram bot API Key
TELE_CHAT_ID="" //Chat ID Of Telegram User For Test

ROOT_DIR="" //Project Root Directory
```

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd Worker-API
npm i
npm run start:dev
```

For production environments...

```sh
cd Worker-API
npm i
npm run start:prod
```

## Swagger Document
```sh
cd WorkerService.Swagger
npm i
npm run swagger
```
Sau đó vào: http://localhost:[PORT]/api-docs



