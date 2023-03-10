"usestrict";
import chalk from "chalk";
import { Server } from "./service/Server.js";
import { DatabaseConnection } from "./service/DatabaseConnection.js";
import { WebSocket } from "./service/WebSocket.js";
//////////////////////////////////////////
import "dotenv/config";
//////////////////////////////////////////
import { router as getStudentRouter } from "./routes/get_students.js";
import { router as getSchoolRouter } from "./routes/get_schools.js";
import { router as addStudentRouter } from "./routes/add_student.js";
import { router as addWebhookRouter } from "./routes/add_webhook.js";
//////////////////////////////////////////

// Initialize a Server Connection
const appServer = new Server(process.env.PORT || 3200);
const app = appServer.app; //express()

// Initialize WebSocket
// PORT 5173 is the default port by Vite that we use on Front-End
export const appWebSocket = new WebSocket(appServer.server, 5173);

appWebSocket.io.on("connection", (socket) => {
  console.log(
    "You have been connected to Socket Server with socket.id ===",
    chalk.yellow(socket.id)
  );
});

// Initialize Database Connection
new DatabaseConnection(
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_data"
);

// GET
app.get("/", (req, res) => {
  res.send("Welcome to Registration Center Application");
});

////////////////////////////////////////////////////////

// GET ALL SCHOOLS or GET SCHOOL BY ID
app.use("/schools", getSchoolRouter);

////////////////////////////////////////////////////////

// GET ALL STUDENTS
app.use("/students", getStudentRouter);

////////////////////////////////////////////////////////

// ADD STUDENT
app.use("/addstudent", addStudentRouter);

////////////////////////////////////////////////////////

// ADD WEBHOOK EVENT
app.use("/addwebhookevent", addWebhookRouter);

////////////////////////////////////////////////////////
