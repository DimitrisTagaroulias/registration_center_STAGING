import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";

// Create a Server
const app = express();
const PORT = process.env.PORT || 1001;
app.use(bodyParser.json());

// GET
app.get("/", (req, res) => {
  res.send("Welcome to School of Argyroupolis");
});

// Webhook - Studdent Added
app.post("/webhook/studentadded", (req, res) => {
  let data = req.body;
  console.log("name: " + data.name);

  // Return Results
  res.send({
    result: data,
    message: `A student named ${data.name} has been succesfully added to the School of Argyroupolis.`,
  });
});

// SERVER STATUS
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});
