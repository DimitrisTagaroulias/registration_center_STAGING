## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Possible errors](#possible-errors)

## General info:

As a junior Front-End Web Developer my purpose for creating this project was to work and learn more for Back End Technologies.

This project consists of two individual Web Applications, the "Registration Center" and the "School of Athens App".

1. On the "Registration Center" the user can:

   - register a student to a school(on a live DataBase).
   - select if he wants the school to receive a notification.

2. The "School of Athens App" is an individual Web Application that is live on the Web.
   When "School of Athens App" receives a notification via "Webhook" of a student's registration:

   - it sends a response to our server and our server sends a "notification" via "Socket.IO" to our browser in order to visualize data on school's Email Inbox.

## Technologies:

- HTML
- CSS
- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- Socket.IO

## Prerequisites:

- NodeJS
- MongoDB

## Setup:

```
On Terminal:

1. cd school
2. npm i
3. npm run start
4. cd app/server
5. npm i
6. npm run start
7. cd app/client
8. npm i
9. npm run dev

```

## Possible errors:

- If this error occurs:

  "Access to XMLHttpRequest at 'http://localhost:3200/socket.io/?EIO=4&transport=polling&t=ORCRIAH' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."

  try to fix it by changing "127.0.0.1" to "localhost":

  - on file "app\server\service\WebSocket.js"
  - on "line 9
  - on "cors: {origin: [`http://127.0.0.1:${client_Port}`]
    }"

- If this error occurs:

  "School.js:62 Uncaught (in promise) Error: TypeError: Failed to fetch
  at School.get_Schools_And_Students (School.js:62:13)
  at async showSchools (index.js:32:33)"

  ...probably Mongoose failed to connect.

  Try to fix it by changing "localhost" to "127.0.0.1":

  - on "file app\server\server.js"
  - on "line 31"
  - on "new DatabaseConnection(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_data");"
