//create employee model with mongoose include first name, last name, email gender and salary

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
