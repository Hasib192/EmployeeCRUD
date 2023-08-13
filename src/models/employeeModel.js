const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    emp_eid: Number,
    emp_name: String,
    emp_gender: Boolean,
    emp_phn_num: String,
    emp_email: String,
    emp_DOB: Date,
    emp_designation: String,
    emp_joining_date: Date,
  },
  { versionKey: false, timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
