import axios from "axios";
import { schoolModel } from "../models/schoolModel.js";
import { studentModel } from "../models/studentModel.js";
import { appWebSocket } from "../server.js";
////////////////////////////////////////////////////////

class Student {
  // GET ALL STUDENTS
  static async getAllStudents(req, res) {
    try {
      const responseData = await studentModel.find().sort({ $natural: -1 });
      res.send({ result: responseData });
    } catch (error) {
      console.log(error);
    }
  }

  static async addStudent(req, res) {
    try {
      let data = req.body;
      let studentData = "";

      if (!data) {
        res.send({
          message: `Bad Request, check students data.`,
        });
        return;
      }

      // Fetch data for Entry(School) with specific ID and check if this ID is valid
      let schoolDetails = await schoolModel.findOne({
        schoolId: data.schoolId,
      });
      // Create Student

      if (schoolDetails) {
        const studentDetails = new studentModel({
          name: data.name,
          age: data.age,
          schoolId: data.schoolId,
        });

        // Add Student to "students" table and return the Entry(Student)
        studentData = await studentDetails.save();
        if (!studentData) {
          res.send({
            message: `Something went wrong with the Database, try again later.`,
          });
          return;
        }

        let webhookUrl = "";
        // Check for Webhook = newStudentAdd in [webhookDetails]
        for (let i = 0; i < schoolDetails.webhookDetails.length; i++) {
          if (
            schoolDetails.webhookDetails[i].eventName == "newStudentAdd" &&
            schoolDetails.webhookDetails[i].checked == true
          ) {
            webhookUrl = schoolDetails.webhookDetails[i].endpointUrl;
            // If school has not add any webhook then webhookDetails == ""
          }
        }

        let additionalMessage =
          "and <strong>NO</strong> notification will be sent to school";
        if (webhookUrl) {
          // If school has add webhook with name newStudentAdd sent message to school
          Student.sendMessageToSchool(webhookUrl, studentData);
          additionalMessage = "and a notification will be sent to school";
        }

        // Return Results of adding student
        res.send({
          message: `A student named ${studentData.name} has been succesfully added to the DataBase ${additionalMessage}.`,
        });

        // // If school has add webhook with name newStudentAdd sent message to school
        // Student.sendMessageToSchool(webhookUrl, studentData);
      } else {
        console.log("No school");
        res.send({ message: "No School with this ID" });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // HELPERS
  static async sendMessageToSchool(webhookUrl, studentData) {
    if (webhookUrl != null && webhookUrl.length > 0) {
      // webhook response
      const result = await axios.post(webhookUrl, studentData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Webhook data send");

      // Send data to Client
      appWebSocket.io.emit("school-message", result.data);
    }
  }
}

export { Student };
