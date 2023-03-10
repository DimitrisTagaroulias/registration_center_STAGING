## Table of contents

---

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info:

---

As a junior Front-End Web Developer my purpose for creating this project was to work and learn more for Back End Technologies.

This project consists of two individual Web Applications, the "Registration Center" and the "School of Athens App".

1. On the "Registration Center" the user can:

   - register a student to a school(on a live DataBase).
   - select if he wants the school to receive a notification.

2. The "School of Athens App" is an individual Web Application that is live on the Web.
   When "School of Athens App" receives a notification via "Webhook" of a student's registration:

   - it sends a response to our server and our server sends a "notification" via "Socket.IO" to our browser in order to visualize data on school's Email Inbox.

## Technologies:

---

- HTML
- CSS
- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- Socket.IO

## Setup:

app\server\service\WebSocket.js
line 9
cors: {
origin: [`http://127.0.0.1:${client_Port}`],
},

app\server\server.js
line 31
new DatabaseConnection(
process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_data"
);

---

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
