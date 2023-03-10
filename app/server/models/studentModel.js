import mongoose from "mongoose";

// Table Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  schoolId: Number,
});

// Create Table to DataBase
// Table -> schools:[{studentSchema},{studentSchema},...]
const studentModel = mongoose.model("students", studentSchema);

export { studentModel };
