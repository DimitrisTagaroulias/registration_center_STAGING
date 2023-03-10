import mongoose from "mongoose";

// Table Schema
const schoolSchema = new mongoose.Schema({
  schoolName: String,
  schoolId: Number,
  schoolPort: Number,
  webhookDetails: [
    {
      eventName: String,
      endpointUrl: String,
      checked: Boolean,
    },
  ],
});

// Create Table to DataBase
// Table -> schools:[{schoolSchema},{schoolSchema},...]
const schoolModel = mongoose.model("schools", schoolSchema);

export { schoolModel };
