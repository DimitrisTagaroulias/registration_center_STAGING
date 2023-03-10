import fs from "fs";
////////////////////////////////////////////////////////
import { schoolModel } from "../models/schoolModel.js";
////////////////////////////////////////////////////////

class School {
  // GET ALL SCHOOLS
  static async getAllSchools(req, res) {
    try {
      const responseData = await schoolModel.find();
      res.send({ result: responseData });
    } catch (error) {
      console.log(error);
    }
  }

  // GET SCHOOL BY ID
  static async getSchoolById(req, res) {
    try {
      const schoolId = req.params.id;
      let schoolDetails = await schoolModel.findOne({ schoolId: schoolId });
      res.send({ result: schoolDetails });
    } catch (error) {
      console.log(error);
    }
  }

  // GET COUNT OF SCHOOLS
  static getCountOfSchools() {
    try {
      return schoolModel.find().count();
    } catch (error) {
      console.log(error);
    }
  }

  static async addWebhook(req, res) {
    try {
      let data = req.body;

      // Fetch data for Entry(School) with specific ID and check if this ID is valid
      let schoolDetails = await schoolModel.findOne({
        schoolId: data.schoolId,
      });
      // findOne -> returns the first entry that satisfies the specified query as a document, not as an array.

      // Add Webhook to the Entry(School)
      if (schoolDetails) {
        const { webhookDetails } = schoolDetails; // webhookDetails = [Array of Webhooks]

        // CHECK IF WEBHOOK ALREADY EXISTS
        if (webhookDetails.length > 0) {
          for (let i = 0; i < webhookDetails.length; i++) {
            if (
              webhookDetails[i].eventName === data.eventName &&
              webhookDetails[i].endpointUrl !== data.endpointUrl
            ) {
              console.log(
                "You can't add this Webhook.A webhook with same Name alreary exists"
              );
              res.send({
                message:
                  "You can't add this Webhook.A webhook with same Name alreary exists",
              });
            }

            if (
              webhookDetails[i].endpointUrl === data.endpointUrl &&
              webhookDetails[i].eventName !== data.eventName
            ) {
              if (webhookDetails[i].eventName !== data.eventName) {
                console.log(
                  "You can't add this Webhook.A webhook with same URL alreary exists"
                );
                res.send({
                  message:
                    "You can't add this Webhook.A webhook with same URL alreary exists",
                });
                return;
              }
            }

            // UPDATE WEBHOOK OBJECT
            // IF SAME eventName && SAME endpointUrl
            if (
              webhookDetails[i].eventName === data.eventName &&
              webhookDetails[i].endpointUrl === data.endpointUrl
            ) {
              webhookDetails[i].checked = data.checked;
              console.log("Webhook status updated");
            }

            //
          }
        }

        // Update the Entry on Database
        schoolDetails = await schoolModel.findOneAndUpdate(
          {
            schoolId: schoolDetails.schoolId,
          },
          schoolDetails,
          { returnOriginal: false }
        );
      } else {
        console.error("No School with this ID");
        res.send({ message: "No School with this ID" });
        return;
      }

      // Return Results

      if (schoolDetails) {
        let actionMessage = `${
          data.checked === "true" ? "added to" : "removed from"
        }`;
        res.send({
          result: schoolDetails,
          message: `A webhook named ${data.eventName} has been successfully ${actionMessage} ${schoolDetails.schoolName} in DataBase`,
        });
        return;
      } else {
        res.send({
          message: `Something went wrong with the Webhook update on DataBase`,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { School };
