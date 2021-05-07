# Quizler

## Overview

Quizler is an open source web application where users can :-

- can create quiz.
- Attempt quizes created by others.
- share materials with others(functionality in progress).
- view analytical reports.

Demo : https://quizler-app.herokuapp.com

## Local Setup

- Clone repo
- run the following command in main directory to install server side node modules
  ```
  npm install
  ```
- run the following command in client directory to install client side node modules.

```
npm install
```

- create a file name dev.js in the keys folder to setup the local environment variables and keys

```
const dev = {
    MongoURI: <Your--MONGOURI>,
    secret: <Your--COOKIEKEY>, // any key value
    sendGrid: <Your--SENDGRID>, // your sendgrid api key
    supportEmail: <Your--SUPPORTEMAIL>, // your support email
    hashPass:<Your--HASHPASS >, //any value
    hashAlgo: <Your-- HASHALGO> // select your algo from node js crypto module like 'aes-192-cbc'
}
module.exports = dev;
```

- run the following command to run the application locally

```
npm run dev
```
